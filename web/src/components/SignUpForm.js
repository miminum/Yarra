import React from 'react'

function SignUpForm ({
  onSignUp
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
        const email = elements.email.value
        const firstName = elements.firstName.value
        const lastName = elements.lastName.value
        const password = elements.password.value
        
        // Pass this information along to the parent component
        onSignUp({ email, firstName, lastName, password })

      } }
    >
      <h1>Sign Up Now</h1>
      <label
        className="mb-2"
      >
        { 'Email: ' }
        <input 
          type='email'
          name='email'
        />
      </label>
      <label
        className="mb-2"
      >
        { 'First Name: ' }
        <input 
          type='text'
          name='firstName'
        />
      </label>
      <label
        className="mb-2"
      >
        { 'Last Name: ' }
        <input 
          type='text'
          name='lastName'
        />
      </label>
      <label
        className="mb-2"
      >
        { 'Password: ' }
        <input 
          type='password'
          name='password'
        />
      </label>

      <button>
        Sign up now
      </button>
    </form>
  )
}

export default SignUpForm