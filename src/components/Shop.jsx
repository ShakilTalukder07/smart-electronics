import React, { useContext, useState } from 'react'
import { ProductContext } from './Root'
import Product from '../components/Product'
import { addToDb } from '../utils/fakeDB'
import { toast } from 'react-toastify'

const Shop = () => {

  const allProducts = useContext(ProductContext)
  const products = allProducts[0];

  const [cart, setCart] = useState([]);
  console.log(cart);

  const handleAddToCart = (product) => {

    let newCart = [];
    const exists = cart.find(existingProduct => existingProduct.id === product)
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product]
    }
    else {
      const rest = cart.filter(existingProduct => existingProduct.id !== product)
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart)
    addToDb(product.id)

    toast.success('product is added!', { autoClose: 500 })

  }

  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <div className='grid gap-8 row-gap-5 mb-8 lg:grid-cols-3 lg:row-gap-8'>

        {
          products.map(product => <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>)
        }

      </div>
    </div>
  )
}

export default Shop
