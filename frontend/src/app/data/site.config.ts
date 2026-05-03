/**
 * Constantes globales del sitio. Single source of truth.
 * Cambiar acá impacta en header, footer, contact, meta tags.
 */
export const SITE = {
  ownerName: 'Lucas Camino',
  ownerInitials: 'LC',
  location: 'Mar del Plata, Argentina',

  contact: {
    email: 'lucascamino05@gmail.com',
    /** Solo el href; nunca se muestra el número como texto en la UI. */
    whatsappHref: 'https://wa.me/5492266489025',
    linkedin: 'https://www.linkedin.com/in/lucas-camino-0808231b6/',
    github: 'https://github.com/LucasCamino05',
    /** Path al PDF dentro de assets. Lucas reemplaza el archivo cuando tenga la versión final. */
    cvPath: 'assets/cv/lucas-camino-cv.pdf',
  },
} as const;
