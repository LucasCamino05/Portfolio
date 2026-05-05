package com.lucascamino.portfolio.config.properties;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * Config específica del feature "contact form".
 * Mapea las properties bajo el prefijo {@code app.contact}.
 */
@Data
@Validated
@ConfigurationProperties(prefix = "app.contact")
public class ContactProperties {

    /** Email DESTINO del formulario (mi inbox). */
    @NotBlank @Email
    private String recipient;

    /** Subject prefix para distinguir mails del portfolio en mi inbox. */
    @NotBlank
    private String subjectPrefix = "[Portfolio]";

    /** Display name que aparece en el FROM ("Portfolio · Lucas Camino"). */
    @NotBlank
    private String fromDisplayName = "Portfolio · Lucas Camino";
}
