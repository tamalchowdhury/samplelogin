import React from 'react'
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

function Form({ formFn, formText }) {
  function handleFormSubmit(event) {
    event.preventDefault()
    const { email, password } = event.target.elements

    const formData = {
      email: email.value,
      password: password.value,
    }

    formFn(formData)
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
        <button type="submit">{formText}</button>
      </form>
    </div>
  )
}

function App() {
  const [user, setUser] = React.useState(null)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const user = auth.currentUser

    if (!user) return

    setUser(user)
    setIsLoggedIn(true)
  }, [user])

  function register(formData) {
    const { email, password } = formData

    createUserWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        const { user } = userData
        setUser(user)
      })
      .catch((err) => {
        setError(err)
        console.log(err.message)
      })
  }

  function login(formData) {
    const { email, password } = formData

    signInWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        const { user } = userData
        setUser(user)
      })
      .catch((err) => {
        setError(err)
        console.log(err.message)
      })
  }

  function logout() {
    signOut(auth).then(() => {
      setUser(null)
      setIsLoggedIn(false)
    })
  }

  function AuthenticatedApp() {
    return (
      <>
        <h3>Hello {user.email}</h3> <button onClick={logout}>Logout</button>
        <p>Hello this is my website, how are you doing?</p>
      </>
    )
  }

  function NotAuthenticatedApp() {
    return (
      <>
        <h3>Login</h3>
        <Form formFn={login} formText="Log in" />
        <h3>Register</h3>
        <Form formFn={register} formText="Sign Up" />
      </>
    )
  }

  return (
    <div className="App">
      <h1>Sample Application</h1>
      {isLoggedIn ? <AuthenticatedApp /> : <NotAuthenticatedApp />}
    </div>
  )
}

export default App
