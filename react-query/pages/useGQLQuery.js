import { GraphQLClient } from 'graphql-request';
import { useQuery } from '@tanstack/react-query'

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const endpoint = process.env.NEXT_PUBLIC_API_GQL;

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

export const useGQLQuery = (key, query, variables, config) => {
  
  const fetchData = async () => await graphQLClient.request(query, variables)

  return useQuery(key, fetchData, config)
}