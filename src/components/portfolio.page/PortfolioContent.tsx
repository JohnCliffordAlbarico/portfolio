'use client';
import OverviewSection from './sections/OverviewSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

interface PortfolioContentProps {
  activeSection: string;
}

export default function PortfolioContent({ activeSection }: PortfolioContentProps) {
  switch(activeSection) {
    case 'overview':
      return <OverviewSection />;
    case 'skills':
      return <SkillsSection />;
    case 'projects':
      return <ProjectsSection />;
    case 'experience':
      return <ExperienceSection />;
    case 'contact':
      return <ContactSection />;
    default:
      return null;
  }
}
