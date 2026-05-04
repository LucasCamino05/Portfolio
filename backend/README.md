# Portfolio — Backend

API mínima del formulario de contacto. Recibe un POST desde el portfolio y reenvía el mensaje por email vía SMTP.

## Stack

- **Spring Boot 4.0.6** — `webmvc` + `validation` + `mail`.
- **Java 25** (Temurin).
- **Lombok** para DTOs y servicios.
- **Maven** vía wrapper (`./mvnw` / `.\mvnw.cmd`).
- **Hosting:** Render (free tier).

## Endpoints

### `GET /health`
Warm-up del contenedor. Devuelve `{ ok: true, service, ts }`.

### `POST /contact`
Recibe el formulario y manda el email.

**Body:**
```json
{
  "name": "Persona",
  "email": "persona@ejemplo.com",
  "subject": "Opcional",
  "message": "Mensaje de al menos 10 caracteres",
  "website": ""
}
```
> `website` es honeypot anti-spam — debe ir vacío.

**Respuesta éxito:** `200 { ok: true, id: "<uuid>" }`
**Respuesta validación:** `400 { ok: false, error: "validation.failed" }`
**Respuesta rate-limited:** `429 { ok: false, error: "rate.limited" }`
**Respuesta SMTP caído:** `502 { ok: false, error: "delivery.failed" }`

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `MAIL_USERNAME` | Cuenta Gmail desde la que se envían los mails | `lucascamino05@gmail.com` |
| `MAIL_PASSWORD` | App Password de Google (16 chars, sin espacios) | `abcdefghijklmnop` |
| `CONTACT_RECIPIENT` | Email destino (a dónde llegan los mensajes) | `lucascamino05@gmail.com` |
| `CONTACT_FROM` | (Opcional) FROM del mail. Default = MAIL_USERNAME | — |
| `CORS_ALLOWED_ORIGINS` | Orígenes permitidos, coma-separados | `https://lucascamino.netlify.app,http://localhost:4200` |
| `PORT` | Inyectada por Render | `10000` |

## Cómo correrlo en local

1. **Generá un App Password de Google:**
   - Activá verificación en 2 pasos en tu cuenta.
   - Andá a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
   - Creá uno con nombre "Portfolio Backend". Copiá los 16 caracteres.

2. **En IntelliJ:** Run Configuration → variables de entorno:
   ```
   MAIL_USERNAME=lucascamino05@gmail.com
   MAIL_PASSWORD=<el app password>
   CONTACT_RECIPIENT=lucascamino05@gmail.com
   ```

3. Run `PortfolioBackendApplication`. El servidor levanta en `http://localhost:8080`.

4. Probá health:
   ```bash
   curl http://localhost:8080/health
   ```

5. Probá contact:
   ```bash
   curl -X POST http://localhost:8080/contact \
     -H "Content-Type: application/json" \
     -d "{\"name\":\"Test\",\"email\":\"test@ejemplo.com\",\"message\":\"Mensaje de prueba largo.\"}"
   ```

## Build con el wrapper

```bash
.\mvnw.cmd clean package          # genera target/portfolio-backend-*.jar
java -jar target\portfolio-backend-0.0.1-SNAPSHOT.jar
```

## Deploy a Render

1. **Render** → New → Web Service → Connect repo `LucasCamino05/Portfolio`.
2. **Root Directory:** `backend`.
3. **Runtime:** `Docker` (toma el `Dockerfile` automáticamente).
4. **Plan:** Free.
5. **Environment Variables:** las de la tabla de arriba.
6. **Auto-Deploy:** habilitado en `main`.

Render inyecta `PORT` y la app lo lee. El endpoint `/health` permite verificar que está vivo.
