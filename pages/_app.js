import "../styles/globals.css"
import { ApolloProvider } from "@apollo/client"
import client from "../apollo-client"
import Amplify from "aws-amplify"
import config from "../src/aws-exports"
import Link from "next/link"

Amplify.configure({
  ...config,
  ssr: true,
})

function MyApp({ Component, pageProps }) {
  return (

      <ApolloProvider client={client}>
        <nav className="navbar" style={{ display: "flex" }}>
          <Link href="/">Home</Link>
          <Link href="/profile">Login</Link>
        </nav>
        <Component {...pageProps} />
      </ApolloProvider>

  )
}

export default MyApp