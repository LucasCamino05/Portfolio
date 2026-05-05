package com.lucascamino.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Payload del formulario de contacto que llega desde el frontend.
 *
 * Las validaciones se ejecutan automáticamente cuando el controller
 * recibe el body anotado con {@code @Valid}.
 *
 * Campo {@code website}: honeypot anti-spam. No se renderiza en el
 * frontend; un bot que llene todos los campos visibles + este, queda
 * expuesto. Si llega con valor, rechazamos con 400 silenciosamente.
 */
@Data
@NoArgsConstructor
public class ContactRequest {

    @NotBlank(message = "name.required")
    @Size(min = 2, max = 100, message = "name.size")
    private String name;

    @NotBlank(message = "email.required")
    @Email(message = "email.invalid")
    @Size(max = 254, message = "email.size")
    private String email;

    @Size(max = 200, message = "subject.size")
    private String subject;

    @NotBlank(message = "message.required")
    @Size(min = 10, max = 5000, message = "message.size")
    private String message;

    /** Honeypot. Debe llegar vacío. Bots tienden a llenarlo. */
    private String website;
}
