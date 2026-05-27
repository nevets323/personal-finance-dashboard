FROM node:20-alpine

WORKDIR /app

# Install dependencies first (cached layer)
COPY package.json .
RUN npm install --omit=dev

# Copy server and app
COPY server.js .
COPY ["Personal Finance.html", "public/index.html"]

# Data directory (overridden by volume at runtime)
RUN mkdir -p /data

EXPOSE 8743

CMD ["node", "server.js"]
