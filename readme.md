npm init -y
tsc -init
npm install nodemon concurrently
npm install express
npm i @types/express jest @types/jest ts-jest faker @types/faker

package.json "scripts": { "start:build": "tsc -w", "start:run": "nodemon build/index.js", "start":"concurrently npm:start:\*" },

npm i graphql graphql-tools graphql-middleware apollo-server-express uuid

npm i @types/uuid



git init
git remote add origin https://github.com/Shelvadim/node_gql_server.git
git add -A
git commit -m "1st commit"
git push origin master


query{
  getTodos{
    title
  }
}

subscription{
  newTodo{
    title
  }
}

mutation{
  addTodo(title:"New todo2", description:"asas"){
    id
    title
  }
}