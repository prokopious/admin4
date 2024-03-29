import "../styles/globals.css"
import { ApolloProvider } from "@apollo/client"
import client from "../apollo-client"
import Amplify from "aws-amplify"
import config from "../src/aws-exports"
import Link from "next/link"
import Navv from '../components/Navbar'

Amplify.configure({
  ...config,
  ssr: true,
})

function MyApp({ Component, pageProps }) {
  return (

      <ApolloProvider client={client}>
        <Navv />
        <Component {...pageProps} />
      </ApolloProvider>

  )
}

export default MyApp