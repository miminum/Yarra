import React from 'react'

export function CreateProductForm ({
  onCreateProduct
}) {
  return (
    <form
      className = "mb-2"
      onSubmit={ (event) => {
        // stop browser from showing default setting (sending email nad password as params get request)
        event.preventDefault()

        const form = event.target
        const elements = form.elements // Allows looking up fields using their 'name' attributes
        // Get entered values from fileds
        const name = elements.name.value
        const brandName = elements.brandName.value
        
        // Pass this information along to the parent component
        onCreateProduct({ name, brandName })

      } }
    >
      <h1>Create Product</h1>
      <label
        className="mb-2"
      >
        { 'Name: ' }
        <input 
          type='text'
          name='name'
        />
      </label>
      <label
        className="mb-2"
      >
        { 'Brand: ' }
        <input 
          type='text'
          name='brandName'
        />
      </label>
     
      <button>
        Create
      </button>
    </form>
  )
}
