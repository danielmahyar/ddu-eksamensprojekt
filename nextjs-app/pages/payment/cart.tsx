import Image from 'next/image'
import React from 'react'
import { useCartItems } from '../../lib/hooks/useCartItems'

const Cart = () => {
  const { cartItems, addCartItem } = useCartItems()

  return (
    <>
      {cartItems.map(item => (
        <>
          <h1>{item.name}</h1>
          <p>{item.price}</p>
          <Image width={100} height={100} src={item.imageUrl} alt="Image of product"/>
        </>
      ))}
      <button onClick={() => addCartItem({ id: "teswdaddwawa", name: "Test", description: "test", price: 200, imageUrl: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"})}>Add random item</button>
    </>
  )
}

export default Cart