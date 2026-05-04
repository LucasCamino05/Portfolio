package com.lucascamino.portfolio.ratelimit;

import com.lucascamino.portfolio.config.properties.RateLimitProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Deque;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;

/**
 * Implementación in-memory de rate limit con ventana deslizante.
 *
 * Para cada clave (típicamente una IP) mantiene un Deque de timestamps
 * de los hits. En cada {@link #tryAcquire(String)}:
 *   1. Purga timestamps fuera de la ventana.
 *   2. Si el tamaño actual >= max → rechaza (false).
 *   3. Si no → registra el timestamp y acepta (true).
 *
 * Limitaciones aceptables para el alcance:
 * - In-memory: si reinicia el contenedor se pierde el estado.
 *   No es DOS-grade; es protección anti-spam casual.
 * - No funciona con múltiples instancias. Render free tier corre una sola.
 *   Para escalar: migrar a Redis o Bucket4j con backend distribuido.
 */
@Component
@RequiredArgsConstructor
public class RateLimitStore {

    private final RateLimitProperties props;

    private final ConcurrentHashMap<String, Deque<Long>> hits = new ConcurrentHashMap<>();

    /**
     * Intenta registrar un hit para la clave dada.
     *
     * @return true si está dentro del límite, false si lo excede.
     */
    public boolean tryAcquire(String key) {
        var now = Instant.now().toEpochMilli();
        var threshold = now - props.getWindowMs();

        var queue = hits.computeIfAbsent(key, k -> new ConcurrentLinkedDeque<>());

        synchronized (queue) {
            // Purgo timestamps fuera de la ventana.
            while (!queue.isEmpty() && queue.peekFirst() < threshold) {
                queue.pollFirst();
            }

            if (queue.size() >= props.getMaxRequests()) {
                return false;
            }

            queue.addLast(now);
            return true;
        }
    }

    /** Cantidad actual de hits dentro de la ventana, para logging/debug. */
    public int currentHits(String key) {
        var queue = hits.get(key);
        return queue == null ? 0 : queue.size();
    }
}
