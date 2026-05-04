package com.lucascamino.portfolio.contact;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Respuesta estándar del endpoint /contact.
 *
 * En éxito: ok=true, id con el message-id del SMTP (útil para rastrear).
 * En error: ok=false, error con un código i18n-able que el frontend mapea.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {
    private boolean ok;
    private String id;
    private String error;
}
