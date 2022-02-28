import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin({ setAuthUser }) {
  const navigate = useNavigate();

  const [userToLog, setUserToLog] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLog),
    };

    fetch(`http://localhost:3030/signin`, fetchOptions)
      .then((res) => res.json())
      .catch((error) => console.log({ error }))
      .then((data) => {
        // const user = data.user
        const token = data.token;
        // console.log("user", user)
        console.log("fetch token: ", data.token);

        if (token) {
          // setAuthUser(user)
          setAuthUser(token);
          navigate("/secure");
        }

        // localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem("token", token);
      });
  };

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log({ name, value });

    setUserToLog({
      ...userToLog,
      [name]: value,
    });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label htmlFor="email">
        <input
          placeholder="email.."
          onChange={handleInput}
          name="email"
          type="email"
          required
        />
      </label>
      <label htmlFor="password">
        <input
          placeholder="password.."
          onChange={handleInput}
          name="password"
          type="password"
          required
        />
      </label>
      <button type="submit">Sign me in</button>
    </form>
  );
}
