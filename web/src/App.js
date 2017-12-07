import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import { Product } from './components/Product' 
import { signIn, signOutNow, signUp } from './api/auth'
import { listProducts } from './api/products'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    signUpToken: null,
    displaySignUpForm: false,
    products: []
  }
  
  // When this APp first appears on screen
  componentDidMount() {
    listProducts()
      .then((products) => {
        this.setState({ products: products })
        console.log(this.state.products)
      })
      .catch((error) => {
        console.log('error loading products', error)
      })
  }

  onSignIn = ({ email, password, products }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then((decodedToken) => {
        console.log('signed in', decodedToken)
        this.setState({ 
          decodedToken, 
          displaySignUpForm: false
        })
      })
      .catch((error) => {
        console.log('error loading products', error)
      })
    this.setState({signUpToken: null})
 }

  onSignUp = ({ email, firstName, lastName, password }) => {
    signUp({ email, firstName, lastName, password })
      .then((signUpToken) => {
        console.log('signed up succesfully', signUpToken)
        this.setState({ 
          signUpToken,
          displaySignUpForm: false 
        })
      })
      .catch((error) => {
        console.log('error signing up', error)
      })
  }
  
  onSignOut = () => {
    signOutNow()
    this.setState({ 
      decodedToken: null, 
      displaySignUpForm: false
    })
  }

  toggleSignUpForm = () => {
    const currentSignUpForm = this.state.displaySignUpForm
    this.setState({ displaySignUpForm: !currentSignUpForm })
  }
  
  render() {
    const { decodedToken, signUpToken, displaySignUpForm, products } = this.state
    const signedIn = !!decodedToken

    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className="mb-3">Now Deliverying: Shipping trillions of new products</h2>
        { !!signUpToken ? (
          <h2>You have succesfully signed up</h2>
        ): ( null) }
        {
          signedIn ? (
            <div>
              <p>Email: {decodedToken.email}</p>
              <p>Signed in at: { new Date(decodedToken.iat * 1000).toISOString() }</p>
              <p>Expires at: { new Date(decodedToken.exp * 1000).toISOString() }</p>
              <Product
                products= { products }
              />
              <button
                onClick = { this.onSignOut }
              >
                Sign out
              </button>
            </div>
            
          ) : (
            <div>
              <SignInForm 
                onSignIn={ this.onSignIn }
              />
              <button
                onClick={this.toggleSignUpForm}
              >
                Sign Up
              </button>
            </div>
          )
        }
      { displaySignUpForm ? ( 
        <SignUpForm 
          onSignUp = { 
            this.onSignUp
         }
        />
        ) : ( null )
      }
      </div>
    );
  }

  
}

export default App;
