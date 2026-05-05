package com.lucascamino.portfolio.contact;

/**
 * Códigos de error que el backend devuelve al frontend.
 * El frontend los mapea como claves i18n para mostrar mensajes
 * en el idioma del usuario.
 *
 * Mantener los valores estables: cambiarlos rompe el contrato con
 * el frontend (que tiene las traducciones indexadas por estos strings).
 */
public enum ErrorCode {
    VALIDATION_FAILED("validation.failed"),
    REQUEST_MALFORMED("request.malformed"),
    DELIVERY_FAILED("delivery.failed"),
    RATE_LIMITED("rate.limited"),
    SERVER_ERROR("server.error");

    private final String value;

    ErrorCode(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
