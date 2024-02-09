import React, { useEffect, useState } from "react";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";


const Books = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const baseUrl = "http://localhost:5000/book";
  const [page, setPage] = useState(1);

  const [booksData, setBooksData] = useState([]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  // Fetching Part
  useEffect(() => {
    setTimeout(async () => {
      const response = await axios.get(
        `http://localhost:5000/book?page=${page}&pageSize=8`
      );

      setBooksData((prev) => [...prev, ...response.data.data]);
      console.log(booksData)
      setInitialLoadComplete(true);
      setLoading(false);
    }, 1500);
  }, [page]);

  useEffect ( () => {
    console.log(booksData)
  } )

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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("token", token);
        const response = await axios.get("http://localhost:5000/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchOrders();
  }, []);

  const handleOrder = async (bookId) => {
    try {
      console.log("bookID", bookId);
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:5000/order/create", { bookId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
              type="search"
              id="default-search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-2/3 p-4 mb-10 text-sm text-gray-900  focus:outline-none border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your search term"
            />

            {initialLoadComplete && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {/* Card */}
                {booksData
                  .filter((item) => {
                    const searchTerm = search.toLowerCase();
                    const titleMatches = item.title
                      .toLowerCase()
                      .includes(searchTerm);
                    const authorMatches = item.writer
                      .toLowerCase()
                      .includes(searchTerm);
                    const tagMatches = item.tag
                      .toLowerCase()
                      .includes(searchTerm);

                    return (
                      searchTerm === "" ||
                      tagMatches ||
                      titleMatches ||
                      authorMatches
                    );
                  })
                  .map(({ id, coverImageUrl, title, point, writer, tag }) => (
                    <div
                      key={id}
                      className="border border-gray-200 shadow-lg rounded-md overflow-hidden mx-4 sm:mx-0"
                      onClick={() => handleCardClick(id)}
                    >
                      <img
                        src={coverImageUrl}
                        alt=""
                        className="h-48  sm:h-56 md:h-60 lg:h-64 xl:h-72 object-cover transform hover:scale-125 transition-transform duration-300 w-full"
                      />
                      <div className="p-4">
                        <div className="overflow-hidden">
                          <h3 className="font-semibold text-lg" title={title}>
                            {title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-700">{writer}</p>
                        <div className="flex items-center gap-1">
                          <span className="">Price: {point}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-lg">Tag: {tag}</span>
                        </div>
                        <button
                          onClick={ () => handleOrder(id)}
                          className="bg-primary hover:scale-105 text-white py-1 px-4 rounded-full mt-4"
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <Loading />
        </div>
      </div>
    </>
  );
};

export default Books;
