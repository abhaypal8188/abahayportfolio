import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const skills = [
  { name: "React / Frontend", value: 93, accent: "var(--cyan)" },
  { name: "Node.js / Express", value: 88, accent: "var(--green)" },
  { name: "MongoDB", value: 84, accent: "var(--purple)" },
  { name: "DSA / Problem Solving", value: 90, accent: "var(--cyan)" },
  { name: "Javascript", value: 86, accent: "var(--purple)" },
  { name: "Tailwind CSS", value: 83, accent: "var(--green)" },
  { name: "Python", value: 84, accent: "var(--purple)" },
  { name: "Git/Github", value: 91, accent: "var(--green)" },
];

const experiences = [
  {
    title: "Full Stack Developer Intern",
    company: "GRAStech Service Pvt. Ltd.",
    period: "july 2025 - oct 2025",
    summary:
      " Developed dynamic web applications using React for the frontend and Node.js with Express.js for the backend.",
    metric: 88,
  },

  
  {
    title: "Freelance Web Developer",
    company: "Independent Projects",
    period: "2024 - 2025",
    summary:
      "Designed modern portfolio, startup landing, and admin panel experiences with reusable React components, API integration, and motion-rich UI systems.",
    metric: 81,
  },
  {
    title: "Open Source Contributor",
    company: "Community",
    period: "2023 - Present",
    summary:
      "Improved documentation, frontend interactions, and issue fixes across student-focused repositories while collaborating through Git and pull request workflows.",
    metric: 74,
  },
  

];

const projects = [
  {
    title: "Video Conferencing Platform ",
    description:
      " Developed a scalable real-time video conferencing platform supporting multiple users using WebRTC and Socket.io.Designed features like meeting rooms, screen sharing, chat messaging, and user authenticatio",
    github: "https://github.com/yourusername/neurohire-ai",
    live: "https://yourusername.github.io/neurohire-ai",
    stack: "WebRTC, Node.js, Express.js, Socket.io, React.js",
  },
  {
    title: "Social Media Platform",
    description:
      " Developing a full-stack social media platform with user authentication and profile management.Implementing features like post creation, likes, comments, and real-time interactions.Designed RESTful APIs for seamless communication between frontend and backend",
    github: "https://github.com/yourusername/cipher-chat",
    live: "https://yourusername.github.io/cipher-chat",
    stack: "React.js, Node.js, Express.js, MongoDB, REST APIs",
  },
  {
    title: "SigmaGPT — AI Chat Application ",
    description:
      "Developed an AI-powered chat application using OpenAI APIs for natural language processing and response gen-eration.Implemented REST API integration to handle user queries and generate real-time intelligent responses.",
    github: "https://github.com/yourusername/quantum-campus",
    live: "https://yourusername.github.io/quantum-campus",
    stack: "OpenAI API, Node.js, Express.js, React.js, JavaScript",
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/abhaypal8188" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhay-pal-a76687347/" },
  { label: "Email", href: "mailto:  abhaypal8188@gmail.com" }
];

function App() {
  const [typedText, setTypedText] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const canvasRef = useRef(null);
  const fullName = "ABHAY PAL";

  const stats = useMemo(
    () => [
      { label: "Projects", value: "5+" },
      { label: "Tech Stack Depth", value: "MERN" },
      { label: "Current Focus", value: "Full Stack + AI " },
    ],
    []
  );

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      setTypedText(fullName.slice(0, index + 1));
      index += 1;
      if (index === fullName.length) {
        window.clearInterval(timer);
      }
    }, 120);

    return () => window.clearInterval(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() || "there";
    setFormStatus(`Thanks ${name}, your message interface is ready to be connected to a backend service.`);
    event.currentTarget.reset();
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.28 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    const interactive = document.querySelectorAll(
      "a, button, input, textarea, .tilt-card, .nav-link"
    );

    const activate = () => setCursorHover(true);
    const deactivate = () => setCursorHover(false);

    window.addEventListener("mousemove", handleMove);
    interactive.forEach((item) => {
      item.addEventListener("mouseenter", activate);
      item.addEventListener("mouseleave", deactivate);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      interactive.forEach((item) => {
        item.removeEventListener("mouseenter", activate);
        item.removeEventListener("mouseleave", deactivate);
      });
    };
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card");

    const handleMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 16;
      const rotateX = (0.5 - y / rect.height) * 16;

      card.style.setProperty("--rotate-x", `${rotateX}deg`);
      card.style.setProperty("--rotate-y", `${rotateY}deg`);
    };

    const reset = (event) => {
      event.currentTarget.style.setProperty("--rotate-x", "0deg");
      event.currentTarget.style.setProperty("--rotate-y", "0deg");
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", reset);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", reset);
      });
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    let animationFrame;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.length = 0;
      const count = Math.min(70, Math.floor(window.innerWidth / 20));
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.2 + 0.8,
          speedX: (Math.random() - 0.5) * 0.45,
          speedY: (Math.random() - 0.5) * 0.45,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(84, 244, 255, 0.75)";
        context.shadowBlur = 16;
        context.shadowColor = "rgba(84, 244, 255, 0.85)";
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const peer = particles[next];
          const distance = Math.hypot(particle.x - peer.x, particle.y - peer.y);
          if (distance < 110) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(peer.x, peer.y);
            context.strokeStyle = `rgba(133, 95, 255, ${0.14 - distance / 900})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("resize", createParticles);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", createParticles);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="app-shell">
      <canvas ref={canvasRef} className="particles" />
      <div
        className={`cursor-dot ${cursorHover ? "hovered" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
      />
      <div
        className={`cursor-ring ${cursorHover ? "hovered" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
      />

      <header className="navbar glass">
        <a className="brand" href="#hero">
          &lt;/Portfolio&gt;
        </a>
        <nav>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="hero" className="hero visible">
          <div className="hero-copy">
            <p className="eyebrow">Software Developer Portfolio</p>
            <h1 className="glitch" data-text={typedText || fullName}>
              {typedText}
              <span className="typing-caret">|</span>
            </h1>
            <h2>B.Tech Information Technology Student | Full Stack Developer</h2>
            <p className="hero-text">
              I build modern, scalable web applications using the MERN stack with a focus on performance, clean architecture, and seamless user experience.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">
                Hire Me
              </a>
              <a className="btn btn-secondary" href="/ABHAY_RESUME.pdf" download>
                Download CV
              </a>
            </div>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="glass stat-card tilt-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual tilt-card glass">
            <div className="terminal-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="code-block">
              <p>&gt; initializing dev profile...</p>
              <p>&gt; stack = [MongoDB, Express, React, Node]</p>
              <p>&gt; status = "available for impactful builds"</p>
              <p>&gt; speciality = "full stack developer"</p>
              <p className="accent-line">&gt; execute: craft.experience()</p>
            </div>
          </div>
        </section>

        <section id="about" className="reveal-section">
          <div className="section-heading">
            <span className="section-tag">About Me</span>
            <h3>Building sharp interfaces with engineer-level discipline.</h3>
          </div>
          <article className="glass about-card tilt-card">
            <p>
              I am a B.Tech Information Technology student and a passionate MERN stack developer who enjoys building responsive, user-friendly web applications with clean and efficient code.
            </p>
            <p>
             I focus on writing clean and structured React code, building scalable APIs, and creating responsive web applications that are efficient and user-friendly.
            </p>
            <p>
              I enjoy solving real-world problems through code, turning ideas into practical applications that deliver meaningful user experiences.
            </p>
            <p>
              I am constantly learning new technologies and improving my development skills to stay updated with modern industry trends.
            </p>
          </article>
        </section>

        <section id="skills" className="reveal-section">
          <div className="section-heading">
            <span className="section-tag">Core Skills</span>
            <h3>Full stack capability with a modern product mindset.</h3>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.name} className="glass skill-card tilt-card">
                <div
                  className="skill-meter"
                  style={{ "--value": `${skill.value}%`, "--accent": skill.accent }}
                >
                  <div className="skill-ring">
                    <span>{skill.value}%</span>
                  </div>
                </div>
                <h4>{skill.name}</h4>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.value}%`, background: skill.accent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="reveal-section">
          <div className="section-heading">
            <span className="section-tag">Experience</span>
            <h3>Hands-on work shaped by learning, and iteration.</h3>
          </div>
          <div className="experience-list">
            {experiences.map((experience) => (
              <article key={experience.title} className="glass experience-card tilt-card">
                <div className="experience-top">
                  <div>
                    <h4>{experience.title}</h4>
                    <p>{experience.company}</p>
                  </div>
                  <span>{experience.period}</span>
                </div>
                <p>{experience.summary}</p>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill experience-fill"
                    style={{ width: `${experience.metric}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="reveal-section">
          <div className="section-heading">
            <span className="section-tag">Projects</span>
            <h3>Selected builds designed to stand out in both code and craft.</h3>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="glass project-card tilt-card">
                <div className="project-glow" />
                <span className="project-stack">{project.stack}</span>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="reveal-section">
          <div className="section-heading">
            <span className="section-tag">Contact</span>
            <h3>Let’s build something ambitious and production-grade.</h3>
          </div>
          <div className="contact-layout">
            <div className="glass contact-copy tilt-card">
              <h4>Open to internships, full time work, and collaborations.</h4>
              <p>
                If you want a portfolio-worthy product, a polished frontend, or a
                MERN application with strong UX, let’s connect.
              </p>
              <div className="social-links">
                {socialLinks.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <form className="glass contact-form tilt-card" onSubmit={handleSubmit}>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="abhaypal8188@gmail.com" />
              </label>
              <label>
                Project Type
                <input type="text" name="project" placeholder="Web app / portfolio / SaaS" />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your vision..."
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Send Message
              </button>
              {formStatus ? <p className="form-status">{formStatus}</p> : null}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
