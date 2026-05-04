package com.lucascamino.portfolio.contact;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@Slf4j
public class ContactController {

    private final ContactService contactService;

    /**
     * Endpoint público del formulario de contacto.
     *
     * Validaciones (vía @Valid sobre el body): name 2..100, email válido,
     * message 10..5000. Honeypot {@code website} debe llegar vacío.
     */
    @PostMapping
    public ResponseEntity<ContactResponse> submit(@Valid @RequestBody ContactRequest request) {
        // Honeypot: si un bot llenó "website", devolvemos 200 falsamente exitoso
        // (no le damos pistas al atacante de que detectamos el bot).
        if (request.getWebsite() != null && !request.getWebsite().isBlank()) {
            log.warn("Honeypot disparado [from={}, ip-info en otro log]", request.getEmail());
            return ResponseEntity.ok(ContactResponse.builder()
                    .ok(true)
                    .id("noop")
                    .build());
        }

        var id = contactService.send(request);
        return ResponseEntity.ok(ContactResponse.builder()
                .ok(true)
                .id(id)
                .build());
    }
}
