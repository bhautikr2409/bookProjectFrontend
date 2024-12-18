import React from 'react'
import BookForm from './bookForm'

const BookHeader = () => {
    return (
        <>
            <header class="pb-6  lg:pb-0 bg-[#1D232A] border-b border-b-black">
                <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <nav class="flex items-center justify-between h-16 lg:h-20">
                        <div class="flex-shrink-0">
                            <a href="#" title="" class="flex text-[30px] font-bold text-black ">Books</a>
                        </div>                    

                        <BookForm/>
                    </nav>

                </div>
            </header>

        </>
    )
}

export default BookHeader
