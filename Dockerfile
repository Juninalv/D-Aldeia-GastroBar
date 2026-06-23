FROM nginx:alpine
COPY . /usr/share/nginx/html/
EXPOSE 8080
RUN sed -i 's/80;/8080;/' /etc/nginx/conf.d/default.conf
