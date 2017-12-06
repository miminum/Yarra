const Product = require('./Product')

Product.create([
  {
    name: 'Flagship Snowboard',
    brandName: 'Jones'
  },
  {
    name: 'Indoor Survival Snowboard',
    brandName: 'Capita'
  },
  {
    name: 'APX Goggles',
    brandName: 'Dragon'
  }
])
  .then((products) => {
    console.log('Created products', products)
  })
  .catch((error) => {
    console.error(error)
  })
