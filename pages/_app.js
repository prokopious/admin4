import Link from "next/link"
import Amplify from "aws-amplify"
import config from "../src/aws-exports"
Amplify.configure({
  ...config,
  ssr: true,
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="navbar" style={{ display: "flex" }}>
        <Link href="/">Home</Link>
        <Link href="/profile">Login</Link>
      </nav>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
