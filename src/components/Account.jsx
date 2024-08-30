import { useState, useEffect } from "react";
export const URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

export default function Account({ token, email, firstname, lastname }) {
  const [reserved, setReserved] = useState([]);
  const message = `Please register to check out books`;
  const noBook = `Check out some books yo`;

  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch(`${URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    getToken();

    async function reservedBooks() {
      try {
        const response = await fetch(`${URL}/reservations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.reservation != 0) {
          setReserved(result.reservation);
        } else {
          setReserved(!reserved);
        }
      } catch (error) {
        console.error(error);
      }
    }
    reservedBooks();
  }, []);

  async function checkin(id) {
    try {
      const response = await fetch(`${URL}/reservations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  async function checkinBook(id) {
    await checkin(id);
    const response = await fetch(`${URL}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (result.reservation != 0) {
      setReserved(result.reservation);
    } else {
      setReserved(!reserved);
    }
  }

  return (
    <>
      {!token ? (
        <h3>{message}</h3>
      ) : (
        <div>
          <h2>
            Welcome {firstname} {lastname}!
          </h2>
          <h3>{email}</h3>
          {!reserved ? (
            <h4>{noBook}</h4>
          ) : (
            <div>
              {reserved.map((book) => {
                return (
                  <h3 key={book.id}>
                    <img src={book.coverimage} /> <br />
                    {book.title} <br />
                    <button
                      className="checkin"
                      onClick={() => checkinBook(book.id)}
                    >
                      Check-in
                    </button>
                  </h3>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
