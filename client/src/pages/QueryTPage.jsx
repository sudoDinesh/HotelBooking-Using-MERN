/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";

export default function QueryTPage() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios.get("/highlyValuedCust").then((response) => {
      setCustomers(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-left text-xl">Highly valued customer</div>
      <div className="mt-4">
        {customers.length > 0 &&
          customers.map((customer) => (
            <div className="flex gap-4 bg-gray-100 p-4 rounded-2xl my-5">
              <div className="grow-0 shrink">
                <h2 className="text-xl "> {customer.UserName}</h2>
                <p className="text-sm mt-2">{customer.UserEmail}</p>
                <h2 className="text-xl ">
                  {" "}
                  TotalBooking : ₹{customer.TotalBookingValue}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
