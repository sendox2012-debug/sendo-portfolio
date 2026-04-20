import React, { useEffect } from 'react';
import '../css/ProjectCard.css';

// 1. Описываем структуру проекта
interface Project {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  link?: string;
  github?: string;
}

// 2. Описываем пропсы
interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

// 3. Расширяем тип Window, чтобы TS знал про lucide из CDN
declare global {
  interface Window {
    lucide: {
      createIcons: () => void;
    };
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {

  useEffect(() => {
    // Теперь TS знает, что window.lucide существует
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="project-card fade-in-section">
      <div className="card-header">
        <h3 className="card-title">{project.title}</h3>
        <div className="card-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub Repository">
              <i data-lucide="github" className="icon-btn"></i>
            </a>
          )}
        </div>
      </div>

      <p className="card-description">{project.shortDesc}</p>

      <div className="tech-stack">
        {project.techStack.slice(0, 3).map((tech, i) => (
          <span key={i} className="tech-badge">{tech}</span>
        ))}
        {project.techStack.length > 3 && (
          <span className="tech-badge">+{project.techStack.length - 3}</span>
        )}
      </div>

      <button
        className="btn btn-outline"
        style={{ marginTop: '1.5rem', width: '100%' }}
        onClick={() => onOpenModal(project)}
      >
        Подробнее
      </button>
    </div>
  );
};

export default ProjectCard;