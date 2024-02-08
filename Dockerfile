FROM node:20 as builder

COPY . /noa-pei-portfolio-front
WORKDIR /noa-pei-portfolio-front

RUN npm ci
RUN npm run build

# RUN npm install -g serve
# CMD serve -s build

FROM nginx:alpine
COPY --from=builder /noa-pei-portfolio-front/build /usr/share/nginx/html