"use client";

import { ApolloClient, InMemoryCache, ApolloLink, Observable } from "@apollo/client";
import { schema } from "./schema";
import { execute, ExecutionResult, DocumentNode } from "graphql";
import { parse } from "graphql/language/parser";

// Create a custom Apollo Link that executes queries against the local schema
const localLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const { query, variables, operationName } = operation;
    
    (async () => {
      try {
        const document = typeof query === "string" ? parse(query) : (query as DocumentNode);
        const result = await execute({
          schema,
          document,
          variableValues: variables,
          operationName: operationName || undefined,
          contextValue: {}, // Add context if needed for auth, etc.
        });
        
        observer.next(result as ExecutionResult);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    })();
  });
});

export const apolloClient = new ApolloClient({
  link: localLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

