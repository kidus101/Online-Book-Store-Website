import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6ImtpZHVzIiwiZW1haWwiOiJraWR1c2FiZWJlMTAxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGxvQlhmVVRHVkVIL1c2bzUuMExLai5ISExLRGNQSWdSeGhNbjE5YVpKRHRXcHZDMC92bXB5IiwicG9pbnQiOjEwMCwiY3JlYXRlZEF0IjoiMjAyNC0wMi0wOFQyMzoxMTo0OC40MDZaIiwidXBkYXRlZEF0IjoiMjAyNC0wMi0wOFQyMzoxMTo0OC40MDZaIiwiaWF0IjoxNzA3NDM4Mjg4LCJleHAiOjE3MDgwNDMwODh9.KCIvc9o5E3d1rsL3jfAcaXx_no-3PUm6qloMIDEknbw";
        const response = await axios.get("http://localhost:5000/order");
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Writer</th>
          <th>Tag</th>
          <th>Point</th>
          <th>Cover Image</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(({ id, writer, tag, point, coverImage }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{writer}</td>
            <td>{tag}</td>
            <td>{point}</td>
            <td>
              <img src={coverImage} alt="Cover" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;

// import React from "react";
// import Book1 from "../../assets/books/book1.jpg";
// import Book2 from "../../assets/books/book2.jpg";
// import Book3 from "../../assets/books/book3.jpg";

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

// ];

// const OrderedBooks = () => {
//   return (
//     <div>
//       <div className="container">
//         <div className="text-center border border-gray-300 shadow-lg my-10 max-w-[1000px] mx-auto">
//           <div class="relative overflow-x-auto">
//             <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//               <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                 <tr>
//                   <th scope="col" class="px-6 py-3">
//                     Product name
//                   </th>
//                   <th scope="col" class="px-6 py-3">
//                     Color
//                   </th>
//                   <th scope="col" class="px-6 py-3">
//                     Category
//                   </th>
//                   <th scope="col" class="px-6 py-3">
//                     Price
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                   <th
//                     scope="row"
//                     class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     Apple MacBook Pro 17"
//                   </th>
//                   <td class="px-6 py-4">Silver</td>
//                   <td class="px-6 py-4">Laptop</td>
//                   <td class="px-6 py-4">$2999</td>
//                 </tr>
//                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                   <th
//                     scope="row"
//                     class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     Microsoft Surface Pro
//                   </th>
//                   <td class="px-6 py-4">White</td>
//                   <td class="px-6 py-4">Laptop PC</td>
//                   <td class="px-6 py-4">$1999</td>
//                 </tr>
//                 <tr class="bg-white dark:bg-gray-800">
//                   <th
//                     scope="row"
//                     class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     Magic Mouse 2
//                   </th>
//                   <td class="px-6 py-4">Black</td>
//                   <td class="px-6 py-4">Accessories</td>
//                   <td class="px-6 py-4">$99</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderedBooks;
