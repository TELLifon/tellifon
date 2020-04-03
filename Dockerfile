FROM amazeeio/node:12-builder as builder

COPY package.json package-lock.json /app/
RUN npm install

COPY public /app/public
COPY src /app/src

RUN npm run build

FROM amazeeio/nginx

COPY --from=builder /app/build/ /app/

RUN ls