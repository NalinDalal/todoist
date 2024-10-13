make main directory - `todoist`

now initialise 2 folders, backend and frontend
initialise backend with node.js and typescript, prisma

```bash
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
npx tsc --init
npx prisma init
```

now get started with express, and psql
firstly write the schema and put the db url into .env file, migrate the db & generate the client
```bash
npx prisma migrate dev
npx prisma generate
```

install the prisma client-> 
```bash
npm install @prisma/client
```

write the routes now into the backend code, install dependencies->
```bash
npm install express @types/express bcryptjs @types/bcryptjs jsonwebtoken @types/jsonwebtoken prisma @prisma/client
npm install --save-dev typescript ts-node nodemon
```

now go to index.ts file-> write the routes for auth and task 
now add jwt secret into .env file

add the interface in `types/express/index.d.ts` to remove not recognised issue

add the routes, logic


In your index.ts file (or equivalent), add proper cleanup logic to ensure Prisma shuts down cleanly when the server is stopped



----------------------------------------------------
Frontend->
```bash
npm create vite@latest
frontend

cd frontend
npm install
npm install axios react-router-dom


```
