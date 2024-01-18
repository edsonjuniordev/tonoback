#!/bin/bash

# Executa as migrations com o Prisma
npx prisma migrate deploy

npm run build
npm run start:prod
