package com.lucascamino.portfolio.contact;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

/**
 * Envía el contenido del formulario de contacto por email vía
 * JavaMailSender. Configurado para Gmail SMTP en application.properties.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ContactService {

    private final JavaMailSender mailSender;

    @Value("${contact.recipient}")
    private String recipient;

    @Value("${contact.from}")
    private String from;

    /**
     * Envía el mail correspondiente al request. Devuelve el id generado
     * para que el frontend pueda mostrarlo (útil debugging del usuario).
     *
     * @throws ContactDeliveryException si falla el envío SMTP
     */
    public String send(ContactRequest request) {
        var id = UUID.randomUUID().toString();
        var mime = mailSender.createMimeMessage();

        try {
            var helper = new MimeMessageHelper(mime, false, StandardCharsets.UTF_8.name());

            // Destino: el dueño del portfolio (yo).
            helper.setTo(recipient);

            // Quien manda el mail. Forzamos el FROM a una cuenta autorizada
            // (Gmail no permite spoofear FROM con cualquier dirección).
            // Usamos "Reply-To" con el email del visitante para responder directo.
            helper.setFrom(new InternetAddress(from, "Portfolio · Lucas Camino", StandardCharsets.UTF_8.name()));
            helper.setReplyTo(new InternetAddress(request.getEmail(), request.getName(), StandardCharsets.UTF_8.name()));

            helper.setSubject(buildSubject(request));
            helper.setText(buildBody(request, id), false);

            mailSender.send(mime);

            log.info("Contact email enviado [id={}, from={}]", id, request.getEmail());
            return id;

        } catch (MessagingException | UnsupportedEncodingException | MailException e) {
            log.error("Falló el envío del mail [id={}, from={}]: {}", id, request.getEmail(), e.getMessage(), e);
            throw new ContactDeliveryException("No se pudo entregar el mensaje.", e);
        }
    }

    private String buildSubject(ContactRequest req) {
        if (req.getSubject() != null && !req.getSubject().isBlank()) {
            return "[Portfolio] " + req.getSubject();
        }
        return "[Portfolio] Nuevo mensaje de " + req.getName();
    }

    private String buildBody(ContactRequest req, String id) {
        var fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        var ts = LocalDateTime.now().format(fmt);

        return """
                Nuevo mensaje desde el formulario del portfolio.

                ── Datos del remitente ──────────────────────────
                Nombre   : %s
                Email    : %s
                Asunto   : %s

                ── Mensaje ──────────────────────────────────────
                %s

                ── Metadata ─────────────────────────────────────
                ID       : %s
                Recibido : %s
                """.formatted(
                        req.getName(),
                        req.getEmail(),
                        (req.getSubject() == null || req.getSubject().isBlank()) ? "(sin asunto)" : req.getSubject(),
                        req.getMessage(),
                        id,
                        ts);
    }

    /** Excepción de dominio: falla el envío SMTP. */
    public static class ContactDeliveryException extends RuntimeException {
        public ContactDeliveryException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}
