import Image from 'next/image'
import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { CartContext } from '../../lib/context/cart-context';

const Cart = () => {
  const { cartItems, addCartItem, deleteCartItem } = useContext(CartContext)
  return (
    <main className="min-h-screen h-auto">
      {cartItems.map(item => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.price}</p>
          <Image width={100} height={100} src={item.imageUrl} alt="Image of product"/>
          <button onClick={() => deleteCartItem(item)}>X</button>
        </div>
      ))}
      <button onClick={() => addCartItem({ id: uuidv4(), name: "Test", description: "test", price: 200, imageUrl: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"})}>Add random item</button>
    </main>
  )
}

export default Cart