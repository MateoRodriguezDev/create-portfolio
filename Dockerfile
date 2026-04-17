FROM node:22.16.0-alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --frozem-lockfile
COPY . .
RUN npm run build

FROM nginx:stable AS runner
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/sakai-ng/browser /usr/share/nginx/html
EXPOSE 80
