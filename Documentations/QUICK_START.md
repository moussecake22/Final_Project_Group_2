# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Prerequisites Check
```bash
# Check if you have the required tools
docker --version
ansible --version
python3 --version
```

### Step 1: Update Content (2 minutes)

Edit `content.json` with your team information:
```bash
nano content.json
```

Replace the sample data with your actual:
- Team member names
- Roles
- Contact information
- HOA details
- Exam information
- Reflections

### Step 2: Configure Target VMs (1 minute)

Edit `inventory.ini` with your VM details:
```bash
nano inventory.ini
```

Update:
```ini
[centos]
centos-vm ansible_host=YOUR_CENTOS_IP ansible_user=YOUR_USER

[ubuntu]
ubuntu-vm1 ansible_host=YOUR_UBUNTU1_IP ansible_user=YOUR_USER
ubuntu-vm2 ansible_host=YOUR_UBUNTU2_IP ansible_user=YOUR_USER
```

### Step 3: Test Connectivity (30 seconds)

```bash
ansible all -m ping
```

Expected output:
```
centos-vm | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
ubuntu-vm1 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
ubuntu-vm2 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

### Step 4: Deploy! (1-2 minutes)

```bash
# Option A: Use Makefile (recommended)
make deploy

# Option B: Manual commands
ansible-playbook build-image.yml
ansible-playbook run-container.yml
```

### Step 5: Access Your Portfolio

Your portfolio is now live at:
- CentOS: http://YOUR_CENTOS_IP:8080
- Ubuntu 1: http://YOUR_UBUNTU1_IP:8080
- Ubuntu 2: http://YOUR_UBUNTU2_IP:8080

## 🎯 Common Commands

### Using Makefile (Easiest)
```bash
make deploy          # Full deployment
make deploy-centos   # Deploy only to CentOS
make deploy-ubuntu   # Deploy only to Ubuntu
make check-status    # Check all deployments
make ansible-ping    # Test connectivity
```

### Direct Ansible Commands
```bash
# Build images
ansible-playbook build-image.yml

# Run containers
ansible-playbook run-container.yml

# Deploy to specific host
ansible-playbook run-container.yml -l centos-vm

# Verbose output
ansible-playbook build-image.yml -vvv
```

### Docker Commands (On VMs)
```bash
# Check container status
docker ps

# View logs
docker logs portfolio-web

# Restart container
docker restart portfolio-web

# Stop and remove
docker stop portfolio-web
docker rm portfolio-web
```

## 🐛 Quick Troubleshooting

### Can't connect to VMs?
```bash
# Test SSH manually
ssh user@vm-ip

# Check SSH keys
ssh-add -l

# Copy SSH key if needed
ssh-copy-id user@vm-ip
```

### Ansible playbook fails?
```bash
# Run with verbose output
ansible-playbook build-image.yml -vvv

# Check logs
tail -f ansible.log

# Test individual commands
ansible all -a "docker --version"
```

### Container not accessible?
```bash
# Check if running
ansible all -a "docker ps"

# Check firewall
ansible all -a "firewall-cmd --list-all"  # CentOS
ansible all -a "ufw status"                # Ubuntu

# Check logs
ansible all -a "docker logs portfolio-web"
```

### Port already in use?
```bash
# Find what's using port 8080
ansible all -a "netstat -tlnp | grep 8080"

# Or use different port in playbook
# Edit run-container.yml, change host_port variable
```

## 📊 Verification Checklist

After deployment, verify:

- [ ] All VMs respond to ansible ping
- [ ] Docker images built successfully
- [ ] Containers are running
- [ ] Port 8080 is accessible
- [ ] Website loads in browser
- [ ] All member pages work
- [ ] Navigation functions correctly
- [ ] Responsive on mobile

## 🎬 For Video Recording

1. **Prepare:**
   ```bash
   # Clear any existing deployments
   make stop-all
   make clean
   ```

2. **Record:**
   - Show file structure
   - Open content.json
   - Show Dockerfile
   - Run `make deploy`
   - Show successful deployment
   - Access website in browser
   - Demonstrate features

3. **Commands to show on camera:**
   ```bash
   ls -la
   cat Dockerfile
   cat build-image.yml | head -20
   make ansible-ping
   make deploy
   make check-status
   ```

## 📝 Documentation Tips

When creating your PDF:

1. **Take screenshots throughout:**
   - Every command execution
   - All success messages
   - Each page of the website
   - Container logs
   - Docker images list

2. **Include git logs:**
   ```bash
   git log --oneline --graph > git-log.txt
   git log --author="Your Name" > your-commits.txt
   ```

3. **Save deployment info:**
   ```bash
   ansible all -a "docker ps" > deployment-status.txt
   ansible all -a "docker images" > docker-images.txt
   ```

## 🔄 Reset Everything

If you need to start fresh:

```bash
# Stop all containers
ansible all -a "docker stop portfolio-web"

# Remove containers
ansible all -a "docker rm portfolio-web"

# Remove images
ansible all -a "docker rmi team-portfolio:latest"

# Start over
make deploy
```

## 🆘 Need Help?

1. Check the README.md for detailed documentation
2. Review DOCUMENTATION_OUTLINE.md for PDF structure
3. Check ansible.log for error details
4. Verify your inventory.ini and content.json

## ✅ Final Checklist Before Submission

- [ ] content.json updated with all member info
- [ ] All deployments working
- [ ] Screenshots taken
- [ ] Video recorded
- [ ] Git commits documented
- [ ] Documentation PDF completed
- [ ] Video uploaded (YouTube/Drive)
- [ ] All files included in submission

---

**Good luck with your project! 🚀**
