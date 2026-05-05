package com.lucascamino.portfolio.config.properties;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * Config del servicio de mail. Validada al startup — si falta
 * algún campo obligatorio, la app no levanta.
 *
 * Mapea las properties bajo el prefijo {@code app.mail}.
 */
@Data
@Validated
@ConfigurationProperties(prefix = "app.mail")
public class MailProperties {

    /** Email del remitente — debe coincidir con la cuenta autenticada en SMTP. */
    @NotBlank @Email
    private String from;
}
