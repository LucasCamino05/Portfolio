package com.lucascamino.portfolio.ratelimit;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Instant;
import java.util.Deque;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;

/**
 * Rate limit muy simple, en memoria, por IP.
 *
 * Estrategia: ventana deslizante. Se mantiene un Deque de timestamps
 * de cada request por IP. En cada request:
 *   1. Se purgan timestamps fuera de la ventana.
 *   2. Si el tamaño actual >= max, se rechaza con 429.
 *   3. Si no, se agrega el timestamp actual y se deja pasar.
 *
 * Limitaciones (aceptables para este alcance):
 * - In-memory: si se reinicia el contenedor (deploy / cold start)
 *   el contador se pierde. Es OK porque no es un DOS-grade rate limit,
 *   es protección anti-spam casual.
 * - No funciona si la app corre en múltiples instancias (Render free
 *   tier siempre es una sola). Si en algún momento se escala, migrar
 *   a Redis o Bucket4j con backend distribuido.
 */
@Component
@Slf4j
public class RateLimitInterceptor implements HandlerInterceptor {

    @Value("${app.ratelimit.window-ms}")
    private long windowMs;

    @Value("${app.ratelimit.max-requests}")
    private int maxRequests;

    private final ConcurrentHashMap<String, Deque<Long>> hits = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        var ip = resolveClientIp(request);
        var now = Instant.now().toEpochMilli();
        var threshold = now - windowMs;

        var queue = hits.computeIfAbsent(ip, k -> new ConcurrentLinkedDeque<>());

        synchronized (queue) {
            // Purgo timestamps fuera de la ventana.
            while (!queue.isEmpty() && queue.peekFirst() < threshold) {
                queue.pollFirst();
            }

            if (queue.size() >= maxRequests) {
                log.warn("Rate limit excedido [ip={}, hits={}/{}]", ip, queue.size(), maxRequests);
                writeRateLimitResponse(response);
                return false;
            }

            queue.addLast(now);
        }

        return true;
    }

    /**
     * Resuelve la IP del cliente respetando proxies (Render usa
     * X-Forwarded-For). Cae a getRemoteAddr si no hay header.
     */
    private String resolveClientIp(HttpServletRequest req) {
        var fwd = req.getHeader("X-Forwarded-For");
        if (fwd != null && !fwd.isBlank()) {
            // X-Forwarded-For puede ser "client, proxy1, proxy2" — tomamos el primero.
            return fwd.split(",")[0].trim();
        }
        var real = req.getHeader("X-Real-IP");
        if (real != null && !real.isBlank()) {
            return real.trim();
        }
        return req.getRemoteAddr();
    }

    private void writeRateLimitResponse(HttpServletResponse res) throws java.io.IOException {
        res.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.getWriter().write("""
                {"ok":false,"error":"rate.limited"}
                """);
    }
}
