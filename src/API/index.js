export const URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/`;

export async function checkout(bookId) {
  try {
    await fetch(`${URL}/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ available: false }),
    });
    console.log(bookId);
  } catch (error) {
    console.error(error);
  }
}
export async function fetchAllBooks() {
  try {
    const response = await fetch(`${URL}/books`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function newBook(title, author, coverImage) {
  try {
    const result = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, coverImage }),
    });
    const json = await result.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

export async function getAllBooks() {
  const APIResponse = await fetchAllBooks();
  if (APIResponse.success) {
    setPlayers(APIResponse.data.books);
  } else {
    setError(APIResponse.error.message);
  }
}

export async function removeBook(bookId) {
  try {
    const response = await fetch(`${URL}/${bookId}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(`Whoops, trouble removing #${bookId}!`, err);
  }
}

export async function register(username, password) {
  try {
    const result = await fetch(`${URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await result.json();
    console.log(json.token);
  } catch (error) {
    console.error(error);
  }
}
