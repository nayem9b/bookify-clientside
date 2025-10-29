# -------- Stage 1: Builder --------
FROM node:18-alpine AS builder
WORKDIR /myapp
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --no-progress --legacy-peer-deps
COPY . .
RUN yarn build


# -------- Stage 2: Runtime --------
FROM node:18-alpine AS runner
WORKDIR /myapp

# Install a simple HTTP server for serving static files
RUN npm install -g serve

COPY --from=builder /myapp/build ./build
COPY --from=builder /myapp/public ./public

EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
