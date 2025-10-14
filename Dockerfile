# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder

WORKDIR /myapp

# Copy dependency manifests
COPY package.json yarn.lock ./

# Install dependencies (with legacy peer deps for compatibility)
RUN yarn install --frozen-lockfile --non-interactive --no-progress --legacy-peer-deps

# Copy source code
COPY . .

# Build the React app (creates /myapp/build)
RUN yarn build


# -------- Stage 2: Runtime --------
FROM node:18-alpine AS runner

# Use lightweight static file server
RUN yarn global add serve --non-interactive --no-progress

WORKDIR /myapp

# Copy build artifacts from builder
COPY --from=builder /myapp/build ./build

# Create non-root user for security
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

EXPOSE 5000

# Serve static React build
CMD ["yarn", "start"]
