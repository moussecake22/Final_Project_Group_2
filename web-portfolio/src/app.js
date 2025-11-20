// src/app.js - loads content.yml (converted JSON or direct JSON) and renders navigation and member content
// Note: For static sites without a server-side parser, prefer content.json. Browsers block loading local files via fetch when opened as file://.
// If you run with a static server (python -m http.server or via Docker Nginx) fetch will work.

async function loadContent() {
  try {
    // Try JSON first
    const res = await fetch('content.json');
    if (!res.ok) throw new Error('content.json not found');
    return await res.json();
  } catch (e) {
    console.error('Failed to load content.json:', e);
    return { members: [] };
  }
}

function createMemberNav(members) {
  const nav = document.getElementById('members-nav');
  members.forEach((m, idx) => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = m.name;
    a.onclick = (ev) => {
      ev.preventDefault();
      renderMember(m);
    };
    nav.appendChild(a);
  });
}

function renderMember(m) {
  const container = document.getElementById('member-section');
  container.hidden = false;
  container.innerHTML = `
    <h2>${m.name}</h2>
    <p><strong>Role:</strong> ${m.role || 'Member'}</p>
    <h3 class="section-title">HOAs</h3>
    <ul>
      <li>Prelim HOA: ${m.hoa && m.hoa.prelim || 'N/A'}</li>
      <li>Midterm HOA: ${m.hoa && m.hoa.midterm || 'N/A'}</li>
      <li>Finals HOA: ${m.hoa && m.hoa.finals || 'N/A'}</li>
    </ul>
    <h3 class="section-title">Exams</h3>
    <ul>
      <li>Prelim Exam: ${m.exams && m.exams.prelim || 'N/A'}</li>
      <li>Midterm Exam: ${m.exams && m.exams.midterm || 'N/A'}</li>
      <li>Final Exam: ${m.exams && m.exams.final || 'N/A'}</li>
    </ul>
    <h3 class="section-title">Reflection & Learnings</h3>
    <p>${m.reflection || 'No reflection yet.'}</p>
  `;
  container.scrollIntoView({behavior:'smooth'});
}

(async function init() {
  const content = await loadContent();
  createMemberNav(content.members || []);
  // Optionally render first member
  if (content.members && content.members[0]) renderMember(content.members[0]);
})();
