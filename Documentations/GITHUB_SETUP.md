# Setting Up with GitHub Repository

This guide explains how to use this portfolio system with your GitHub repository:
**https://github.com/moussecake22/Final_Project_Group_2**

## 📥 Initial Setup

### Option 1: Clone and Replace (Recommended)

```bash
# 1. Clone your existing repository
git clone https://github.com/moussecake22/Final_Project_Group_2.git
cd Final_Project_Group_2

# 2. Backup any existing work
mkdir backup
mv * backup/ 2>/dev/null || true

# 3. Copy all new files from this package
cp /path/to/downloaded/files/* .

# 4. Customize content.json with your team's information
nano content.json

# 5. Test locally
python3 -m http.server 8000
# Visit: http://localhost:8000

# 6. Commit and push
git add .
git commit -m "Add complete portfolio system with Docker and Ansible automation"
git push origin main
```

### Option 2: Add to Existing Structure

```bash
# If you have existing work to preserve
cd Final_Project_Group_2

# Create project folder
mkdir -p portfolio-system
cd portfolio-system

# Copy all files here
cp /path/to/downloaded/files/* .

# Update and test
nano content.json
python3 -m http.server 8000
```

## 🔧 Customization for Your Team

### 1. Update content.json

Replace the 5 member templates with your actual team information:

```json
{
  "projectInfo": {
    "groupName": "Group 2",
    "github": "https://github.com/moussecake22/Final_Project_Group_2"
  },
  "members": [
    {
      "id": 1,
      "name": "Your Actual Name",
      "role": "Your Actual Role",
      "email": "your.actual@email.com",
      "studentId": "Your-Student-ID",
      ...
    }
  ]
}
```

### 2. Update inventory.ini

Add your actual VM information:

```ini
[centos]
centos-vm ansible_host=YOUR_CENTOS_IP ansible_user=YOUR_USERNAME

[ubuntu]
ubuntu-vm1 ansible_host=YOUR_UBUNTU1_IP ansible_user=YOUR_USERNAME
ubuntu-vm2 ansible_host=YOUR_UBUNTU2_IP ansible_user=YOUR_USERNAME
```

### 3. Customize Branding (Optional)

Edit `styles.css` to change colors:

```css
:root {
  --primary-color: #your-color;  /* Change main theme color */
  --secondary-color: #your-color;
}
```

## 📝 Content Structure

Each member should fill in their sections in `content.json`:

```json
{
  "prelimHOA": {
    "title": "What you learned",
    "description": "Details of prelim activities",
    "topics": ["Topic 1", "Topic 2"],
    "tasks": ["Task 1", "Task 2"]
  },
  "prelimExam": {
    "description": "Exam details",
    "score": "Your score"
  },
  // Repeat for midterm and finals
  "reflection": {
    "introduction": "Your reflection",
    "learnings": ["Learning 1", "Learning 2"],
    "challenges": ["Challenge 1"],
    "future": "Future plans"
  }
}
```

## 🚀 Deployment to VMs

### Step 1: Prepare VMs

Ensure you have:
- 1 CentOS VM
- 2 Ubuntu VMs
- SSH access configured
- Sudo privileges

### Step 2: Configure SSH Access

```bash
# Generate SSH key if needed
ssh-keygen -t rsa -b 4096

# Copy to each VM
ssh-copy-id user@centos-vm-ip
ssh-copy-id user@ubuntu-vm1-ip
ssh-copy-id user@ubuntu-vm2-ip
```

### Step 3: Test Ansible Connection

```bash
ansible all -m ping
```

### Step 4: Deploy

```bash
# Build images on all VMs
ansible-playbook build-image.yml

# Deploy containers
ansible-playbook run-container.yml

# Or use Makefile
make deploy
```

## 📊 Progress Tracking

Use GitHub Issues and Projects to track your work:

### Create Issues for Each Task

```
- [ ] Update content.json with team info
- [ ] Configure VMs
- [ ] Test Docker locally
- [ ] Deploy to CentOS
- [ ] Deploy to Ubuntu VMs
- [ ] Take screenshots
- [ ] Record video
- [ ] Write documentation
```

### Use GitHub Project Board

Create columns:
- **To Do**: Pending tasks
- **In Progress**: Current work
- **Review**: Needs team review
- **Done**: Completed

## 📸 Documentation Screenshots

Take these screenshots for your PDF:

### For Each Team Member:
1. Git commit history showing your contributions
2. Your section of the website
3. Your tasks in action

### For the Team:
1. Complete website homepage
2. Each member's portfolio page
3. Ansible playbook execution
4. Docker images list
5. Running containers
6. Website accessible on all VMs
7. Responsive design on mobile
8. GitHub repository view
9. Project board/issues
10. Team collaboration screenshots

## 🎬 Video Recording Script

**Introduction (1 min)**
- Team introduction
- Project overview
- Show GitHub repository

**Website Demo (2 min)**
- Navigate homepage
- Show each member's section
- Demonstrate responsive design

**Docker Explanation (2 min)**
- Show Dockerfile
- Explain container setup
- Show build process

**Ansible Demo (3 min)**
- Show inventory configuration
- Explain playbooks
- Demonstrate deployment

**Live Deployment (5 min)**
- Run ansible-playbook commands
- Show successful deployment
- Access websites on all VMs

**Conclusion (1 min)**
- Summary of achievements
- Team collaboration highlights

## 🔄 Git Workflow

### For Team Collaboration

```bash
# Create feature branches
git checkout -b feature/member1-content
git checkout -b feature/docker-config
git checkout -b feature/ansible-playbooks

# Make changes and commit
git add .
git commit -m "Add: Member 1 portfolio content"

# Push and create pull request
git push origin feature/member1-content

# Team reviews and merges on GitHub
```

### Commit Message Format

```
Add: New feature
Update: Existing feature
Fix: Bug fix
Docs: Documentation only
Test: Testing related
Style: Code formatting
```

## ✅ Pre-Submission Checklist

### Content
- [ ] All 5 members' information updated in content.json
- [ ] All HOAs documented
- [ ] All exams documented  
- [ ] All reflections written
- [ ] Contact information accurate

### Technical
- [ ] Website loads correctly
- [ ] All links work
- [ ] Responsive on mobile
- [ ] Docker image builds successfully
- [ ] Ansible playbooks execute without errors
- [ ] Deployed on all 3 VMs
- [ ] Containers are healthy

### Documentation
- [ ] README.md updated
- [ ] Code commented
- [ ] Deployment guide complete
- [ ] Troubleshooting guide written
- [ ] Screenshots collected
- [ ] Video recorded
- [ ] PDF report completed

### GitHub
- [ ] All code committed
- [ ] Clear commit messages
- [ ] README updated
- [ ] .gitignore configured
- [ ] Repository is public or accessible

### Collaboration Proof
- [ ] Git logs exported
- [ ] Team chat screenshots
- [ ] Meeting notes documented
- [ ] Task assignments clear
- [ ] Individual contributions documented

## 🆘 Common Issues and Solutions

### Issue: Can't access GitHub repository
```bash
# Check if you have access
git clone https://github.com/moussecake22/Final_Project_Group_2.git

# If access denied, ask repository owner to add you as collaborator
```

### Issue: Merge conflicts
```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in files
# Edit conflicting files, remove conflict markers
# Then commit
git add .
git commit -m "Resolve merge conflicts"
git push
```

### Issue: Want to revert changes
```bash
# See commit history
git log --oneline

# Revert to specific commit
git revert <commit-hash>

# Or reset (caution: loses changes)
git reset --hard <commit-hash>
```

## 📧 Collaboration Tips

### Regular Sync Meetings
- Daily standup (15 min)
- Weekly progress review (1 hour)
- Pre-submission review (2 hours)

### Communication Channels
- GitHub Issues for tasks
- Discord/Slack for quick questions
- Video calls for complex discussions
- Email for formal communication

### Code Review Process
1. Create pull request
2. Assign 2 team members to review
3. Address feedback
4. Get approval
5. Merge to main

## 🎓 Learning Resources

### Docker
- Official Docker docs: https://docs.docker.com
- Docker Hub: https://hub.docker.com

### Ansible
- Ansible docs: https://docs.ansible.com
- Ansible Galaxy: https://galaxy.ansible.com

### Git/GitHub
- GitHub Guides: https://guides.github.com
- Git documentation: https://git-scm.com/doc

---

**Repository**: https://github.com/moussecake22/Final_Project_Group_2

**Good luck with your project!** 🚀
