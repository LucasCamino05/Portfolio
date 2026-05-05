package com.lucascamino.portfolio.config.properties;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.List;

/**
 * Config CORS. Mapea las properties bajo {@code app.cors}.
 *
 * El array se inyecta como List<String> separado por comas en
 * application.properties — Spring Boot lo entiende automático.
 */
@Data
@Validated
@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {

    /** Lista de orígenes permitidos. Soporta wildcard pattern (https://*.netlify.app). */
    @NotEmpty
    private List<String> allowedOrigins;
}
