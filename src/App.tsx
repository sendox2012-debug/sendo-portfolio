import React, { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard'; 
import './css/App.css';

// --- Интерфейсы ---
interface Project {
    id: number;
    title: string;
    shortDesc: string;
    fullDesc: string;
    techStack: string[];
    link?: string; 
    github?: string; 
}

interface TechItem {
    icon: string;
    title: string;
    desc: string;
}

interface SoftSkill {
    svgPath: string;
    title: string;
    desc: string;
}

// --- Данные ---
const projectsData: Project[] = [
    {
        id: 1,
        title: "By Coding AI",
        shortDesc: "Образовательная платформа про ИИ",
        fullDesc: "Школьный проект, представляющий собой интерактивную платформу для изучения искусственного интеллекта. Включает теоретические материалы, тесты и адаптивный дизайн.",
        techStack: ["React", "Vite", "CSS3", "GitHub Pages"],
        link: "https://sendox2012-debug.github.io/by-coding-ai/",
        github: "https://github.com/sendox2012-debug/by-coding-ai"
    },
    {
        id: 2,
        title: "Nova Dev Portfolio",
        shortDesc: "Персональное портфолио разработчика",
        fullDesc: "Сайт-портфолио с современным дизайном и анимациями. Демонстрирует владение чистым JavaScript, семантической версткой и работой с DOM.",
        techStack: ["JavaScript (ES6+)", "HTML5", "CSS3", "Animations"],
        link: 'https://sendox2012-debug.github.io/Nova-dev/',
        github: "https://github.com/sendox2012-debug/Nova-dev"
    },
    {
        id: 3,
        title: "CodeMaster Landing",
        shortDesc: "Лендинг для курсов программирования",
        fullDesc: "Промо-страница для образовательных курсов. Реализована адаптивная верстка, форма обратной связи и секции с преимуществами.",
        techStack: ["HTML5", "CSS3", "Flexbox", "Grid"],
        link: "https://sendox2012-debug.github.io/CodeMaster-petProject/",
        github: 'https://github.com/sendox2012-debug/CodeMaster-petProject'
    }
];

const hardSkills = [
    "JavaScript", "TypeScript", "React", "HTML5", "CSS3", 
    "Tailwind", "Node.js", "Express", "NestJS", "PostgreSQL", 
    "MongoDB", "Git", "Docker", "REST API", "Figma"
];

const softSkills: SoftSkill[] = [
    { 
        svgPath: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", 
        title: "Коммуникабельность", 
        desc: "Работа в команде и общение с заказчиками" 
    },
    { 
        svgPath: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z", 
        title: "Решение проблем", 
        desc: "Поиск эффективных решений и дебаггинг" 
    },
    { 
        svgPath: "M12 6v6l4 2 M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", 
        title: "Тайм-менеджмент", 
        desc: "Соблюдение дедлайнов и планирование" 
    },
    { 
        svgPath: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", 
        title: "Обучаемость", 
        desc: "Быстрое освоение новых технологий" 
    }
];

// Компонент для отрисовки SVG иконки
const Icon: React.FC<{ path: string; size?: number; color?: string; style?: React.CSSProperties }> = ({ path, size = 24, color = 'currentColor', style }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
        <path d={path} />
    </svg>
);

// SVG путь для GitHub
const GithubIcon = ({ size = 24, color = 'currentColor', style }: { size?: number; color?: string; style?: React.CSSProperties }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
);

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Блокируем скролл страницы при открытом мобильном меню
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.fade-in-section');
        elements.forEach(el => observer.observe(el));

        return () => {
            observer.disconnect();
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen, isMobileMenuOpen]);

    const handleOpenModal = (project: Project): void => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const techItems: TechItem[] = [
        { icon: 'layout', title: 'Frontend', desc: 'React, Vite, Tailwind' },
        { icon: 'server', title: 'Backend', desc: 'Node.js, Express, NestJS' },
        { icon: 'database', title: 'Database', desc: 'PostgreSQL, MongoDB' },
        { icon: 'git-branch', title: 'Tools', desc: 'Git, Docker, Postman' }
    ];

    return (
        <div className="app-wrapper">

            {/* Навигация */}
            <nav className="navbar">
                <div className="container nav-container">
                    <a href="#" className="logo" onClick={closeMobileMenu}>
                        <Icon path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" size={24} color="#3b82f6" />
                        SENDO
                    </a>
                    
                    {/* Кнопка бургера (видна только на мобильных) */}
                    <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Меню">
                        <Icon path={isMobileMenuOpen ? "M18 6 6 18 M6 6l12 12" : "M4 12h16 M4 6h16 M4 18h16"} size={28} />
                    </button>

                    {/* Обычное меню (скрыто на мобильных, видно на десктопе) */}
                    <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                        <li><a href="#home" className="nav-link" onClick={closeMobileMenu}>Главная</a></li>
                        <li><a href="#skills" className="nav-link" onClick={closeMobileMenu}>Навыки</a></li>
                        <li><a href="#projects" className="nav-link" onClick={closeMobileMenu}>Проекты</a></li>
                        <li><a href="#contact" className="nav-link" onClick={closeMobileMenu}>Контакты</a></li>
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="container fade-in-section">
                    <h1>Fullstack JS Developer</h1>
                    <p>
                        Привет, я <span className="highlight">sendox2012-debug</span>.
                        Разрабатываю современные веб-приложения, используя React, Node.js и базы данных.
                    </p>
                    <div className="hero-buttons">
                        <a href="#projects" className="btn btn-primary" onClick={closeMobileMenu}>
                            Смотреть работы
                        </a>
                        <a href="https://github.com/sendox2012-debug" target="_blank" rel="noreferrer" className="btn btn-outline">
                            <GithubIcon size={18} /> GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section id="stack" className="container" style={{ padding: '60px 20px' }}>
                <h2 className="section-title fade-in-section">Технологии</h2>
                <div className="tech-grid">
                    {techItems.map((item, idx) => (
                        <div key={idx} className="tech-card fade-in-section">
                            <div className="tech-icon-wrapper">
                                <i data-lucide={item.icon} style={{ width: 40, height: 40 }}></i>
                            </div>
                            <h3>{item.title}</h3>
                            <p style={{ color: '#94a3b8', marginTop: '8px' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Hard & Soft Skills Section */}
            <section id="skills" className="container" style={{ padding: '40px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    
                    {/* Hard Skills */}
                    <div className="fade-in-section">
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px', fontSize: '1.5rem' }}>Hard Skills</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {hardSkills.map((skill, index) => (
                                <span key={index} className="tech-badge" style={{ 
                                    background: 'rgba(59, 130, 246, 0.1)', 
                                    color: '#60a5fa', 
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 500
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="fade-in-section">
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px', fontSize: '1.5rem' }}>Soft Skills</h2>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {softSkills.map((skill, idx) => (
                                <div key={idx} style={{ 
                                    display: 'flex', 
                                    alignItems: 'flex-start', 
                                    gap: '12px',
                                    background: 'var(--bg-sec)',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)'
                                }}>
                                    <div style={{ color: '#3b82f6', minWidth: '24px' }}>
                                        <Icon path={skill.svgPath} size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{skill.title}</h4>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>{skill.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* GitHub Profile Link Section */}
            <section className="container" style={{ padding: '40px 20px' }}>
                <div className="fade-in-section" style={{ 
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '20px',
                    padding: '30px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: '1px solid #334155'
                }}>
                    <div style={{ background: '#334155', padding: '16px', borderRadius: '50%', marginBottom: '20px' }}>
                        <GithubIcon size={40} color="#f0f6fc" />
                    </div>
                    <h2 style={{ color: '#f0f6fc', marginBottom: '12px', fontSize: '1.5rem' }}>Исходный код проектов</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '30px', maxWidth: '600px', fontSize: '0.95rem' }}>
                        Весь мой код открыт. Посмотрите архитектуру проектов и активность коммитов в моем профиле.
                    </p>
                    <a 
                        href="https://github.com/sendox2012-debug" 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{ padding: '10px 24px', fontSize: '0.95rem', width: '100%', maxWidth: '300px' }}
                    >
                        Перейти в профиль
                    </a>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="container" style={{ padding: '60px 20px' }}>
                <h2 className="section-title fade-in-section">Мои Проекты</h2>
                <div className="projects-grid">
                    {projectsData.map((proj) => (
                        <ProjectCard
                            key={proj.id}
                            project={proj}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </div>
            </section>

            {/* Footer с контактами */}
            <footer id="contact" className="footer">
                <div className="container footer-container">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <Icon path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" size={24} color="#3b82f6" />
                            SENDO
                        </div>
                        <p className="footer-desc">
                            Fullstack разработка любой сложности. <br />
                            Пишите, обсудим ваш проект.
                        </p>
                    </div>

                    <div className="contact-cards">
                        <a href="https://t.me/tg_sendo" target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-icon">
                                <i data-lucide="send" style={{ width: 24, height: 24 }}></i>
                            </div>
                            <div className="contact-info">
                                <span className="contact-label">Telegram</span>
                                <span className="contact-value">@tg_sendo</span>
                            </div>
                        </a>

                        <a href="mailto:sendox2012@gmail.com" className="contact-card">
                            <div className="contact-icon">
                                <i data-lucide="mail" style={{ width: 24, height: 24 }}></i>
                            </div>
                            <div className="contact-info">
                                <span className="contact-label">Email</span>
                                <span className="contact-value">sendox2012@gmail.com</span>
                            </div>
                        </a>
                        
                         <a href="https://github.com/sendox2012-debug" target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-icon">
                                <GithubIcon size={24} />
                            </div>
                            <div className="contact-info">
                                <span className="contact-label">GitHub</span>
                                <span className="contact-value">sendox2012-debug</span>
                            </div>
                        </a>
                    </div>
                </div>

            </footer>

            {/* Modal Window */}
            <div 
                className={`modal-overlay ${isModalOpen ? 'open' : ''}`} 
                onClick={handleCloseModal}
                role="button"
                tabIndex={0}
                aria-hidden={!isModalOpen}
            >
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <button className="close-modal" onClick={handleCloseModal} aria-label="Закрыть">
                        <Icon path="M18 6 6 18 M6 6l12 12" size={24} />
                    </button>
                    
                    {selectedProject && (
                        <>
                            <h2 style={{ marginBottom: '1rem', color: 'white', fontSize: '1.5rem' }}>{selectedProject.title}</h2>
                            <p style={{ marginBottom: '1.5rem', color: '#cbd5e1', lineHeight: '1.6' }}>{selectedProject.fullDesc}</p>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', color: '#94a3b8' }}>Стек:</h4>
                                <div className="tech-stack">
                                    {selectedProject.techStack.map((t, i) => (
                                        <span key={i} className="tech-badge">{t}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'row' }}>
                                {selectedProject.link && (
                                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                        <Icon path="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3" size={16} /> Demo
                                    </a>
                                )}
                                {selectedProject.github && (
                                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                                        <GithubIcon size={16} /> Code
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};

export default App;