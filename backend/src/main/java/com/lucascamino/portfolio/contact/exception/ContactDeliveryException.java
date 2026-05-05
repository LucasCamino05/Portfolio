package com.lucascamino.portfolio.contact.exception;

/**
 * Falla de entrega del email (SMTP caído, credenciales mal,
 * timeout, etc.). El handler global la mapea a 502 Bad Gateway.
 */
public class ContactDeliveryException extends RuntimeException {

    public ContactDeliveryException(String message, Throwable cause) {
        super(message, cause);
    }
}
