import { useState, useEffect } from "react";
import { fetchAllBooks } from "../API";
import { useNavigate } from "react-router-dom";

export default function Books({ books, setBooks }) {
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllBooks() {
      const APIResponse = await fetchAllBooks();
      setBooks(APIResponse.books);
    }
    getAllBooks();
  }, []);

  const booksToDisplay = searchParam
    ? books.filter((book) => book.title.toLowerCase().includes(searchParam))
    : books;

  return (
    <>
      <div className="search">
        <label>
          Search by Title:{" "}
          <input
            type="text"
            className="searchInput"
            placeholder="Search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      <div className="allbooks"></div>
      {booksToDisplay.map((book) => {
        return (
          <h3 key={book.id}>
            <img
              src={book.coverimage}
              onClick={() => navigate(`/books/${book.id}/`)}
            />{" "}
            <br />
            {book.title} <br />
          </h3>
        );
      })}
    </>
  );
}
