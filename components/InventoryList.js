import { useQuery, useMutation, gql } from "@apollo/client"
import axios from "axios"
import Link from "next/link"

const QUERY = gql`
  query MyQuery {
    listProducts {
      items {
        id
        price
        title
        description
      }
    }
  }
`

export default function InventoryList() {
  const { data, loading, error } = useQuery(QUERY, {
    pollInterval: 500,
  })

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    console.error(error)
    return null
  }

  const countries = data.listProducts
  console.log(countries)

  return (
    <div id="container">
      <div id="orders">Current Products:</div>
      <div className="wrapper2">
        <div className="box2">Product</div>

        <div className="box2">Price</div>
        <div className="box2">Description</div>
        <div className="box2">Actions</div>
      </div>
      {countries.items.map(item => {
        function refreshPage() {
          window.location.reload(false)
        }

        let a = countries.items.indexOf(item)
        const deleteItem = async () => {
          try {
            const resp = axios
              .delete(
                `https://dyh4j4u2r5.execute-api.us-east-1.amazonaws.com/latest/products/${item.id}`
              )
              .then(refreshPage)
          } catch (err) {
            // Handle Error Here
            console.error(err)
          }
        }
        const myFunction = () => {
          if (confirm("Delete product?")) {
            deleteItem()
          }
        }

        if (a % 2 === 1) {
          return (
            <div className="wrapper" key={item.id}>
              <div className="box">
                <Link href="/">
                  <a>{item.title}</a>
                </Link>
              </div>

              <div className="box">{item.price}</div>

              <div className="box">{item.description}</div>

              <div className="box">
                <button onClick={myFunction} id="del">
                  delete
                </button>
              </div>
            </div>
          )
        } else {
          return (
            <div className="wrapper" key={item.id}>
              <div className="box3">
                <Link href="/">
                  <a>{item.title}</a>
                </Link>
              </div>

              <div className="box3">{item.price}</div>

              <div className="box3">{item.description}</div>

              <div className="box3">
                <button onClick={myFunction} id="del">
                  delete
                </button>
              </div>
            </div>
          )
        }
      })}
      <style jsx>{`
        .container {
          margin: 50px;
        }
      `}</style>
    </div>
  )
}

