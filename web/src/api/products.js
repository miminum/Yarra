import api from './init'

export function listProducts() {
  return api.get('/products')
    .then((res) => res.data)
}

export function createProduct({ name, brandName }) {
  return api.post('/products', { name, brandName })
    .then((res) => {
      console.log('created api/product.js', res.data)
      return res.data
    })
}