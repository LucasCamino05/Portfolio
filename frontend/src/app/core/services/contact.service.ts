import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** Honeypot anti-spam. Siempre vacío desde la UI. */
  website?: string;
}

export interface ContactResponse {
  ok: boolean;
  id?: string;
  error?: string;
}

/**
 * Habla con el backend Spring Boot propio (Render).
 *
 * URL base: viene de `environments/environment{,.production}.ts`.
 *  - Dev   → http://localhost:8080
 *  - Prod  → https://portfolio-backend.onrender.com (ajustar al desplegar)
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  send(payload: ContactRequest): Observable<ContactResponse> {
    // Honeypot vacío forzado del lado del cliente.
    const body: ContactRequest = { website: '', ...payload };
    return this.http
      .post<ContactResponse>(`${this.baseUrl}/contact`, body)
      .pipe(timeout(20_000));
  }

  /**
   * Despierta el backend (cold start de Render free tier).
   * Se invoca al cargar el portfolio para que cuando el usuario
   * llegue al formulario el contenedor ya esté caliente.
   */
  warmUp(): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/health`).pipe(timeout(45_000));
  }
}
