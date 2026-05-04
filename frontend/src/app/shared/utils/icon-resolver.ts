import {
  Beer,
  BookOpen,
  Flame,
  Github,
  GraduationCap,
  Linkedin,
  type LucideIconData,
  Mail,
  MessageCircle,
  RefreshCw,
  Target,
  Users,
  Wrench,
} from 'lucide-angular';

/**
 * Mapa centralizado de íconos: data files referencian iconos por
 * string (ej: "users", "beer") para mantener TypeScript desacoplado
 * del catálogo entero de Lucide. Los componentes consumen este mapa
 * vía {@link resolveIcon}.
 *
 * Sumar un ícono nuevo = importarlo arriba y agregarlo al mapa.
 */
const ICON_MAP = {
  // Soft skills
  'users': Users,
  'flame': Flame,
  'graduation-cap': GraduationCap,
  'refresh-cw': RefreshCw,
  'wrench': Wrench,
  'target': Target,
  // Experience
  'book-open': BookOpen,
  'beer': Beer,
  // Contact / footer
  'mail': Mail,
  'github': Github,
  'linkedin': Linkedin,
  'message-circle': MessageCircle,
} as const satisfies Record<string, LucideIconData>;

export type IconName = keyof typeof ICON_MAP;

/**
 * Resuelve un ícono por nombre. Si el nombre no está mapeado,
 * cae a un fallback seguro (Users) para no romper la UI.
 */
export function resolveIcon(name: string): LucideIconData {
  return (ICON_MAP as Record<string, LucideIconData>)[name] ?? Users;
}
