import { URL } from "../API";

export default function Register({
  setToken,
  email,
  setEmail,
  password,
  setPassword,
  firstname,
  setFirstName,
  lastname,
  setLastName,
}) {

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await fetch(`${URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstname, lastname }),
      });
      const json = await result.json();
      setToken(json.token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input
            minLength="2"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>{" "}
        <br />
        <label>
          Last name:
          <input
            minLength="2"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>{" "}
        <br />
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
    </>
  );
}
