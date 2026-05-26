FROM nginx:alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy the app
COPY "Personal Finance.html" /usr/share/nginx/html/index.html

# Custom nginx config — serve on port 8743
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8743
