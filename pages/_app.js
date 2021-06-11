
import Amplify from "aws-amplify"
import config from "../src/aws-exports"
import Link from "next/link"

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