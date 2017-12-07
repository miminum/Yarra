import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { listProducts } from './api/products'
import { setToken } from './api/init'

class App extends Component {
  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then((data) => {
        console.log('signed in', data)
        const token = data.token
        // Set the Authorization header in axios
        setToken(token)
        listProducts()
        .then((products) => {
          console.log(products)
        })
        .catch((error) => {
          console.log('error loading products', error)
        })
      })
  }
  
  
  render() {
    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className="mb-3">Now Deliverying: Shipping trillions of new products</h2>
        <SignInForm 
          onSignIn={ this.onSignIn}
        />
      </div>
    );
  }

  // When this APp first appears on screen
  componentDidMount() {
    listProducts()
      .then((products) => {
        console.log(products)
      })
      .catch((error) => {
        console.log('error loading products', error)
      })
  }
}

export default App;
