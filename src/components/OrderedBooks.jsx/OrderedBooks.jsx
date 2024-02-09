import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [singleBookData, setSingleBookData] = useState([]);
  const [bookIdArray, setBookIdArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderedBooksResponse, setOrderedBooksResponse] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orderedResponse = response.data;
      setOrders(orderedResponse);

      // Extract bookIds from orderedResponse
      const extractedBookIds = orderedResponse.map((order) => order.id);
      setBookIdArray(extractedBookIds);

      // Fetch books by their IDs
      await fetchBooksByIds(extractedBookIds);
      console.log("extractedBookIds:", extractedBookIds);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooksByIds = async (extractedBookIds) => {
    try {
      const token = localStorage.getItem("token");
      const newOrderedBooksResponse = [];

      for (const bookId of extractedBookIds) {
        const SingleBookresponse = await axios.get(
          `http://localhost:5000/book/getById/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const singleBookData = SingleBookresponse.data.data;
        console.log("singleBookData for ID", bookId, ":", singleBookData);
        newOrderedBooksResponse.push(singleBookData);
      }

      setOrderedBooksResponse(newOrderedBooksResponse);

      await logOrderedBooksResponse(newOrderedBooksResponse);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logOrderedBooksResponse = async (newOrderedBooksResponse) => {
    console.log("Logging newOrderedBooksResponse:", newOrderedBooksResponse);
  };

  // const fetchBookById = async (bookId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const SingleBookresponse = await axios.get(`http://localhost:5000/book/getById/${bookId}
  //     `, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // console.log("BID",bookId)
  //     // console.log("SingleBookresponse", SingleBookresponse);

  //     const singleBookData = SingleBookresponse.data.data;
  //     setSingleBookData(singleBookData)
  //     setIsLoading(false);

  //     console.log( "singleBookData" , singleBookData)

  //     // Handle the fetched book data as needed
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="flex mt-10 mb-56 justify-center">
      <div
        className={`overflow-auto md:overflow-x-auto md:overflow-y-auto shadow-lg rounded-lg ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Cover Image</th>
                <th className="px-6 py-3">Writer</th>
                <th className="px-6 py-3">Point</th>
                <th className="px-6 py-3">Tag</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderedBooksResponse.map((book) => (
                <tr
                  key={book.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{book.id}</td>
                  <td className="px-6 py-4">{book.title}</td>
                  <td className="px-6 py-4">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">{book.writer}</td>
                  <td className="px-6 py-4">{book.point}</td>
                  <td className="px-6 py-4">{book.tag}</td>
                  <td className="px-6 py-4">
                    <button className="py-2 px-4 border border-white rounded bg-red-500 text-white font-md hover:bg-red-300 hover:text-black">
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>


  );
};

export default OrderTable;

