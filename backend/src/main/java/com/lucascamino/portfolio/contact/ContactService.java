package com.lucascamino.portfolio.contact;

import com.lucascamino.portfolio.contact.exception.ContactDeliveryException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

/**
 * Orquesta el envío de un mail de contacto:
 *   1. Genera un id único (trazabilidad).
 *   2. Construye el {@link jakarta.mail.internet.MimeMessage} vía {@link EmailBuilder}.
 *   3. Envía por SMTP.
 *
 * Cualquier falla técnica se traduce a {@link ContactDeliveryException} para
 * que el {@code GlobalExceptionHandler} la mapee a 502 Bad Gateway.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ContactService {

    private final JavaMailSender mailSender;
    private final EmailBuilder emailBuilder;

    /**
     * @return el id generado, útil para correlacionar logs y mostrarle al usuario.
     */
    public String send(ContactRequest request) {
        var id = UUID.randomUUID().toString();

        try {
            var mime = emailBuilder.build(request, id);
            mailSender.send(mime);
            log.info("Contact email enviado [id={}, from={}]", id, request.getEmail());
            return id;

        } catch (MessagingException | UnsupportedEncodingException | MailException e) {
            log.error("Falló el envío del mail [id={}, from={}]: {}",
                    id, request.getEmail(), e.getMessage(), e);
            throw new ContactDeliveryException("No se pudo entregar el mensaje.", e);
        }
    }
}
