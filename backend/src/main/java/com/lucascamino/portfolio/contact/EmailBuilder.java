package com.lucascamino.portfolio.contact;

import com.lucascamino.portfolio.config.properties.ContactProperties;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Construye el {@link MimeMessage} a enviar desde una {@link ContactRequest}.
 *
 * Separa "armar el mail" (responsabilidad de este componente) de
 * "mandarlo" (responsabilidad del {@link ContactService}). Hace al código
 * más testeable: se puede unit-testear el cuerpo del mail sin levantar SMTP.
 */
@Component
@RequiredArgsConstructor
public class EmailBuilder {

    private static final DateTimeFormatter TS_FORMAT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private static final String NO_SUBJECT = "(sin asunto)";

    private final JavaMailSender mailSender;
    private final ContactProperties contactProps;
    private final com.lucascamino.portfolio.config.properties.MailProperties mailProps;

    /**
     * Construye un mail listo para enviar a partir del request.
     *
     * @param request datos del formulario
     * @param messageId UUID generado para trazabilidad
     */
    public MimeMessage build(ContactRequest request, String messageId)
            throws MessagingException, UnsupportedEncodingException {

        var mime = mailSender.createMimeMessage();
        var helper = new MimeMessageHelper(mime, false, StandardCharsets.UTF_8.name());

        helper.setTo(contactProps.getRecipient());

        // Quien manda: una cuenta autenticada en SMTP. Forzamos esto porque
        // Gmail no permite spoofear el FROM.
        helper.setFrom(new InternetAddress(
                mailProps.getFrom(),
                contactProps.getFromDisplayName(),
                StandardCharsets.UTF_8.name()
        ));

        // Reply-To = email del visitante. Así, "Responder" desde mi cliente
        // de mail le contesta directo al visitante sin trabajo extra.
        helper.setReplyTo(new InternetAddress(
                request.getEmail(),
                request.getName(),
                StandardCharsets.UTF_8.name()
        ));

        helper.setSubject(buildSubject(request));
        helper.setText(buildBody(request, messageId), false);

        return mime;
    }

    private String buildSubject(ContactRequest req) {
        var prefix = contactProps.getSubjectPrefix();
        if (req.getSubject() != null && !req.getSubject().isBlank()) {
            return "%s %s".formatted(prefix, req.getSubject());
        }
        return "%s Nuevo mensaje de %s".formatted(prefix, req.getName());
    }

    private String buildBody(ContactRequest req, String messageId) {
        var ts = LocalDateTime.now().format(TS_FORMAT);
        var subject = (req.getSubject() == null || req.getSubject().isBlank())
                ? NO_SUBJECT
                : req.getSubject();

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
                        subject,
                        req.getMessage(),
                        messageId,
                        ts);
    }
}
