import React, { useEffect, useState } from "react";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { Link } from "react-router-dom";

import axios from "axios";
import Loading from "./Loading";

// const booksData = [
//   {
//     id: 1,
//     img: Book1,
//     title: "The Power of Now",
//     Price: "$15",
//     author: "Eckhart Tolle",
//     tag: "Non-fiction",
//   },
//   {
//     id: 2,
//     img: Book2,
//     title: "Atomic Habits",
//     Price: "$20",
//     author: "James Clear",
//     tag: "Self-help",
//   },
//   {
//     id: 3,
//     img: Book3,
//     title: "The Alchemist",
//     Price: "$25",
//     author: "Paulo Coelho",
//     tag: "Fiction",
//   },
//   {
//     id: 4,
//     img: Book2,
//     title: "Think and Grow",
//     Price: "$25",
//     author: "Napoleon Hill",
//     tag: "Non-fiction",
//   },
//   {
//     id: 5,
//     img: Book1,
//     title: "You Are a Badass",
//     Price: "$10",
//     author: "Jen Sincero",
//     tag: "Self-help",
//   },
//   {
//     id: 6,
//     img: Book1,
//     title: "Deep Work",
//     Price: "$12",
//     author: "Cal Newport",
//     tag: "Non-fiction",
//   },
//   {
//     id: 7,
//     img: Book2,
//     title: "Ikigai",
//     Price: "$27",
//     author: "Carol S. Dweck",
//     tag: "Non-fiction",
//   },
//   {
//     id: 8,
//     img: Book3,
//     title: "Daring Greatly",
//     Price: "$5",
//     author: "Brené Brown",
//     tag: "Self-help",
//   },
//   {
//     id: 9,
//     img: Book2,
//     title: "Eat Pray Love",
//     Price: "$10",
//     author: "Elizabeth Gilbert",
//     tag: "Non-fiction",
//   },
//   {
//     id: 10,
//     img: Book1,
//     title: "The Four Agreements",
//     Price: "$25",
//     author: "Don Miguel Ruiz",
//     tag: "Self-help",
//   },
// ];

const Books = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const baseUrl = "http://localhost:5000/book";
  const [page , setPage ] = useState(1);

 
  const [booksData, setBooksData] = useState([]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  // Fetching Part
  useEffect(() => {
    setTimeout(async () => {
      const response = await axios.get(`http://localhost:5000/book?page=${page}&pageSize=10`);
  
      setBooksData((prev) => [...prev, ...response.data.data]);
      setInitialLoadComplete(true);
      setLoading(false);
    }, 1500);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  // Creating an order using post method
  const handleOrder = async (bookId) => {
    try {
      const response = await axios.post("api/orders/create", { bookId });
      // Handle successful response if needed
      console.log(response.data);
    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
  };

  const handleCardClick = (id) => {
    setSelectedCardId(id);
    console.log(selectedCardId);
  };

  return (
    <>
      <div className="mt-14 mb-12">
        <div className="container">
          {/* header */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 className="text-3xl font-bold"> Look At Our Books Below </h1>
          </div>

          {/* Body section */}
          <div>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter your search term"
              className="border border-black mb-10"
            />

{initialLoadComplete && (  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
              {/* Card */}
              {booksData
                // .filter((item) => {
                //   const searchTerm = search.toLowerCase();
                //   const titleMatches = item.title
                //     .toLowerCase()
                //     .includes(searchTerm);
                //   const authorMatches = item.author
                //     .toLowerCase()
                //     .includes(searchTerm);
                //   const tagMatches = item.tag
                //     .toLowerCase()
                //     .includes(searchTerm);

                //   return (
                //     searchTerm === "" ||
                //     tagMatches ||
                //     titleMatches ||
                //     authorMatches
                //   );
                // })
                .map(({ id, coverImageUrl, title, Price, author, tag }) => (
                  <div
                    key={id}
                    className="border border-gray-200 shadow-lg px-10 div space-y-2"
                    onClick={() => handleCardClick(id)}
                  >
                    <img
                      src={coverImageUrl}
                      alt=""
                      className="h-[220px] mt-4 w-[150px] object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-gray-700">{author}</p>
                      <div className="flex ml-8 mt-1 items-center gap-1">
                        <span className="">{Price}</span>
                      </div>
                      <div className="flex ml-4 mt-1 items-center gap-1">
                        <span className="font-bold text-lg">{tag}</span>
                      </div>
                      <button
                        onClick={handleOrder}
                        className="bg-primary hover:scale-105 mb-4 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
            </div> ) }

           
          </div>

          <Loading/>
        </div>
      </div>
    </>
  );
};

export default Books;
