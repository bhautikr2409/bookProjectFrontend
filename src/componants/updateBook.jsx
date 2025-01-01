import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

const UpdateBook = forwardRef(({ book, onSubmit, onCancel }, ref) => {
    const [formData, setFormData] = useState({
        bookName: "",
        author: "",
        bookImgURL: "",
        bookPrice: "",
        bookDescription: "",
    });

    const modalRef = useRef(null);

    useEffect(() => {
        if (book) {
            setFormData({
                bookName: book.title || "",
                author: book.author || "",
                bookImgURL: book.image || "",
                bookPrice: book.price || "",
                bookDescription: book.description || "",
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBook = {
            _id: book._id,
            title: formData.bookName,
            author: formData.author,
            price: formData.bookPrice,
            description: formData.bookDescription,
            image: formData.bookImgURL,
        };

        onSubmit(updatedBook); // Pass the updated book to the parent
        modalRef.current?.close(); 
    };

    const closeConfirmationModal = () => {
        const confirmationModal = document.getElementById("confirmation_modal");
        confirmationModal?.close();
    };

    useImperativeHandle(ref, () => ({
        openModal: () => {
            modalRef.current?.showModal();
        },
        closeModal: () => {
            modalRef.current?.close();
        }
    }));

    return (
        <>
            <dialog ref={modalRef} id="my_modal_2" className="modal">
                <div className="modal-box bg-gray-800 text-white">
                    <h2 className="text-lg font-bold">Update Product</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Product Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="bookName"
                                value={formData.bookName}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border  text-white  rounded-md `}
                            />
                        </div>

                        {/* Product Image URL */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">
                                Product Image URL
                            </label>
                            <input
                                type="text"
                                name="bookImgURL"
                                value={formData.bookImgURL}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border text-white  rounded-md `}
                            />
                        </div>

                        {/* book Author */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">
                                Book Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border text-white  rounded-md `}
                            />
                        </div>

                        {/* Product Price */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">
                                Product Price
                            </label>
                            <input
                                type="text"
                                name="bookPrice"
                                value={formData.bookPrice}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border text-white  rounded-md `}
                            />
                        </div>
                        {/* Product Description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-white">
                                Product Description
                            </label>
                            <textarea
                                name="bookDescription"
                                value={formData.bookDescription}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border text-white  rounded-md scrollbar-hide scrollbar-hide::-webkit-scrollbar resize-none`}
                                rows={5}
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Update Product</button>
                            <button type="button" className="btn" onClick={onCancel}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Confirmation Modal */}
            <dialog id="confirmation_modal" className="modal">
                <div className="modal-box">
                    <h2 className="text-lg font-bold">Success</h2>
                    <p className="my-4 text-black">
                        Your product has been added successfully!
                    </p>
                    <div className="modal-action">
                        <button 
                            className="btn bg-blue-500 text-white hover:bg-blue-600"
                            onClick={closeConfirmationModal}
                        >Okay
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
});

export default UpdateBook;

