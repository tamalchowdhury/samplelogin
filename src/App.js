import React from 'react'
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAe5hM_oNjeizF2ESBGTtl8bWtzUvCCatE',
  authDomain: 'simple-login-4ebae.firebaseapp.com',
  projectId: 'simple-login-4ebae',
  storageBucket: 'simple-login-4ebae.appspot.com',
  messagingSenderId: '746918235872',
  appId: '1:746918235872:web:24410233850db1aa164a85',
}

function Form({ handleForm, submitText }) {
  function handleFormSubmit(event) {
    event.preventDefault()
    const { email, password } = event.target.elements

    handleForm({
      email: email.value,
      password: password.value,
    })
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input type="email" id="email" placeholder="email" />
        </div>
        <div>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">{submitText}</button>
      </form>
    </div>
  )
}

function App() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const { user } = userCredential
        console.log(user)
      })
      .catch((err) => err.message)
  }

  return (
    <div className="App">
      <h1>Sample Application</h1>
      <p>Hello this is my website, how are you doing?</p>
      <h3>Login</h3>
      <Form handleForm={login} submitText="Login" />

      <h3>Register</h3>
      <Form handleForm={register} submitText="Register" />
    </div>
  )
}

export default App
