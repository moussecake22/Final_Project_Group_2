# Team Portfolio - Academic Project Showcase

A static web application portfolio showcasing academic deliverables, containerized with Docker and automated deployment using Ansible across multiple VMs.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Deployment](#deployment)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Team Members](#team-members)

## 🎯 Overview

This project contains:
- ✅ **Static Web Application**: HTML/CSS/JS portfolio for each team member
- ✅ **Academic Deliverables**: Prelim/Midterm/Finals HOAs and Exams
- ✅ **Reflections**: Personal learning experiences and insights
- ✅ **Docker Containerization**: Fully containerized web application
- ✅ **Ansible Automation**: Automated build and deployment across CentOS and Ubuntu VMs

## ✨ Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dynamic Content**: Easy-to-update JSON-based content management
- **Modern UI**: Clean, professional interface with smooth animations
- **Tab Navigation**: Organized content sections for each member
- **Docker Support**: Lightweight nginx-based container
- **Multi-Platform**: Automated deployment on CentOS and Ubuntu
- **Health Checks**: Built-in container health monitoring
- **Security**: Non-root container user, security headers

## 📁 Project Structure

```
team-portfolio/
├── index.html              # Main HTML file
├── styles.css              # Stylesheet
├── app.js                  # JavaScript application logic
├── content.json            # Portfolio content data
├── Dockerfile              # Docker container definition
├── nginx.conf              # Nginx web server configuration
├── build-image.yml         # Ansible playbook #1 (Image Builder)
├── run-container.yml       # Ansible playbook #2 (Container Runner)
├── inventory.ini           # Ansible inventory file
├── ansible.cfg             # Ansible configuration
└── README.md               # This file
```

## 🔧 Prerequisites

### For Local Development
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)

### For Docker Deployment
- Docker Engine 20.10+
- Docker Compose (optional)

### For Ansible Automation
- Ansible 2.9+
- Python 3.6+
- SSH access to target VMs

### Target VMs
- **1x CentOS VM** (CentOS 7/8)
- **2x Ubuntu VMs** (Ubuntu 18.04/20.04/22.04)
- Minimum 1GB RAM, 1 CPU per VM
- SSH access configured

## 🚀 Quick Start

### Local Development

1. **Clone or download the project:**
   ```bash
   git clone <repository-url>
   cd team-portfolio
   ```

2. **Open in browser:**
   ```bash
   # Simply open index.html in your browser
   # Or use a local web server:
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

### Docker Deployment (Single Host)

1. **Build the Docker image:**
   ```bash
   docker build -t team-portfolio:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d --name portfolio-web -p 8080:8080 team-portfolio:latest
   ```

3. **Access the application:**
   ```
   http://localhost:8080
   ```

### Ansible Deployment (Multiple VMs)

1. **Configure inventory:**
   ```bash
   # Edit inventory.ini with your VM details
   nano inventory.ini
   ```

2. **Test connectivity:**
   ```bash
   ansible all -m ping
   ```

3. **Build Docker image on all VMs:**
   ```bash
   ansible-playbook build-image.yml
   ```

4. **Deploy containers:**
   ```bash
   ansible-playbook run-container.yml
   ```

## 📖 Detailed Setup

### Step 1: Customize Content

Edit `content.json` to add your team members' information:

```json
{
  "members": [
    {
      "id": 1,
      "name": "Your Name",
      "role": "Your Role",
      "email": "your.email@example.com",
      "bio": "Your bio...",
      "prelimHOA": { ... },
      "prelimExam": { ... },
      ...
    }
  ]
}
```

### Step 2: Configure Ansible Inventory

Edit `inventory.ini` with your VM IP addresses and credentials:

```ini
[centos]
centos-vm ansible_host=YOUR_CENTOS_IP ansible_user=YOUR_USER

[ubuntu]
ubuntu-vm1 ansible_host=YOUR_UBUNTU1_IP ansible_user=YOUR_USER
ubuntu-vm2 ansible_host=YOUR_UBUNTU2_IP ansible_user=YOUR_USER
```

### Step 3: Set Up SSH Keys

```bash
# Generate SSH key if you don't have one
ssh-keygen -t rsa -b 4096

# Copy SSH key to each VM
ssh-copy-id user@vm-ip-address
```

### Step 4: Test Ansible Connection

```bash
# Ping all hosts
ansible all -m ping

# Check OS versions
ansible all -m setup -a "filter=ansible_distribution*"
```

## 🚢 Deployment

### Using Ansible (Recommended)

**Build Docker images on all VMs:**
```bash
ansible-playbook build-image.yml
```

This playbook will:
- Install Docker on each VM (CentOS and Ubuntu compatible)
- Copy application files to VMs
- Build Docker image from Dockerfile
- Tag and verify the image

**Deploy and run containers:**
```bash
ansible-playbook run-container.yml
```

This playbook will:
- Verify Docker installation
- Stop and remove any existing containers
- Configure firewall rules
- Run new container with health checks
- Verify container is accessible
- Display access URLs

**Deploy to specific hosts:**
```bash
# Deploy only to CentOS
ansible-playbook build-image.yml -l centos

# Deploy only to Ubuntu VMs
ansible-playbook run-container.yml -l ubuntu
```

**Deploy to a single host:**
```bash
ansible-playbook run-container.yml -l ubuntu-vm1
```

### Manual Docker Deployment

**On each VM:**

1. Install Docker:
   ```bash
   # CentOS
   sudo yum install -y docker
   sudo systemctl start docker
   sudo systemctl enable docker

   # Ubuntu
   sudo apt update
   sudo apt install -y docker.io
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. Copy files to VM:
   ```bash
   scp -r * user@vm-ip:/opt/portfolio/
   ```

3. Build and run:
   ```bash
   cd /opt/portfolio
   sudo docker build -t team-portfolio:latest .
   sudo docker run -d --name portfolio-web -p 8080:8080 team-portfolio:latest
   ```

## 💻 Usage

### Accessing the Portfolio

After deployment, access the portfolio at:
- **CentOS VM**: `http://CENTOS_IP:8080`
- **Ubuntu VM1**: `http://UBUNTU1_IP:8080`
- **Ubuntu VM2**: `http://UBUNTU2_IP:8080`

### Docker Commands

```bash
# View running containers
docker ps

# View container logs
docker logs portfolio-web

# Follow logs in real-time
docker logs -f portfolio-web

# Stop container
docker stop portfolio-web

# Start container
docker start portfolio-web

# Restart container
docker restart portfolio-web

# Remove container
docker rm -f portfolio-web

# View container stats
docker stats portfolio-web

# Execute command in container
docker exec -it portfolio-web sh
```

### Ansible Commands

```bash
# Check all hosts
ansible all -m ping

# Run ad-hoc command on all hosts
ansible all -a "docker ps"

# Check container status
ansible all -a "docker ps -f name=portfolio-web"

# View container logs
ansible all -a "docker logs --tail 20 portfolio-web"

# Restart all containers
ansible all -a "docker restart portfolio-web"
```

## 🔍 Troubleshooting

### Common Issues

**1. Ansible connection failed**
```bash
# Test SSH connection
ssh user@vm-ip

# Check if SSH key is added
ssh-add -l

# Verify inventory
ansible-inventory --list
```

**2. Docker build fails**
```bash
# Check Docker is running
sudo systemctl status docker

# View build logs
docker build -t team-portfolio:latest . --progress=plain

# Check disk space
df -h
```

**3. Container not accessible**
```bash
# Check if container is running
docker ps -a

# Check container logs
docker logs portfolio-web

# Check firewall
sudo firewall-cmd --list-all  # CentOS
sudo ufw status               # Ubuntu

# Test locally first
curl http://localhost:8080
```

**4. Port already in use**
```bash
# Check what's using the port
sudo netstat -tlnp | grep 8080

# Use a different port
docker run -d --name portfolio-web -p 8081:8080 team-portfolio:latest
```

**5. Permission denied errors**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Re-login or run
newgrp docker
```

### Debugging Tips

1. **Enable verbose Ansible output:**
   ```bash
   ansible-playbook build-image.yml -vvv
   ```

2. **Check Ansible logs:**
   ```bash
   tail -f ansible.log
   ```

3. **Test container health:**
   ```bash
   docker inspect --format='{{.State.Health.Status}}' portfolio-web
   ```

4. **Access container shell:**
   ```bash
   docker exec -it portfolio-web sh
   ```

## 👥 Team Members

- **Member 1**: Team Lead / Docker Specialist
- **Member 2**: Frontend Developer
- **Member 3**: DevOps Engineer / Ansible Specialist

## 📝 Documentation

For complete documentation including:
- Development process
- Docker containerization details
- Ansible playbook explanations
- Deployment screenshots
- Individual contributions

Please refer to the project documentation PDF.

## 🎥 Video Demonstration

[Link to video demonstration will be added here]

## 📄 License

This project is created for academic purposes.

## 🙏 Acknowledgments

- Instructor and teaching assistants
- Open source community
- Docker and Ansible documentation

---

**For questions or issues, please contact the team members listed in the portfolio.**
