import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import UpdateBook from "./updateBook";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const updateBookRef = useRef(null);

  const apiCall = () => {
    axios
      .get("http://localhost:3000/app/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const notify = (message) => toast.success(message);

  const handleDeleteBook = (bookId) => {
    axios
      .delete(`http://localhost:3000/app/books/${bookId}`)
      .then((response) => {
        notify("Book deleted successfully!");
        apiCall();
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        toast.error("Failed to delete the book.");
      });
  };

  const handleUpdateBook = (updatedBook) => {
    axios
      .put(`http://localhost:3000/app/books/${updatedBook._id}`, updatedBook)
      .then(() => {
        notify("Book updated successfully!");
        apiCall();
        setEditingBook(null); // Reset editing state
        updateBookRef.current?.closeModal(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        toast.error("Failed to update the book.");
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    if (editingBook) {
      updateBookRef.current.openModal();
    }
  }, [editingBook]);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Book title</th>
              <th>Price</th>
              <th>Full Description</th>
              <th className="text-center">Delete & Update</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={book.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book.title}</div>
                      <div className="text-sm opacity-50">{book.author}</div>
                    </div>
                  </div>
                </td>
                <td>{book.price}</td>

                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      document
                        .getElementById(`${index}-my_modal_2`)
                        .showModal();
                    }}
                  >
                    Description
                  </button>
                  <dialog id={`${index}-my_modal_2`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">{book.title}</h3>
                      <p className="py-4">{book.description}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </th>

                <td className="flex justify-center gap-4">
                  <button
                    className="btn btn-error"
                    onClick={() =>
                      document.getElementById(`${index}-my_modal_3`).showModal()
                    }
                  >
                    Delete
                  </button>
                  <dialog id={`${index}-my_modal_3`} className="modal">
                    <div className="modal-box">
                      <div className="card bg-base-100 image-full w-96 shadow-xl">
                        <figure>
                          <img src={book.image} alt="Book" />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">{book.title}</h2>
                          <p>{book.author}</p>
                          <div className="card-actions justify-end">
                            <div className="modal-action">
                              <button
                                className="btn btn-error"
                                onClick={() => handleDeleteBook(book._id)}
                              >
                                Confirm Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                  <button className="btn btn-primary" onClick={() => setEditingBook(book)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingBook && (
        <UpdateBook
          ref={updateBookRef}
          book={editingBook}
          onSubmit={handleUpdateBook}
          onCancel={() => setEditingBook(null)}
        />
      )}
    </>
  );
};

export default Book;