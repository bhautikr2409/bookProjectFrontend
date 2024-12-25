import React from 'react';
import BookForm from './bookForm';

const BookHeader = () => {
    return (
        <>
            <header className="pb-6 lg:pb-0 bg-[#1D232A] border-b border-b-black">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-shrink-0">
                            <a href="#" title="" className="flex text-[30px] font-bold text-white">Books</a>
                        </div>                    

                        <BookForm />
                    </nav>
                </div>
            </header>
        </>
    );
};

export default BookHeader;
