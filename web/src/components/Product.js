import React from 'react'

export function Product ({
  products
}) {
  return (
    <div className="">
      <h3>Products</h3>
        { console.log ('component', products) }
      { products.map((product) => (

          <div>
            <h5>{ product.name }</h5>
            <p>{ product.brandName }</p>
          </div>

      ))}

    </div>
  )
}