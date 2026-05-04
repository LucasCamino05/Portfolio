package com.lucascamino.portfolio.config;

import com.lucascamino.portfolio.contact.ContactResponse;
import com.lucascamino.portfolio.contact.ContactService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

/**
 * Convierte excepciones de la app en respuestas JSON consistentes.
 * El frontend interpreta el campo {@code error} como clave i18n.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /** Errores de validación de @Valid. Devuelve 400 con detalle. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ContactResponse> handleValidation(MethodArgumentNotValidException ex) {
        var detail = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ":" + fe.getDefaultMessage())
                .collect(Collectors.joining(","));

        log.info("Validación fallida: {}", detail);

        return ResponseEntity.badRequest().body(ContactResponse.builder()
                .ok(false)
                .error("validation.failed")
                .build());
    }

    /** JSON malformado o body ausente. */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ContactResponse> handleUnreadable(HttpMessageNotReadableException ex) {
        log.info("Body no leíble: {}", ex.getMostSpecificCause().getMessage());
        return ResponseEntity.badRequest().body(ContactResponse.builder()
                .ok(false)
                .error("request.malformed")
                .build());
    }

    /** Falla del envío SMTP. 502 Bad Gateway porque dependimos de un servicio externo. */
    @ExceptionHandler(ContactService.ContactDeliveryException.class)
    public ResponseEntity<ContactResponse> handleDelivery(ContactService.ContactDeliveryException ex) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(ContactResponse.builder()
                .ok(false)
                .error("delivery.failed")
                .build());
    }

    /** Catch-all defensivo. */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ContactResponse> handleGeneric(Exception ex) {
        log.error("Error inesperado: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ContactResponse.builder()
                .ok(false)
                .error("server.error")
                .build());
    }
}
