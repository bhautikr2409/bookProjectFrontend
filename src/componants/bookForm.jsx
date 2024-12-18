import axios from "axios";
import React, { useState } from "react";

const BookForm = () => {
    const [formData, setFormData] = useState({
        bookName: "",
        author: "",
        bookImgURL: "",
        bookPrice: "",
        bookDescription: "",
    });

    const [errors, setErrors] = useState({
        bookName: "",
        author: "",
        bookImgURL: "",
        bookPrice: "",
        bookDescription: "",
    });

    const resetForm = () => {
        setFormData({
            bookName: "",
            author: "",
            bookImgURL: "",
            bookPrice: "",
            bookDescription: "",
        });
        setErrors({
            bookName: "",
            author: "",
            bookImgURL: "",
            bookPrice: "",
            bookDescription: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            bookName: "",
            author: "",
            bookImgURL: "",
            bookPrice: "",
            bookDescription: "",
        };

        if (!formData.bookName) {
            valid = false;
            newErrors.bookName = "Product name is required.";
        }
        if (!formData.author) {
            valid = false;
            newErrors.author = "Author name is required.";
        }
        if (!formData.bookImgURL) {
            valid = false;
            newErrors.bookImgURL = "Product image URL is required.";
        }
        if (!formData.bookPrice || isNaN(Number(formData.bookPrice))) {
            valid = false;
            newErrors.bookPrice = "Valid product price is required.";
        }
        if (!formData.bookDescription) {
            valid = false;
            newErrors.bookDescription = "Product description is required.";
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {

            axios.post('http://localhost:3000/app/books', {
                title: formData.bookName,
                author: formData.author,
                price: formData.bookPrice,
                description: formData.bookDescription,
                image: formData.bookImgURL,
            })

            const confirmationModal = document.getElementById("confirmation_modal");
            confirmationModal?.showModal();
            resetForm();
        }
    };

    const handleModalClose = () => {
        resetForm();
        document.getElementById("my_modal_1")?.close();
    };

    const closeConfirmationModal = () => {
        const confirmationModal = document.getElementById("confirmation_modal");
        confirmationModal?.close();
    };

    return (
        <>
            <button
                className="btn  btn-neutral bg-transparent border-none !text-white !font-bold text-base "
                onClick={() => document.getElementById("my_modal_1")?.showModal()}
            >
                Add Products
            </button>
            {/* Add Product Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-gray-800 text-white">
                    <h2 className="text-lg font-bold">Add Product</h2>
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
                                className={`mt-1 block w-full px-3 py-2 border text-black ${errors.bookName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.bookName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.bookName}
                                </p>
                            )}
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
                                className={`mt-1 block w-full px-3 py-2 border text-black ${errors.bookImgURL ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.bookImgURL && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.bookImgURL}
                                </p>
                            )}
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
                                className={`mt-1 block w-full px-3 py-2 border text-black ${errors.author ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.author && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.author}
                                </p>
                            )}
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
                                className={`mt-1 block w-full px-3 py-2 border text-black ${errors.bookPrice ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.bookPrice && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.bookPrice}
                                </p>
                            )}
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
                                className={`mt-1 block w-full px-3 py-2 border text-black ${errors.bookDescription
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                                rows={3}
                            />
                            {errors.bookDescription && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.bookDescription}
                                </p>
                            )}
                        </div>
                        {/* Submit Button */}
                        <div className="modal-action">
                            <button
                                type="submit"
                                className="btn bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Submit
                            </button>
                            <button type="button" className="btn" onClick={handleModalClose}>
                                Close
                            </button>
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
};

export default BookForm;