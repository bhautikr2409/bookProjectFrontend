import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Book = () => {
    const [books, setBooks] = useState([]);

    const apiCall = () => {
        axios
            .get('http://localhost:3000/app/books')
            .then((response) => {
                console.log("response.data:", response.data);
                setBooks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    };

    const notify = (message) => toast.success(message);
    const handleDeleteBook = (book) => {
        axios
            .delete(`http://localhost:3000/app/books/${book}`)
            .then((response) => {
                console.log("response", response)
                notify('Book deleted successfully!');
                apiCall()
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                toast.error('Failed to delete the book.');
            });


    }

    useEffect(() => {
        apiCall();
    }, []);

    return (
        <>
            <Toaster position="bottom-right" reverseOrder={true}/>
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
                            <th>Delete</th>
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
                                    <button className="btn btn-ghost btn-xs" onClick={() => {
                                        console.log(index, book.description)
                                        document.getElementById(`${index}-my_modal_2`).showModal()
                                    }}>Description</button>

                                    <dialog id={`${index}-my_modal_2`} className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">{book.title}</h3>
                                            <p className="py-4">{book.description}</p>
                                            {console.log("book.description", book.description)}
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </th>

                                <td>
                                    <button className="btn btn-error" onClick={() => document.getElementById(`${index}-my_modal_3`).showModal()}>Delete</button>

                                    <dialog id={`${index}-my_modal_3`} className="modal">
                                        <div className="modal-box">
                                            <div className="card bg-base-100 image-full w-96 shadow-xl">
                                                <figure>
                                                    <img
                                                        src={book.image}
                                                        alt="Shoes" />
                                                </figure>
                                                <div className="card-body">
                                                    <h2 className="card-title">{book.title}</h2>
                                                    <p>{book.author}</p>
                                                    <div className="card-actions justify-end">
                                                        <div className="modal-action">
                                                            <button className="btn btn-error" onClick={() => handleDeleteBook(book._id)}>Conform Delete</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Book;

