package com.lucascamino.portfolio.ratelimit;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

/**
 * Resuelve la IP del cliente real, respetando proxies y load balancers.
 *
 * Render (igual que la mayoría de PaaS) inyecta la IP original en
 * {@code X-Forwarded-For}. La IP del request directo
 * ({@code req.getRemoteAddr()}) corresponde al proxy, no al cliente.
 *
 * Este componente vive aislado para que sea reusable: si en el futuro
 * sumamos otros features que necesiten IP del cliente (logging,
 * geolocation, audit), pueden inyectar este bean.
 */
@Component
public class IpResolver {

    private static final String HEADER_X_FORWARDED_FOR = "X-Forwarded-For";
    private static final String HEADER_X_REAL_IP = "X-Real-IP";

    /**
     * Devuelve la IP del cliente. Orden de preferencia:
     *   1. Primer valor de {@code X-Forwarded-For}.
     *   2. {@code X-Real-IP}.
     *   3. {@code request.getRemoteAddr()} (fallback local / sin proxy).
     */
    public String resolve(HttpServletRequest request) {
        var forwarded = request.getHeader(HEADER_X_FORWARDED_FOR);
        if (forwarded != null && !forwarded.isBlank()) {
            // X-Forwarded-For puede ser "client, proxy1, proxy2".
            // El primer valor es el cliente real.
            return forwarded.split(",")[0].trim();
        }

        var realIp = request.getHeader(HEADER_X_REAL_IP);
        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }

        return request.getRemoteAddr();
    }
}
