import { useState } from "react";
import { register } from "../../services/api-service";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  firstName: "",
  email: "",
  password: "",
};

function RegisterForm() {
  // STATES:
  const [state, setState] = useState(initialState);

  // FUNCTIONS:
  function handleChange(e) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleError = (err) => toast.error(err, { position: "top-right" });

  const handleSuccess = (msg) => toast.success(msg, { position: "top-right" });

  async function handleSubmit(e) {
    e.preventDefault();

    const { firstName, email, password } = state;
    const user = { firstName, email, password };
    const res = await register(user);
    const { success, message } = res;

    if (success) {
      handleSuccess("Welcome chef! Please log in.");
      setState({
        firstName: "",
        email: "",
        password: "",
      });
    } else {
      handleError(message);
    }
  }

  // RENDER:
  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={state.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="on"
          value={state.password}
          onChange={handleChange}
          required
        />
        <button>Sign Up</button>
      </form>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={true}
      />
    </>
  );
}

export default RegisterForm;