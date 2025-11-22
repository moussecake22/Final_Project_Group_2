// app.js - Portfolio Application Logic

// ========== Application State ==========
const state = {
  members: [],
  currentMember: null,
  currentTab: 'overview'
};

// ========== Configuration ==========
const config = {
  dataFile: 'content.json',
  defaultAvatar: '👤'
};

// ========== Initialize Application ==========
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadContent();
    initializeNavigation();
    initializeTabs();
    initializeMobileMenu();
    handleInitialRoute();
  } catch (error) {
    console.error('Error initializing application:', error);
    showError('Failed to load portfolio content. Please try refreshing the page.');
  }
});

// ========== Content Loading ==========
async function loadContent() {
  try {
    const response = await fetch(config.dataFile);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    state.members = data.members || [];
    
    if (state.members.length === 0) {
      throw new Error('No members found in content file');
    }
  } catch (error) {
    console.error('Error loading content:', error);
    // Fallback to sample data if content.json is not available
    state.members = getSampleData();
  }
}

// ========== Navigation ==========
function initializeNavigation() {
  const nav = document.getElementById('members-nav');
  if (!nav) return;
  
  // Clear existing navigation
  nav.innerHTML = '';
  
  // Add home button
  const homeBtn = document.createElement('button');
  homeBtn.textContent = 'Home';
  homeBtn.className = 'nav-link active';
  homeBtn.addEventListener('click', () => showHome());
  nav.appendChild(homeBtn);
  
  // Add member navigation buttons
  state.members.forEach((member, index) => {
    const btn = document.createElement('button');
    btn.textContent = member.name;
    btn.className = 'nav-link';
    btn.dataset.memberId = member.id || index;
    btn.addEventListener('click', () => showMember(member.id || index));
    nav.appendChild(btn);
  });
}

function updateNavigation(activeId = null) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (activeId === null && link.textContent === 'Home') {
      link.classList.add('active');
    } else if (link.dataset.memberId === String(activeId)) {
      link.classList.add('active');
    }
  });
}

// ========== Mobile Menu ==========
function initializeMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('members-nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
}

// ========== Tab Navigation ==========
function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      switchTab(tabName);
    });
  });
  
  // Back button
  const backButton = document.getElementById('back-button');
  if (backButton) {
    backButton.addEventListener('click', showHome);
  }
}

function switchTab(tabName) {
  state.currentTab = tabName;
  
  // Update tab buttons
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    }
  });
  
  // Update tab panels
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(panel => {
    panel.hidden = true;
    panel.classList.remove('active');
  });
  
  const activePanel = document.getElementById(`panel-${tabName}`);
  if (activePanel) {
    activePanel.hidden = false;
    activePanel.classList.add('active');
  }
}

// ========== View Management ==========
function showHome() {
  const intro = document.getElementById('intro');
  const memberSection = document.getElementById('member-section');
  
  if (intro) intro.hidden = false;
  if (memberSection) memberSection.hidden = true;
  
  state.currentMember = null;
  updateNavigation(null);
  updateURL('');
}

function showMember(memberId) {
  const member = state.members.find(m => (m.id || state.members.indexOf(m)) === memberId) 
                 || state.members[memberId];
  
  if (!member) {
    console.error('Member not found:', memberId);
    return;
  }
  
  state.currentMember = member;
  
  const intro = document.getElementById('intro');
  const memberSection = document.getElementById('member-section');
  
  if (intro) intro.hidden = true;
  if (memberSection) {
    memberSection.hidden = false;
    renderMemberContent(member);
  }
  
  updateNavigation(memberId);
  switchTab('overview');
  updateURL(member.id || memberId);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== Member Content Rendering ==========
function renderMemberContent(member) {
  // Render member header
  renderMemberHeader(member);
  
  // Render tab contents
  renderOverview(member);
  renderPrelim(member);
  renderMidterm(member);
  renderFinals(member);
  renderReflection(member);
}

function renderMemberHeader(member) {
  const avatar = document.getElementById('member-avatar');
  const name = document.getElementById('member-name');
  const role = document.getElementById('member-role');
  const contact = document.getElementById('member-contact');
  
  if (avatar) {
    avatar.textContent = member.avatar || getInitials(member.name);
    avatar.style.background = member.color || getRandomGradient();
  }
  
  if (name) name.textContent = member.name;
  if (role) role.textContent = member.role || 'Team Member';
  
  if (contact) {
    contact.innerHTML = '';
    if (member.email) {
      const emailLink = document.createElement('a');
      emailLink.href = `mailto:${member.email}`;
      emailLink.textContent = member.email;
      contact.appendChild(emailLink);
    }
    if (member.github) {
      const githubLink = document.createElement('a');
      githubLink.href = member.github;
      githubLink.textContent = 'GitHub';
      githubLink.target = '_blank';
      contact.appendChild(document.createTextNode(' • '));
      contact.appendChild(githubLink);
    }
  }
}

function renderOverview(member) {
  const container = document.getElementById('overview-content');
  if (!container) return;
  
  container.innerHTML = `
    <div class="overview-card">
      <h4>About</h4>
      <p>${member.bio || 'No bio available.'}</p>
    </div>
    <div class="overview-card">
      <h4>Key Contributions</h4>
      <p>${member.contributions || 'Various contributions to the project.'}</p>
    </div>
    <div class="overview-card">
      <h4>Skills & Technologies</h4>
      <p>${member.skills || 'HTML, CSS, JavaScript, Docker, Ansible'}</p>
    </div>
  `;
}

function renderPrelim(member) {
  renderActivity('prelim-hoa-content', member.prelimHOA);
  renderActivity('prelim-exam-content', member.prelimExam);
}

function renderMidterm(member) {
  renderActivity('midterm-hoa-content', member.midtermHOA);
  renderActivity('midterm-exam-content', member.midtermExam);
}

function renderFinals(member) {
  renderActivity('finals-hoa-content', member.finalsHOA);
  renderActivity('final-exam-content', member.finalExam);
}

function renderReflection(member) {
  const container = document.getElementById('reflection-content');
  if (!container) return;
  
  const reflection = member.reflection || {
    text: 'No reflection available yet.'
  };
  
  let html = '';
  
  if (reflection.introduction) {
    html += `<p>${reflection.introduction}</p>`;
  }
  
  if (reflection.learnings && reflection.learnings.length > 0) {
    html += '<h4>Key Learnings</h4><ul>';
    reflection.learnings.forEach(learning => {
      html += `<li>${learning}</li>`;
    });
    html += '</ul>';
  }
  
  if (reflection.challenges && reflection.challenges.length > 0) {
    html += '<h4>Challenges Faced</h4><ul>';
    reflection.challenges.forEach(challenge => {
      html += `<li>${challenge}</li>`;
    });
    html += '</ul>';
  }
  
  if (reflection.future) {
    html += `<h4>Future Goals</h4><p>${reflection.future}</p>`;
  }
  
  if (reflection.text) {
    html += `<p>${reflection.text}</p>`;
  }
  
  container.innerHTML = html || '<p>No reflection available yet.</p>';
}

function renderActivity(elementId, content) {
  const container = document.getElementById(elementId);
  if (!container) return;
  
  if (!content) {
    container.innerHTML = '<p>Content not yet available.</p>';
    return;
  }
  
  if (typeof content === 'string') {
    container.innerHTML = `<p>${content}</p>`;
    return;
  }
  
  let html = '';
  
  if (content.title) {
    html += `<h5>${content.title}</h5>`;
  }
  
  if (content.description) {
    html += `<p>${content.description}</p>`;
  }
  
  if (content.topics && content.topics.length > 0) {
    html += '<h5>Topics Covered:</h5><ul>';
    content.topics.forEach(topic => {
      html += `<li>${topic}</li>`;
    });
    html += '</ul>';
  }
  
  if (content.tasks && content.tasks.length > 0) {
    html += '<h5>Tasks Completed:</h5><ol>';
    content.tasks.forEach(task => {
      html += `<li>${task}</li>`;
    });
    html += '</ol>';
  }
  
  if (content.score) {
    html += `<p><strong>Score:</strong> ${content.score}</p>`;
  }
  
  if (content.notes) {
    html += `<p><em>${content.notes}</em></p>`;
  }
  
  container.innerHTML = html || '<p>Content not yet available.</p>';
}

// ========== URL Management ==========
function handleInitialRoute() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const memberId = parseInt(hash) || hash;
    const member = state.members.find(m => (m.id || state.members.indexOf(m)) === memberId);
    if (member) {
      showMember(memberId);
      return;
    }
  }
  showHome();
}

function updateURL(memberId) {
  if (memberId) {
    window.location.hash = memberId;
  } else {
    window.history.pushState('', document.title, window.location.pathname);
  }
}

// Handle browser back/forward
window.addEventListener('hashchange', handleInitialRoute);

// ========== Utility Functions ==========
function getInitials(name) {
  if (!name) return config.defaultAvatar;
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getRandomGradient() {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function showError(message) {
  const main = document.getElementById('main');
  if (main) {
    main.innerHTML = `
      <div class="container">
        <div style="text-align: center; padding: 3rem; background: #fee; border: 1px solid #fcc; border-radius: 8px; margin: 2rem 0;">
          <h2 style="color: #c00;">Error</h2>
          <p>${message}</p>
        </div>
      </div>
    `;
  }
}

// ========== Sample Data (Fallback) ==========
function getSampleData() {
  return [
    {
      id: 1,
      name: 'John Doe',
      role: 'Team Lead',
      avatar: 'JD',
      email: 'john.doe@example.com',
      github: 'https://github.com/johndoe',
      bio: 'Team lead responsible for project coordination and Docker implementation.',
      contributions: 'Led Docker containerization, coordinated team efforts, and managed deployment pipeline.',
      skills: 'Docker, Ansible, Project Management, Linux Administration',
      prelimHOA: {
        title: 'Introduction to Containerization',
        description: 'Learned the basics of Docker and containerization concepts.',
        topics: ['Docker basics', 'Container vs VM', 'Image creation', 'Container lifecycle'],
        tasks: [
          'Install Docker on local machine',
          'Run first container',
          'Create simple Dockerfile',
          'Build and test image'
        ]
      },
      prelimExam: {
        description: 'Practical exam covering Docker fundamentals and basic containerization.',
        score: '95/100',
        notes: 'Excellent understanding of container concepts'
      },
      midtermHOA: {
        title: 'Advanced Docker & Networking',
        description: 'Explored Docker networking, volumes, and multi-container applications.',
        topics: ['Docker networks', 'Volume management', 'Docker Compose', 'Container linking'],
        tasks: [
          'Set up custom network',
          'Configure persistent storage',
          'Create multi-container app',
          'Implement container communication'
        ]
      },
      midtermExam: {
        description: 'Comprehensive exam on Docker networking and container orchestration.',
        score: '92/100'
      },
      finalsHOA: {
        title: 'Ansible Automation & Deployment',
        description: 'Implemented Ansible playbooks for automated Docker deployment across multiple VMs.',
        topics: ['Ansible fundamentals', 'Playbook creation', 'Multi-VM deployment', 'CI/CD integration'],
        tasks: [
          'Write image builder playbook',
          'Create container runner playbook',
          'Test on CentOS VM',
          'Deploy to Ubuntu VMs',
          'Implement idempotency'
        ]
      },
      finalExam: {
        description: 'Final project: Complete automated deployment pipeline using Docker and Ansible.',
        score: '98/100',
        notes: 'Outstanding implementation of automation'
      },
      reflection: {
        introduction: 'This project has been an incredible learning experience in modern DevOps practices.',
        learnings: [
          'Gained deep understanding of containerization and its benefits',
          'Learned to write efficient Dockerfiles and manage images',
          'Mastered Ansible for infrastructure automation',
          'Understood the importance of idempotency in automation',
          'Developed skills in cross-platform deployment (CentOS & Ubuntu)'
        ],
        challenges: [
          'Initial difficulty understanding Docker networking concepts',
          'Troubleshooting Ansible playbook compatibility across different Linux distributions',
          'Managing team coordination and version control'
        ],
        future: 'I plan to explore Kubernetes for container orchestration and dive deeper into CI/CD pipelines using Jenkins and GitLab CI.'
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Frontend Developer',
      avatar: 'JS',
      email: 'jane.smith@example.com',
      bio: 'Frontend specialist focused on creating responsive and accessible web interfaces.',
      contributions: 'Developed the portfolio website with modern HTML/CSS/JS. Ensured responsive design and accessibility.',
      skills: 'HTML5, CSS3, JavaScript, Responsive Design, UI/UX',
      prelimHOA: {
        title: 'Web Development Fundamentals',
        description: 'Built foundational knowledge in HTML, CSS, and JavaScript.',
        topics: ['HTML5 semantics', 'CSS Flexbox and Grid', 'JavaScript basics', 'Responsive design'],
        tasks: [
          'Create semantic HTML structure',
          'Style with modern CSS',
          'Add JavaScript interactivity',
          'Implement mobile-first design'
        ]
      },
      prelimExam: {
        description: 'Created a responsive landing page from scratch.',
        score: '94/100'
      },
      midtermHOA: {
        title: 'Advanced CSS & JavaScript',
        description: 'Explored CSS animations, transitions, and advanced JavaScript patterns.',
        topics: ['CSS animations', 'JavaScript ES6+', 'DOM manipulation', 'Event handling'],
        tasks: [
          'Create animated UI components',
          'Implement tab navigation',
          'Build dynamic content loading',
          'Add smooth transitions'
        ]
      },
      midtermExam: {
        description: 'Developed an interactive web application with dynamic content.',
        score: '96/100'
      },
      finalsHOA: {
        title: 'Full Portfolio Development',
        description: 'Created complete portfolio website with all required sections.',
        topics: ['Project structure', 'Content management', 'State management', 'Accessibility'],
        tasks: [
          'Design portfolio layout',
          'Implement navigation system',
          'Create member pages',
          'Add content sections for all activities'
        ]
      },
      finalExam: {
        description: 'Final portfolio website with all deliverables and responsive design.',
        score: '99/100'
      },
      reflection: {
        introduction: 'Building this portfolio taught me so much about modern web development practices.',
        learnings: [
          'Improved CSS skills with modern layout techniques',
          'Learned to structure JavaScript applications effectively',
          'Understood the importance of semantic HTML',
          'Gained experience in responsive and mobile-first design',
          'Developed better code organization habits'
        ],
        challenges: [
          'Ensuring cross-browser compatibility',
          'Creating a flexible content management system',
          'Balancing aesthetics with performance'
        ],
        future: 'I want to learn React and Vue.js to build more complex single-page applications, and explore CSS preprocessors like SASS.'
      }
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'DevOps Engineer',
      avatar: 'MJ',
      email: 'mike.j@example.com',
      bio: 'DevOps specialist handling infrastructure automation and deployment processes.',
      contributions: 'Configured VMs, wrote Ansible playbooks, and managed deployment across multiple environments.',
      skills: 'Ansible, Linux, Shell Scripting, CI/CD, Infrastructure as Code',
      prelimHOA: {
        title: 'Linux System Administration',
        description: 'Learned Linux fundamentals and system administration tasks.',
        topics: ['Linux commands', 'File permissions', 'Package management', 'Service management'],
        tasks: [
          'Set up CentOS VM',
          'Configure Ubuntu VMs',
          'Install required packages',
          'Configure SSH access'
        ]
      },
      prelimExam: {
        description: 'Practical Linux administration tasks.',
        score: '91/100'
      },
      midtermHOA: {
        title: 'Ansible Basics',
        description: 'Introduction to Ansible and infrastructure automation.',
        topics: ['Ansible concepts', 'Inventory management', 'Ad-hoc commands', 'Basic playbooks'],
        tasks: [
          'Install Ansible',
          'Configure inventory file',
          'Write first playbook',
          'Test on multiple hosts'
        ]
      },
      midtermExam: {
        description: 'Created Ansible playbook for system configuration.',
        score: '93/100'
      },
      finalsHOA: {
        title: 'Complete Deployment Automation',
        description: 'Implemented full deployment pipeline with Ansible and Docker.',
        topics: ['Advanced playbooks', 'Role creation', 'Variable management', 'Error handling'],
        tasks: [
          'Create image builder playbook',
          'Develop container runner playbook',
          'Implement idempotency checks',
          'Test across CentOS and Ubuntu',
          'Document deployment process'
        ]
      },
      finalExam: {
        description: 'Final deployment automation with complete documentation.',
        score: '97/100'
      },
      reflection: {
        introduction: 'This project gave me hands-on experience with real-world DevOps practices.',
        learnings: [
          'Mastered Ansible for infrastructure automation',
          'Learned to write idempotent and reusable playbooks',
          'Understood cross-platform deployment challenges',
          'Gained experience with Docker in production',
          'Improved documentation and communication skills'
        ],
        challenges: [
          'Handling differences between CentOS and Ubuntu package managers',
          'Debugging Ansible playbook errors',
          'Ensuring idempotency across all tasks'
        ],
        future: 'I plan to learn Terraform for infrastructure provisioning and explore Kubernetes for container orchestration at scale.'
      }
    }
  ];
}
