import React, { useState } from "react"
import { useMutation, gql } from "@apollo/client"

const PRODUCT = gql`
  mutation MyMutation(
    $title: String!
    $price: Int!
    $image: String!
    $description: String!
    $id: String!
  ) {
    createProduct(
      input: {
        title: $title
        price: $price
        description: $description
        image: $image
        id: $id
      }
    ) {
      id
    }
  }
`

const CreateProduct = () => {
  const [formState, setFormState] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    image: "",
  })
  const [createProduct] = useMutation(PRODUCT, {
    variables: {
      id: formState.title,
      description: formState.description,
      price: formState.price,
      image: formState.image,
      title: formState.title,
    },
  })

  return (
    <div className="color">
      <form
        onSubmit={e => {
          e.preventDefault()
          createProduct()
        }}
      >
        <div className="inventory">
          <div>Create new product</div>
          <div>
            {" "}
            <input
              className="in"
              value={formState.image}
              onChange={e =>
                setFormState({
                  ...formState,
                  image: e.target.value,
                })
              }
              type="text"
              placeholder="image"
            />
          </div>
      
          <div>
            {" "}
            <input
              className="in"
              value={formState.price}
              onChange={e =>
                setFormState({
                  ...formState,
                  price: e.target.value,
                })
              }
              type="text"
              placeholder="price"
            />
          </div>
          <div>
            {" "}
            <input
              className="in"
              value={formState.title}
              onChange={e =>
                setFormState({
                  ...formState,
                  title: e.target.value,
                })
              }
              type="text"
              placeholder="title"
            />
          </div>
          <div>
            {" "}
            <textarea
              className="sc"
              value={formState.description}
              onChange={e =>
                setFormState({
                  ...formState,
                  description: e.target.value,
                })
              }
              type="textarea"
              placeholder="description"
            />
          </div>
          <div className="bu">
            {" "}
            <button className="i" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <style jsx>{`
        .color {
          height: 100vw;
        }
      `}</style>
    </div>
  )
}

export default CreateProduct
