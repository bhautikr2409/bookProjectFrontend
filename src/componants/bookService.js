import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/app/books";

export const getBooks = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const addBook = async (book) => {
    const response = await axios.post(API_BASE_URL, book);
    return response.data;
};

// export const updateBook = async (id, updatedBook) => {
//     const response = await axios.put(`${API_BASE_URL}/${id}`, updatedBook);
//     return response.data;
// };

// export const deleteBook = async (id) => {
//     const response = await axios.delete(`${API_BASE_URL}/${id}`);
//     return response.data;
// };
