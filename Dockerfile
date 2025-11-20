# Dockerfile (place at web-portfolio/Dockerfile)
# Multi-stage is unnecessary for pure static files; use small nginx base (alpine)
# Build argument 'version' applied for labeling.
ARG VERSION=1.0.0
FROM nginx:stable-alpine AS base

# Metadata
LABEL org.opencontainers.image.title="web-portfolio" \
      org.opencontainers.image.version="${VERSION}" \
      maintainer="Your Team <you@example.com>"

# Remove default server config and use our nginx.conf
# Copy only what's necessary to reduce image size.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static artifacts into the directory nginx serves from
COPY src/ /usr/share/nginx/html/

# Expose port 80 (container)
EXPOSE 80

# A lightweight healthcheck (curl is present in alpine-based image)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -q -O- --timeout=2 http://localhost/ >/dev/null || exit 1

# Note: official nginx image handles non-root worker processes.
# Keep default CMD
CMD ["nginx", "-g", "daemon off;"]
