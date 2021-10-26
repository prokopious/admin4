import Countries2 from "../components/Countries2"
import ClientOnly from "../components/ClientOnly"
import { withSSRContext } from "aws-amplify"
import CreateProduct from "../components/Product"
import InvNavv from "../components/InvNav"
import EmailList from "../components/EmailList"

export default function Inventory({ username }) {
  if (username) {
    return (
      <>
        <div>
          <main>
            <ClientOnly>
              <EmailList />
            </ClientOnly>
          </main>
        </div>
      </>
    )
  } else {
    return (
      <div id="logbox">
        <div id="logged">You are not logged in.</div>
      </div>
    )
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
