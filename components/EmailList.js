import { useQuery, useMutation, gql } from "@apollo/client"
import axios from "axios"
import Link from "next/link"

const QUERY = gql`
  query MyQuery {
    listPosts {
      items {
        author
        content
        createdAt
        id
        subject
      }
    }
  }
`

const DELETE = gql`
  mutation MyMutation($id: String!) {
    deletePost(input: { id: $id }) {
      id
    }
  }
`

export default function EmailList() {
  const [deleteTodo] = useMutation(DELETE)
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

  const countries = data.listPosts
  console.log(countries)

  return (
    <div id="container">
      <div id="orders">Current Emails:</div>
      <div className="ewrapper2">
        <div className="box2">Author</div>
        <div className="box2">Subject</div>
        <div className="box2">Email</div>
        <div className="box2">Content</div>
        <div className="box2">Actions</div>
      </div>
      {countries.items.map(item => {
        const remove = () => {
          deleteTodo({
            variables: { id: item.id },
          })
        }

        function refreshPage() {
          window.location.reload(false)
        }

        let a = countries.items.indexOf(item)

        const myFunction = () => {
          if (confirm("Delete order?")) {
            deleteItem()
          }
        }

        if (a % 2 === 1) {
          return (
            <div className="ewrapper" key={item.id}>
              <div className="box">
                <Link href="/">
                  <a>{item.id}</a>
                </Link>
              </div>

              <div className="box">{item.subject}</div>
              <div className="box">{item.id}</div>

              <div className="box">{item.content}</div>

              <div className="box">
                <button onClick={remove} id="del">
                  <a>delete</a>
                </button>
              </div>
            </div>
          )
        } else {
          return (
            <div className="ewrapper" key={item.id}>
              <div className="box3">
                <Link href="/">
                  <a>{item.id}</a>
                </Link>
              </div>

              <div className="box3">{item.subject}</div>
              <div className="box3">{item.author}</div>

              <div className="box3">{item.content}</div>

              <div className="box3">
                <button onClick={remove} id="del">
                  <a>delete</a>
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
