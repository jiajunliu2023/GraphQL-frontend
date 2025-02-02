// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from "@apollo/client";

// npm install @apollo/client graphql is used to communicate between react and graphql

const client = new ApolloClient({
  uri:'http://localhost:4000',
  cache: new InMemoryCache(),
})

const query = gql`
    query {
      allAuthors {
        name,
        born, 
        bookCount,
        id
      }
    }
`
client.query({ query })
  .then((response) => {
    console.log(response.data)
  })
  // new client object, which is then used to send a query to the server:

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
