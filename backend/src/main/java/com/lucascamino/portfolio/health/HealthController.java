package com.lucascamino.portfolio.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Endpoint mínimo de health check usado para warm-up del contenedor
 * en Render (free tier se duerme tras 15 min de inactividad).
 *
 * El frontend hace un GET silencioso a este endpoint apenas carga
 * el portfolio, así cuando el visitante llega al formulario de
 * contacto el backend ya está caliente.
 */
@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "ok", true,
                "service", "portfolio-backend",
                "ts", System.currentTimeMillis()
        );
    }
}
