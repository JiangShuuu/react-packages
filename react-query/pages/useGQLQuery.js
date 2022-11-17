import { GraphQLClient } from 'graphql-request';
import { useQuery } from '@tanstack/react-query'
import { hasCookie, setCookie, getCookie } from 'cookies-next'

const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const endpoint = process.env.NEXT_PUBLIC_API_GQL;

let token = null

const getToken = async () => {
  const params = {
    'client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
    'client-secret': process.env.NEXT_PUBLIC_CLIENT_SECRET
  }
  const query = (new URLSearchParams(params)).toString()

  const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/oauth/requestAccessToken?${query}`)

  const data = await response.json()

  token = data.access_token
  console.log(token)
  setCookie('gql-token', token, { path: '/', maxAge: data.expires_in - 86400 })
}

if (hasCookie('gql-token')) {
  token = getCookie('gql-token')
} else {
  getToken()
}

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const useGQLQuery = (key, query, variables, config) => {
  
  const fetchData = async () => await graphQLClient.request(query, variables)

  return useQuery(key, fetchData, config)
}