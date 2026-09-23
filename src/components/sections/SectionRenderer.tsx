import type { SectionDescriptor } from '../../types/config';
import Articles from './Articles';
import Contact from './Contact';
import Experience from './Experience';
import Hero from './Hero';
import Projects from './Projects';
import Skills from './Skills';
import Testimonials from './Testimonials';

const MAP = {
  hero: Hero,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  testimonials: Testimonials,
  articles: Articles,
  contact: Contact,
} as const;

export default function SectionRenderer({ section }: { section: SectionDescriptor }) {
  const Cmp = MAP[section.type];
  if (!Cmp) return null;
  return <Cmp id={section.id} />;
}
