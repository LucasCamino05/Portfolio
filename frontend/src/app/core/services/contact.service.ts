import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, timeout } from 'rxjs';

export interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  id?: string;
}

/**
 * Habla con el backend Spring Boot propio (Render).
 *
 * URL base: configurable vía environment cuando exista. Por ahora
 * placeholder; al deployar el backend se reemplaza.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://portfolio-backend.example.com'; // TODO: reemplazar al deployar

  send(payload: ContactRequest): Observable<ContactResponse> {
    return this.http
      .post<ContactResponse>(`${this.baseUrl}/contact`, payload)
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
