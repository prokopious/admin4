import { useState, useEffect } from "react"
import axios from "axios"
import products from "../../products.json"
import { FiPlusSquare } from "react-icons/fi"
import { FiMinusSquare } from "react-icons/fi"
import Router from "next/router"
import { withSSRContext } from 'aws-amplify'


  function Protected({ authenticated, username, data }) {

    let y = data.orders.amount.cart
    let z = data.orders.id
    console.log(z)
    const defaultCart = y
    const [cart, updateCart] = useState(defaultCart)
    console.log(cart)
    const newItems = Object.keys(cart.products).map(key => {
      const product = products.find(({ id }) => `${id}` === `${key}`)
  
      return {
        ...cart.products[key],
        pricePerUnit: product.price,
      }
    })
    const subtotal = newItems.reduce(
      (accumulator, { pricePerUnit, quantity }) => {
        return accumulator + pricePerUnit * quantity
      },
      0
    )

    const quantity = newItems.reduce((accumulator, { quantity }) => {
      return accumulator + quantity
    }, 0)
  
    const updateItem = async () => {
      const status = { pizza: newItems, other: cart }
  
      try {
        const resp = axios
          .put(
            `https://dyh4j4u2r5.execute-api.us-east-1.amazonaws.com/latest/change/${z}`,
            status
          )
          .then(Router.push("/"))
      } catch (err) {
        // Handle Error Here
        console.error(err)
      }
    }
  
    function addToCart({ id }) {
      updateCart(prev => {
        let cart = { ...prev }
  
        if (cart.products[id]) {
          cart.products[id].quantity = cart.products[id].quantity + 1
        } else {
          cart.products[id] = {
            id,
            quantity: 1,
          }
        }
  
        return cart
      })
    }

    function removeFromCart({ id }) {
      updateCart(prev => {
        let cart = { ...prev }
  
        if (cart.products[id].quantity > 0) {
          cart.products[id].quantity = cart.products[id].quantity - 1
        } else {
          cart.products[id].quantity = cart.products[id].quantity + 0
        }
  
        return cart
      })
    }
  
  
    if (data && authenticated) {
     
      return (
        <div id="boxy">
          <div className="box"></div>
  
          <h3 id="or">
            <div id="nue">New order: </div>
          </h3>
          <div>
            {products.map(product => {
             
              const { id, title, price } = product
              let a = products.indexOf(product)
              console.log(a)
              var find = newItems.find(x => x.id === product.id)

              if (a % 2 === 1) {

              if (find === undefined) {
                return (
                  <div className="chipmunk" key={id}>
                    <div>{title}</div>
                    <div>0</div>
                    <div>
                      <button className="butt" onClick={() => addToCart({ id })}>
                        <FiPlusSquare />
                      </button>
  
                      <button
                        className="butt"
                        onClick={() => removeFromCart({ id })}
                      >
                        <FiMinusSquare />
                      </button>
                    </div>
                  </div>
                )
              } else {
                var found = newItems.find(x => x.id === product.id).quantity
                return (
                  <div className="chipmunk" key={id}>
                    <div>{title}</div>
                    <div>{found}</div>
                    <div>
                      <button className="butt" onClick={() => addToCart({ id })}>
                        <FiPlusSquare />
                      </button>
  
                      <button
                        className="butt"
                        onClick={() => removeFromCart({ id })}
                      >
                        <FiMinusSquare />
                      </button>
                    </div>
                  </div>
                )
              } 
              } else {
                if (find === undefined) {
                  return (
                    <div className="chipmunk2" key={id}>
                      <div>{title}</div>
                      <div>0</div>
                      <div>
                        <button className="butt" onClick={() => addToCart({ id })}>
                          <FiPlusSquare />
                        </button>
    
                        <button
                          className="butt"
                          onClick={() => removeFromCart({ id })}
                        >
                          <FiMinusSquare />
                        </button>
                      </div>
                    </div>
                  )
                } else {
                  var found = newItems.find(x => x.id === product.id).quantity
                  return (
                    <div className="chipmunk2" key={id}>
                      <div>{title}</div>
                      <div>{found}</div>
                      <div>
                        <button className="butt" onClick={() => addToCart({ id })}>
                          <FiPlusSquare />
                        </button>
    
                        <button
                          className="butt"
                          onClick={() => removeFromCart({ id })}
                        >
                          <FiMinusSquare />
                        </button>
                      </div>
                    </div>
                  )
                } 
              }
            })}
          </div>
          <h2>
            <div id="nue">New total: ${subtotal}</div>
          </h2>
          <h2>
            <button onClick={updateItem}>update order</button>
          </h2>
        </div>
      )
    } else {
      return <div>Not logged in.</div>
    }
  }

export const getServerSideProps = async context => {
  try {
  const { id } = context.query
  const { Auth } = withSSRContext(context)



  const fetchData = async () =>
    await axios

      .get(
        `https://dyh4j4u2r5.execute-api.us-east-1.amazonaws.com/latest/orders/${id}`
      )
      .then(res => ({
        error: false,
        orders: res.data,
      }))
      .catch(() => ({
        error: true,
        orders: null,
      }))

  const data = await fetchData()


 

 
    const user = await Auth.currentAuthenticatedUser()
    console.log('user: ', user)
    return {
      props: {
        authenticated: true, username: user.username, data: data
      }
    }
  } catch (err) {
    return {
      props: {
        authenticated: false
      }
    }
  }

}

export default Protected
