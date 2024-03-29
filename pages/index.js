import Countries2 from "../components/Countries2"
import ClientOnly from "../components/ClientOnly"
import { withSSRContext } from "aws-amplify"
import CreateProduct from '../components/Product'
import Navv from '../components/Navbar'

export default function Page({ authenticated, username }) {
  if (username) {
    return (
      <>
        <div>
          <main>
            <ClientOnly>
              <Countries2 />
            </ClientOnly>
          </main>
        </div>
      </>
    )
  } else {
    return <div id="logbox"><div id="logged">You are not logged in.</div>     <style jsx>{`
p {
  background-color: red;
}
  `}</style></div>
  }
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context)
  try {
    const user = await Auth.currentAuthenticatedUser()
    console.log("user: ", user)
    return {
      props: {
        authenticated: true,
        username: user.username,
      },
    }
  } catch (err) {
    return {
      props: {
        authenticated: false,
      },
    }
  }
}
