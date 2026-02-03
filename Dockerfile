# =============================================================================
# PRODUCTION DOCKERFILE - pokemon-search
# =============================================================================
# Multi-stage build: Build Angular, serve with nginx
# =============================================================================

# Stage 1: Build Angular
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source and build
COPY . ./
RUN npm run build -- --configuration=production

# Stage 2: Production image with nginx
FROM nginx:alpine

# Copy custom nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache static assets \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copy built Angular app
COPY --from=builder /app/dist/pokemon-search/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
