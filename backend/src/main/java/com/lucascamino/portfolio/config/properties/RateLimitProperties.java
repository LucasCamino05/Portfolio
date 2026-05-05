package com.lucascamino.portfolio.config.properties;

import jakarta.validation.constraints.Min;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

/**
 * Config del rate limiter de /contact.
 * Mapea las properties bajo el prefijo {@code app.ratelimit}.
 */
@Data
@Validated
@ConfigurationProperties(prefix = "app.ratelimit")
public class RateLimitProperties {

    /** Tamaño de la ventana deslizante en milisegundos. */
    @Min(1000)
    private long windowMs = 600_000;

    /** Máximo de requests por IP dentro de la ventana. */
    @Min(1)
    private int maxRequests = 3;
}
