export const URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;
import { useNavigate } from "react-router-dom";

export default function Login({
  setToken,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await fetch(`${URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await result.json();
      setToken(json.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          e-mail:
          <input
            minLength="8"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>{" "}
        <br />
        <label>
          Password:
          <input
            minLength="6"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
      <br />
    </>
  );
}
