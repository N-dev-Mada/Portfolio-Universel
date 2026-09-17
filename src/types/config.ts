/**
 * Schéma complet de la configuration du portfolio.
 * Toute valeur vide ("" ou []) masque automatiquement l'élément concerné.
 */

export type AccentIndex = 1 | 2 | 3;

export type SectionType =
  | 'hero'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'testimonials'
  | 'contact';

export interface SectionDescriptor {
  id: string;
  type: SectionType;
  label: string;
  enabled: boolean;
}

export interface MetaConfig {
  title: string;
  description: string;
  lang: string;
}

export interface ThemeConfig {
  preset: string;
  font: string;
  radius: 'sm' | 'md' | 'lg' | 'xl';
  ambientGlow: boolean;
}

export interface IdentityConfig {
  name: string;
  initials: string;
  role: string;
  logoImage: string;
  avatar: string;
}

export interface NavConfig {
  ctaLabel: string;
  ctaTarget: string;
  mobileCtaLabel: string;
}

export interface CtaItem {
  label: string;
  target: string;
  icon: string;
  variant: 'primary' | 'ghost';
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FloatingBadge {
  icon: string;
  title: string;
  subtitle: string;
  accent: AccentIndex;
}

export interface TerminalLine {
  text: string;
  tone: 'default' | 'keyword' | 'string' | 'accent' | 'muted' | 'number';
}

export interface HeroShowcase {
  /** 'terminal' | 'image' | 'none' */
  type: 'terminal' | 'image' | 'none';
  image: string;
  imageCaption: string;
  terminalTitle: string;
  terminalTag: string;
  terminalLines: TerminalLine[];
  terminalFooterLeft: string;
  terminalFooterRight: string;
  floatingBadges: FloatingBadge[];
}

export interface HeroConfig {
  badgeText: string;
  badgePulse: boolean;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctas: CtaItem[];
  stats: StatItem[];
  showcase: HeroShowcase;
}

export interface SkillItem {
  name: string;
  level: number;
  levelLabel: string;
}

export interface SkillCategory {
  icon: string;
  badge: string;
  title: string;
  description: string;
  accent: AccentIndex;
  items: SkillItem[];
  tags: string[];
}

export interface SkillsConfig {
  badgeIcon: string;
  badgeText: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  showLevels: boolean;
  categories: SkillCategory[];
}

export interface ProjectLink {
  label: string;
  url: string;
  icon: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  accent: AccentIndex;
  tags: string[];
  links: ProjectLink[];
}

export interface ProjectFilter {
  id: string;
  label: string;
}

export interface ProjectsConfig {
  badgeIcon: string;
  badgeText: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  layout: 'grid-2' | 'grid-3' | 'gallery';
  filtersEnabled: boolean;
  filters: ProjectFilter[];
  items: ProjectItem[];
}

export interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  accent: AccentIndex;
  tags: string[];
}

export interface ExperienceConfig {
  badgeIcon: string;
  badgeText: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  items: ExperienceItem[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface TestimonialsConfig {
  badgeIcon: string;
  badgeText: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  copyable: boolean;
  accent: AccentIndex;
}

export interface SocialLink {
  label: string;
  icon: string;
  url: string;
  accent: AccentIndex;
}

export interface FormSubject {
  value: string;
  label: string;
}

export interface ContactForm {
  enabled: boolean;
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitLabel: string;
  successMessage: string;
  privacyNote: string;
  subjects: FormSubject[];
  /** endpoint optionnel (Formspree, Getform...). Vide = simulation locale. */
  endpoint: string;
}

export interface ContactConfig {
  badgeIcon: string;
  badgeText: string;
  title: string;
  titleHighlight: string;
  intro: string;
  socialsTitle: string;
  infos: ContactInfo[];
  socials: SocialLink[];
  form: ContactForm;
}

export interface FooterConfig {
  copyright: string;
  showQuickNav: boolean;
  showBackToTop: boolean;
}

export interface PortfolioConfig {
  version: number;
  meta: MetaConfig;
  theme: ThemeConfig;
  identity: IdentityConfig;
  nav: NavConfig;
  sections: SectionDescriptor[];
  hero: HeroConfig;
  skills: SkillsConfig;
  projects: ProjectsConfig;
  experience: ExperienceConfig;
  testimonials: TestimonialsConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}
