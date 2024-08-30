import { useState } from "react";
import bookLogo from "./assets/books.png";
import { Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import Register from "./components/Register";
import Account from "./components/Account";
import Navigations from "./components/Navigations";

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [books, setBooks] = useState([]);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <Navigations token={token} />
      <Routes>
        <Route
          path="/"
          element={
            <Books
              books={books}
              setBooks={setBooks}
            />
          }
        />
        <Route
          path="/books/:id"
          element={<SingleBook token={token} />}
        />
        <Route
          path="/users/login"
          element={
            <Login
              setToken={setToken}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/users/register"
          element={
            <Register
              setToken={setToken}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              firstname={firstname}
              setFirstName={setFirstName}
              lastname={lastname}
              setLastName={setLastName}
            />
          }
        />
        <Route
          path="/account"
          element={
            <Account
              token={token}
              email={email}
              firstname={firstname}
              lastname={lastname}
            />
          }
        />
      </Routes>
      {token ? (
        <LogOut setToken={setToken} />
      ) : (
        <h4>Register or Log-in for full functionality!</h4>
      )}
    </>
  );
}

export default App;
