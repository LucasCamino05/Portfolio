package com.lucascamino.portfolio.config;

import com.lucascamino.portfolio.contact.ContactResponse;
import com.lucascamino.portfolio.contact.ErrorCode;
import com.lucascamino.portfolio.contact.exception.ContactDeliveryException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.stream.Collectors;

/**
 * Convierte excepciones de la app en respuestas JSON consistentes.
 * El frontend interpreta {@code error} como clave i18n.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /** Errores de validación de @Valid. 400 con detalle agregado. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ContactResponse> handleValidation(MethodArgumentNotValidException ex) {
        var detail = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ":" + fe.getDefaultMessage())
                .collect(Collectors.joining(","));

        log.info("Validación fallida: {}", detail);
        return badRequest(ErrorCode.VALIDATION_FAILED);
    }

    /** JSON malformado o body ausente. */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ContactResponse> handleUnreadable(HttpMessageNotReadableException ex) {
        log.info("Body no leíble: {}", ex.getMostSpecificCause().getMessage());
        return badRequest(ErrorCode.REQUEST_MALFORMED);
    }

    /** Falla del envío SMTP. 502 — dependimos de un servicio externo. */
    @ExceptionHandler(ContactDeliveryException.class)
    public ResponseEntity<ContactResponse> handleDelivery(ContactDeliveryException ex) {
        return errorResponse(HttpStatus.BAD_GATEWAY, ErrorCode.DELIVERY_FAILED);
    }

    /**
     * Recursos estáticos no encontrados (típicamente {@code /} y
     * {@code /favicon.ico} cuando un navegador navega al backend).
     *
     * Esta API no sirve assets — solo expone /health y /contact.
     * Devolvemos 404 limpio sin stack trace para no llenar los logs de
     * Render con errores de cosmética.
     */
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Void> handleNoResource(NoResourceFoundException ex) {
        return ResponseEntity.notFound().build();
    }

    /** Catch-all defensivo. */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ContactResponse> handleGeneric(Exception ex) {
        log.error("Error inesperado: {}", ex.getMessage(), ex);
        return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.SERVER_ERROR);
    }

    // ─── Helpers ──────────────────────────────────────────────

    private ResponseEntity<ContactResponse> badRequest(ErrorCode code) {
        return errorResponse(HttpStatus.BAD_REQUEST, code);
    }

    private ResponseEntity<ContactResponse> errorResponse(HttpStatus status, ErrorCode code) {
        return ResponseEntity.status(status).body(ContactResponse.builder()
                .ok(false)
                .error(code.value())
                .build());
    }
}
