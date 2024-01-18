#!/bin/bash

# Executa as migrations com o Prisma
npx prisma migrate deploy
npx prisma generate

npm run build
npm run start:prod
