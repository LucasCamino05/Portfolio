package com.lucascamino.portfolio.config;

import com.lucascamino.portfolio.config.properties.CorsProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración CORS para el portfolio.
 *
 * Los orígenes vienen del bean {@link CorsProperties} (valores en
 * {@code app.cors.allowed-origins} de application.properties).
 *
 * Usamos {@code allowedOriginPatterns} en lugar de {@code allowedOrigins}
 * para soportar wildcards tipo {@code https://*.netlify.app} que cubren
 * los preview deploys de Netlify.
 */
@Configuration
@RequiredArgsConstructor
public class CorsConfig implements WebMvcConfigurer {

    private final CorsProperties props;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(props.getAllowedOrigins().toArray(String[]::new))
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
