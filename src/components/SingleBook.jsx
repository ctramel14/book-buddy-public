import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../API";

export default function SingleBook({ token }) {
  const [book, setBook] = useState([]);
  const [success, setSuccess] = useState("");
  let { id } = useParams();

  useEffect(() => {
    async function getBook() {
      try {
        const response = await fetch(`${URL}/books/${id}`);
        const result = await response.json();
        setBook(result.book);
      } catch (error) {
        console.error(error);
      }
    }
    getBook();
  }, []);

  async function checkout() {
    try {
      await fetch(`${URL}/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ available: false }),
      });
      setSuccess(`Checked out ${book.title}!`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="single">
        <div className="bookinfo">
          <h4>{book.title}</h4>
          <h5>by {book.author}</h5>
          <h6>{book.description}</h6>
          <img src={book.coverimage} className="singlebook" /> <br />
        </div>
        {token ? (
          <button className="checkout" onClick={() => checkout(book.id)}>
            Check-out
          </button>
        ) : (
          <h4></h4>
        )}
        {success && <h4>{success}</h4>}
      </div>
      <br />
    </>
  );
}
