# ---------- build stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# viteはbuild時に必要
ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

ENV VITE_API_URL=$API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# 依存関係
COPY package*.json ./
RUN npm install

# ソース
COPY . .

# vite build
RUN npm run build


# ---------- production stage ----------
FROM nginx:alpine

# buildされたファイルを配置
COPY --from=build /app/dist /usr/share/nginx/html

# nginx設定を上書き
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]