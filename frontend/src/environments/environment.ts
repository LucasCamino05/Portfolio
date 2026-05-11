/**
 * Environment de DESARROLLO (default).
 *
 * Lo usa `npm start` / `ng serve` — el dev server que corre en localhost:4200.
 *
 * Para builds de producción (`ng build`), angular.json hace fileReplacements
 * y reemplaza este archivo por `environment.production.ts`.
 */
export const environment = {
  production: false,

  // 🏠 Backend LOCAL — usá esta línea cuando tengas el Spring Boot corriendo
  //    en IntelliJ contra http://localhost:8080.
  apiBaseUrl: 'http://localhost:8080',

  // ☁️ Backend en RENDER (deployado) — descomenten esta línea (y comenten
  //    la de arriba) si querés que el dev server hable contra el backend
  //    de producción en vez del local. Útil para probar la integración
  //    real sin levantar el backend localmente.
  // apiBaseUrl: 'https://portfolio-backend-2bwe.onrender.com',
};
