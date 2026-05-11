/**
 * Tipos del dominio "Stack" — tecnologías agrupadas por categoría.
 */

export interface StackItem {
  name: string;
  /** Logo o ícono opcional (devicon / simpleicons). Por ahora solo texto. */
  icon?: string;
}

export interface StackCategory {
  /** Clave i18n: `stack.categories.<key>`. */
  key:
    | 'backend'
    | 'frontend'
    | 'mobile'
    | 'databases'
    | 'tools'
    | 'languages'
    | 'architecture';

  items: StackItem[];
}
