package com.lucascamino.portfolio.ratelimit;

import com.lucascamino.portfolio.contact.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

/**
 * Interceptor delgado que orquesta el rate limit:
 *   - Resuelve la IP vía {@link IpResolver}.
 *   - Consulta al {@link RateLimitStore}.
 *   - Si está dentro del límite, deja pasar.
 *   - Si lo excede, responde 429 con error code estándar.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class RateLimitInterceptor implements HandlerInterceptor {

    private static final String RATE_LIMITED_BODY = """
            {"ok":false,"error":"%s"}
            """.formatted(ErrorCode.RATE_LIMITED.value());

    private final IpResolver ipResolver;
    private final RateLimitStore store;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws IOException {

        var ip = ipResolver.resolve(request);

        if (store.tryAcquire(ip)) {
            return true;
        }

        log.warn("Rate limit excedido [ip={}, hits={}]", ip, store.currentHits(ip));
        writeRateLimitedResponse(response);
        return false;
    }

    private void writeRateLimitedResponse(HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(RATE_LIMITED_BODY);
    }
}
