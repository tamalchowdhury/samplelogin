import logo from "./logo.svg"
import "./App.css"

function Form({ handleForm, submitText }) {
  function handleFormSubmit(event) {
    event.preventDefault()
    const { username, password } = event.target.elements

    handleForm({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input type="text" id="username" placeholder="username" />
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
  function login(formData) {
    console.log("login", formData)
  }

  function register(formData) {
    console.log("register", formData)
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
