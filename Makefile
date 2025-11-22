# Default Ansible inventory
INVENTORY=./ansible/inventory.ini

# Ansible playbooks
BUILD_PLAYBOOK=ansible/build_image.yml
RUN_PLAYBOOK=ansible/run_containers.yml
CLEAN_PLAYBOOK=ansible/complete_cleanup.yml

# Docker container name (used for cleanup)
CONTAINER_NAME=portfolio

# -----------------------
# Targets
# -----------------------

# Build Docker images on all hosts
build:
	ansible-playbook -i $(INVENTORY) $(BUILD_PLAYBOOK) -K

# Run containers
run:
	ansible-playbook -i $(INVENTORY) $(RUN_PLAYBOOK) -K


# Cleanup dangling images on all hosts
cleanup:
	ansible-playbook -i $(INVENTORY) $(CLEAN_PLAYBOOK) -K

# Deploy: build + run
deploy: build run
	@echo "✅ Deployment complete. Open http://<host>:8080/members.html"

# Shortcut: rebuild with cleanup first
rebuild: stop cleanup deploy


# Makefile snippet - append to your existing Makefile

INVENTORY ?= ansible/inventory.ini
ANSIBLE_PLAYBOOK ?= ansible-playbook

.PHONY: stop teardown

# stop: attempt to cleanup resources created by build_image & run_containers
stop:
	@echo "Running teardown across all web hosts..."
	$(ANSIBLE_PLAYBOOK) -i $(INVENTORY) ansible/teardown.yml -K

# alias for stop
teardown: stop

