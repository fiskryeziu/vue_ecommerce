FROM oven/bun:1 AS base

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "--env-file", ".env", "--watch", "index.ts"]
