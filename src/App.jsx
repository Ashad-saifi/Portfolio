import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState('#home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Typewriter Effect State
  const [typewriterText, setTypewriterText] = useState("I'm a ");
  const professions = [
    'Full-Stack Developer',
    'Frontend Engineer', 
    'Backend Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Tech Innovator'
  ];
  const [professionIndex, setProfessionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Typewriter Effect Hook
  useEffect(() => {
    let timer;
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypewriterText("I'm a " + currentProfession.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 75);
    } else {
      timer = setTimeout(() => {
        setTypewriterText("I'm a " + currentProfession.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 150);
    }

    if (!isDeleting && charIndex === currentProfession.length) {
      // Pause at the end
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setProfessionIndex(prev => (prev + 1) % professions.length);
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Pause before typing next word
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, professionIndex]);

  // Scroll Listeners
  useEffect(() => {
    const handleScroll = () => {
      // Header scrolled class
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll spy active nav link
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100; // Offset for header

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection('#' + section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Helper
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = 80;
      const offsetTop = targetElement.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
      setIsMenuOpen(false);
    }
  };

  // Form Handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been sent successfully.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="portfolio-app">
      {/* Header / Navbar */}
      <header className={isScrolled ? 'scrolled' : ''}>
        <nav className="navbar">
          <div className="nav-brand" onClick={(e) => handleNavClick(e, '#home')}>
            Portfolio<span className="brand-dot">.</span>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeSection === '#home' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, '#home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${activeSection === '#about' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, '#about')}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={`nav-link ${activeSection === '#skills' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, '#skills')}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#resume" 
                className={`nav-link ${activeSection === '#resume' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, '#resume')}
              >
                Resume
              </a>
            </li>
            <li>
              <a 
                href="#service" 
                className={`nav-link ${activeSection === '#service' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, '#service')}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#project" 
                className={`nav-link ${activeSection === '#project' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, '#project')}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${activeSection === '#contact' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="nav-cta">
            <a href="#contact" className="cta-btn" onClick={(e) => handleNavClick(e, '#contact')}>
              Let's Talk
            </a>
          </div>
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      <main>
        {/* Home Section */}
        <section id="home" className="section home">
          <div className="container">
            <div className="home-content">
              <div className="home-text">
                <div className="greeting">👋 Hello there!</div>
                <h1 className="hero-title">I'm <span className="accent">Ashad saifi</span></h1>
                <h2 className="hero-subtitle">
                  {typewriterText}<span className="cursor">|</span>
                </h2>
                <p className="hero-desc">
                  I'm a BCA student and passionate Full Stack Developer based in Sikandrabad, India. I'm focused on mastering modern full-stack technologies and creating efficient, user-friendly web applications.
                  <br /><br />
                  Currently pursuing my Bachelor of Computer Applications (BCA) while building real-world projects in full-stack web development, specializing in HTML5, CSS3, JavaScript, and modern frameworks.
                </p>
                
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-number">10+</span>
                    <span className="stat-label">Projects Completed</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">10+</span>
                    <span className="stat-label">Skills & Tools</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">20+</span>
                    <span className="stat-label">Happy Clients</span>
                  </div>
                </div>

                <div className="hero-actions">
                  <button className="hire-btn primary" onClick={(e) => handleNavClick(e, '#contact')}>
                    <span>Hire Me</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                  <a href="/CV/Resume.pdf" className="hire-btn secondary" download>
                    <span>Download CV</span>
                  </a>
                </div>

                <div className="social-links">
                  <a href="https://wa.me/918218194545" aria-label="WhatsApp" className="social-icon whatsapp" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/ashad-saifi-aba231314/" aria-label="LinkedIn" className="social-icon linkedin" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/Ashad-saifi" aria-label="GitHub" className="social-icon github" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
              <div className="home-image">
                <div className="image-container">
                  <img src="/images/Ashad saifi.jpg" alt="Profile photo of Ashad" className="profile-image" />
                  <div className="floating-card card-1">
                    <i className="fas fa-code"></i>
                    <span>Clean Code</span>
                  </div>
                  <div className="floating-card card-2">
                    <i className="fas fa-mobile-alt"></i>
                    <span>Responsive</span>
                  </div>
                  <div className="floating-card card-3">
                    <i className="fas fa-rocket"></i>
                    <span>Fast Loading</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about">
          <div className="container">
            <div className="about-content">
              <div className="about-image">
                <div className="image-wrapper">
                  <img src="/images/Ashad saifi.jpg" alt="About Ashad" className="about-img" />
                  <div className="experience-badge">
                    <span className="badge-number">2+</span>
                    <span className="badge-text">Years<br />Experience</span>
                  </div>
                </div>
              </div>
              
              <div className="about-text">
                <h2 className="section-title">About Me</h2>
                <div className="about-description">
                  <p>I'm a BCA student and passionate Full Stack Developer based in Sikandrabad, India, currently pursuing my Bachelor of Computer Applications degree. My focus is on mastering full-stack web development and creating impactful digital solutions.</p>
                  <p>I specialize in creating responsive, user-friendly websites and web applications using modern web technologies. My approach combines technical learning with practical problem-solving to build solutions that are both functional and visually appealing.</p>
                  <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my learning journey with the developer community through my GitHub and social media.</p>
                </div>

                <div className="about-highlights">
                  <div className="highlight">
                    <i className="fas fa-graduation-cap"></i>
                    <div>
                      <h4>Education</h4>
                      <p>BCA (Bachelor of Computer Applications)</p>
                    </div>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <h4>Location</h4>
                      <p>Sikandrabad, Bulandshahr, India</p>
                    </div>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-briefcase"></i>
                    <div>
                      <h4>Current Focus</h4>
                      <p>Web Development & Learning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section skills">
          <div className="container">
            <h2 className="section-title">Skills & Expertise</h2>
            <div className="skills-content">
              <div className="skills-grid">
                <div className="skill-category">
                  <h3>Programming Languages</h3>
                  <div className="skill-items">
                    <div className="skill-item">
                      <i className="fab fa-js-square"></i>
                      <span>JavaScript (ES6+)</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '90%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fas fa-code"></i>
                      <span>TypeScript</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '85%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fab fa-html5"></i>
                      <span>HTML5 & CSS3</span>
                      <div className="skill-bar"><div class="skill-fill" style={{ width: '95%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fas fa-terminal"></i>
                      <span>C / C++ / Java</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '80%' }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Frameworks & Libraries</h3>
                  <div className="skill-items">
                    <div className="skill-item">
                      <i className="fab fa-react"></i>
                      <span>React.js & Next.js</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '90%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fab fa-node-js"></i>
                      <span>Node.js & Express.js</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '85%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fab fa-css3-alt"></i>
                      <span>TailwindCSS</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '90%' }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Databases</h3>
                  <div className="skill-items">
                    <div className="skill-item">
                      <i className="fas fa-database"></i>
                      <span>Supabase (PostgreSQL)</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '85%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fas fa-database"></i>
                      <span>MongoDB</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '80%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fas fa-fire"></i>
                      <span>Firebase</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '80%' }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="skill-category">
                  <h3>Developer Tools</h3>
                  <div className="skill-items">
                    <div className="skill-item">
                      <i className="fab fa-git-alt"></i>
                      <span>Git & GitHub</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '90%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fas fa-code"></i>
                      <span>VS Code & Vercel</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '95%' }}></div></div>
                    </div>
                    <div className="skill-item">
                      <i className="fas fa-bug"></i>
                      <span>Postman & Thunder Client</span>
                      <div className="skill-bar"><div className="skill-fill" style={{ width: '85%' }}></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="section resume">
          <div className="container">
            <h2 class="section-title">Resume & Journey</h2>
            <div className="resume-content">
              {/* Experience */}
              <div className="resume-col">
                <h3 className="resume-subtitle"><i className="fas fa-briefcase"></i> Internship Experience</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-date">Mar 2026 – Present</div>
                    <h4 className="timeline-title">Full Stack Developer Intern</h4>
                    <h5 className="timeline-company">Explurger <span className="location">| On-site | New Delhi</span></h5>
                    <ul className="timeline-details">
                      <li>Working on-site at Explurger's office, gaining hands-on exposure to real-world product development in a fast-paced startup environment.</li>
                      <li>Actively contributing to full-stack feature development using React.js, Node.js, and modern JavaScript frameworks in a live production codebase.</li>
                      <li>Learning and implementing database operations and query optimization in real project scenarios, strengthening practical backend skills.</li>
                      <li>Using Postman daily for API testing, debugging REST endpoints, and verifying request/response flows across the development pipeline.</li>
                      <li>Collaborating directly with senior developers and cross-functional teams to understand how scalable web products are planned, built, and shipped.</li>
                      <li>Getting hands-on experience with the complete software development lifecycle — from feature scoping and coding to testing and deployment.</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-date">Jan 2026 – Feb 2026</div>
                    <h4 class="timeline-title">Full Stack Developer Intern</h4>
                    <h5 className="timeline-company">Infotact Solutions <span className="location">| On-site</span></h5>
                    <ul className="timeline-details">
                      <li>Developed and maintained full-stack web applications using React.js, Node.js, and modern JavaScript frameworks.</li>
                      <li>Collaborated with cross-functional teams to design, build, and deploy scalable web features in production environments.</li>
                      <li>Implemented RESTful APIs and integrated third-party services to enhance application functionality.</li>
                      <li>Contributed to code reviews, debugging sessions, and performance optimization tasks across the development lifecycle.</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-date">Nov 2025 – Feb 2026</div>
                    <h4 className="timeline-title">Web Development Intern</h4>
                    <h5 className="timeline-company">The Developers Arena <span class="location">| Remote</span></h5>
                    <ul className="timeline-details">
                      <li>Designed and implemented responsive web interfaces adhering to modern UI/UX standards using HTML5, CSS3, and JavaScript.</li>
                      <li>Integrated and tested reusable web components ensuring cross-browser compatibility across Chrome, Firefox, and Edge.</li>
                      <li>Resolved 15+ UI/performance bugs improving page load speed and overall usability.</li>
                      <li>Collaborated in an Agile team environment to develop and ship new product features on schedule.</li>
                      <li>Maintained clean, structured codebase using Git version control and GitHub pull request workflows.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education & Certs */}
              <div className="resume-col">
                <h3 className="resume-subtitle"><i className="fas fa-graduation-cap"></i> Education</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-date">2024 – 2027 (Expected)</div>
                    <h4 className="timeline-title">Bachelor of Computer Applications (BCA)</h4>
                    <h5 className="timeline-company">GL Bajaj Institute of Management <span className="location">| Greater Noida</span></h5>
                    <p className="timeline-desc">CGPA: 7.3 / 10.0</p>
                  </div>
                </div>

                <h3 className="resume-subtitle" style={{ marginTop: '2.5rem' }}><i className="fas fa-certificate"></i> Certifications</h3>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <h4 className="timeline-title">CyberOps Associate</h4>
                    <h5 className="timeline-company">Cisco Networking Academy</h5>
                    <p className="timeline-desc">Network Security, Threat Analysis, SOC Operations</p>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <h4 className="timeline-title">Relation to Document Model</h4>
                    <h5 class="timeline-company">MongoDB University</h5>
                    <p className="timeline-desc">NoSQL Data Modeling, Document Structure</p>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <h4 className="timeline-title">Schema Patterns & Antipatterns</h4>
                    <h5 className="timeline-company">MongoDB University</h5>
                    <p className="timeline-desc">Database Design, Optimization Strategies</p>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <h4 className="timeline-title">Full Stack Web Development</h4>
                    <h5 className="timeline-company">Infotact Solutions</h5>
                    <p className="timeline-desc">React.js, Node.js, RESTful APIs, Production Deployment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="service" className="section services">
          <div className="container">
            <h2 className="section-title">What I Do</h2>
            <div className="services-content">
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-code"></i>
                  </div>
                  <h3>Web Development</h3>
                  <p>I create responsive, modern websites using the latest technologies and best practices. From concept to deployment, I ensure your website looks great and performs perfectly.</p>
                  <div className="service-features">
                    <span>Responsive Design</span>
                    <span>Performance Optimized</span>
                    <span>SEO Friendly</span>
                  </div>
                </div>
                
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-palette"></i>
                  </div>
                  <h3>UI/UX Design</h3>
                  <p>Designing intuitive and beautiful user interfaces that provide exceptional user experiences. I focus on usability, accessibility, and visual appeal.</p>
                  <div className="service-features">
                    <span>User-Centered</span>
                    <span>Modern Design</span>
                    <span>Accessibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="project" className="section projects">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-content">
              <div className="projects-grid">
                {/* Project 1: SparkSculpt */}
                <div className="project-card">
                  <div className="project-image">
                    <img src="/images/sparksculpt_mockup.png" alt="SparkSculpt UI Mockup" />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a href="https://github.com/Ashad-saifi/SparkSculpt" className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>SparkSculpt</h3>
                    <p>AI-integrated full-stack platform that assists writers with real-time creative suggestions, content enhancement, and Next.js server-side rendering (SSR) for improved SEO.</p>
                    <div className="project-tech">
                      <span>Next.js</span>
                      <span>React.js</span>
                      <span>Node.js</span>
                      <span>AI Integration</span>
                      <span>Vercel</span>
                    </div>
                  </div>
                </div>

                {/* Project 2: MedXpert */}
                <div className="project-card">
                  <div className="project-image">
                    <img src="/images/medxpert_mockup.png" alt="MedXpert UI Mockup" />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a href="https://github.com/Ashad-saifi/MedXpert" className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>MedXpert</h3>
                    <p>Advanced Telemedicine & EHR platform featuring secure portals, WebRTC audio/video consultations, automated prescription dispatch, and a hybrid database connection engine.</p>
                    <div className="project-tech">
                      <span>React 19</span>
                      <span>Node.js</span>
                      <span>Express</span>
                      <span>MongoDB</span>
                      <span>WebRTC</span>
                      <span>Tailwind CSS</span>
                    </div>
                  </div>
                </div>

                {/* Project 3: MedCare */}
                <div className="project-card">
                  <div className="project-image">
                    <img src="/images/medcare_mockup.png" alt="MedCare UI Mockup" />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a href="https://github.com/Ashad-saifi/Hospital" className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>MedCare</h3>
                    <p>A premium and modern digital health center portal with sleek smooth-scroll animations, interactive doctor directories, scheduling systems, and Three.js visual assets.</p>
                    <div className="project-tech">
                      <span>React 19</span>
                      <span>GSAP</span>
                      <span>Framer Motion</span>
                      <span>Three.js</span>
                      <span>Tailwind v4</span>
                    </div>
                  </div>
                </div>

                {/* Project 4: FoodieHub */}
                <div className="project-card">
                  <div className="project-image">
                    <img src="/images/foodiehub_mockup.png" alt="FoodieHub UI Mockup" />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a href="https://ashad-saifi.github.io/Foodiehub/" className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                        <a href="https://github.com/Ashad-saifi/Foodiehub" className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>FoodieHub</h3>
                    <p>Smart food ordering and restaurant management platform inspired by Zomato/Swiggy. Includes cart systems, favorites wishlist, interactive food search, and order tracking.</p>
                    <div className="project-tech">
                      <span>React.js</span>
                      <span>JavaScript</span>
                      <span>HTML5</span>
                      <span>CSS3</span>
                    </div>
                  </div>
                </div>

                {/* Project 5: Vichaar */}
                <div className="project-card">
                  <div className="project-image">
                    <img src="/images/vichaar_mockup.png" alt="Vichaar UI Mockup" />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a href="https://github.com/Ashad-saifi/vichaar" className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>Vichaar</h3>
                    <p>Feature-rich, modern social media network built with Supabase authentication and real-time updates. Supports hashtag systems, user @mentions, post tagging, reactions, and bookmarks.</p>
                    <div className="project-tech">
                      <span>Next.js 15</span>
                      <span>Supabase</span>
                      <span>PostgreSQL</span>
                      <span>Tailwind v4</span>
                      <span>Cloudinary</span>
                    </div>
                  </div>
                </div>

                {/* Project 6: Landing Page */}
                <div className="project-card">
                  <div className="project-image">
                    <img src="/images/landingpage_mockup.png" alt="Landing Page UI Mockup" />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a href="https://ashad-saifi.github.io/Landing-page/" className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                        <a href="https://github.com/Ashad-saifi/Landing-page" className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>Landing Page</h3>
                    <p>High-converting product landing page showcasing modern layouts, responsive grid structures, interactive navigation menus, and clean semantic structures.</p>
                    <div className="project-tech">
                      <span>HTML5</span>
                      <span>CSS3</span>
                      <span>JavaScript</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>saifiashad649@gmail.com</p>
                    <a href="mailto:saifiashad649@gmail.com">Send Email</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p>+91 8218194545</p>
                    <a href="tel:+91 8218194545">Call Now</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Location</h3>
                    <p>Sikandrabad, Bulandshahr, India</p>
                    <a href="#contact">View on Map</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="contact-details">
                    <h3>WhatsApp</h3>
                    <p>+91 8218194545</p>
                    <a href="https://wa.me/918218194545" target="_blank" rel="noopener noreferrer">Send Message</a>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                    <label htmlFor="name" className={formData.name ? 'active' : ''}>Your Name</label>
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                    <label htmlFor="email" className={formData.email ? 'active' : ''}>Your Email</label>
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      required 
                    />
                    <label htmlFor="subject" className={formData.subject ? 'active' : ''}>Your Subject</label>
                  </div>
                  <div className="form-group">
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      required
                    ></textarea>
                    <label htmlFor="message" className={formData.message ? 'active' : ''}>Your Message</label>
                  </div>
                  <button type="submit" className="submit-btn">
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
