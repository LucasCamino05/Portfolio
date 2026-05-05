package com.lucascamino.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

/**
 * Entrypoint de la app.
 *
 * {@code @ConfigurationPropertiesScan} hace que Spring registre
 * automáticamente todas las clases con {@code @ConfigurationProperties}
 * dentro del paquete del proyecto. No hace falta listar cada una a mano.
 */
@SpringBootApplication
@ConfigurationPropertiesScan
public class PortfolioBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioBackendApplication.class, args);
    }
}
