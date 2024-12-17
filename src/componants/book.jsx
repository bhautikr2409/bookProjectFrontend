import React, { useEffect, useState } from "react";
import { getBooks } from "./bookService";

const Book = () => {
    const [books, setBooks] = useState([]);

    // Fetch books on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);


    return (
        <>
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
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr>
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
                                        onClick={() =>
                                            document.getElementById("my_modal_2").showModal()
                                        }
                                    >
                                        Description
                                    </button>
                                    <dialog id="my_modal_2" className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">{book.title}</h3>
                                            <p className="py-4">{book.description}</p>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </th>
                            </tr>
                        ))}
                        {/* <tr>
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
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Java Script</div>
                                    <div className="text-sm opacity-50">JS</div>
                                </div>
                            </div>
                        </td>
                        <td>2000</td>

                        <th>
                            <button className="btn btn-ghost btn-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Description</button>
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">book title</h3>
                                    <p className="py-4">this is book description</p>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </th>
                    </tr> */}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Book;
