FROM node:20-alpine AS base

WORKDIR /app

# Install curl for healthcheck probe
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Create uploads directories
RUN mkdir -p uploads/cvs uploads/blogs uploads/testimonials uploads/demos/.tmp

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

CMD ["npm", "start"]
