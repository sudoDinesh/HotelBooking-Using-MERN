/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";

export default function QuerySPage() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios.get("/custNames").then(({ data }) => {
      setCustomers(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center text-xl">
        Customers who booked certain place more than 1 lakhs
      </div>
      <div className="mt-4">
        {customers.length > 0 &&
          customers.map((customer) => (
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl my-5">
              <div className="flex w-32 h-32 bg-gray-300 grow-0 ">
                <PlaceImg place={customer.bookings[0].placeInfo} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl "> {customer.bookings[0].name}</h2>
                <p className="textl">{customer.userInfo.email}</p>
                <h2 className="text-xl mt-2">
                  {" "}
                  Place : {customer.bookings[0].placeInfo.title}
                </h2>
                <p className="text-l">₹{customer.totalPrice}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
