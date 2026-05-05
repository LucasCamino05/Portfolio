package com.lucascamino.portfolio.config;

import com.lucascamino.portfolio.ratelimit.RateLimitInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Registra los interceptors HTTP a sus paths específicos.
 *
 * Por ahora solo el rate limiter sobre /contact. Si en el futuro
 * sumamos otros interceptors (auth, logging, métricas), se agregan
 * acá sin tocar otras configs.
 */
@Configuration
@RequiredArgsConstructor
public class InterceptorsConfig implements WebMvcConfigurer {

    private final RateLimitInterceptor rateLimitInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns("/contact");
    }
}
