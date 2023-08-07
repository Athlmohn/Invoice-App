import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InvoiceTable from "./InvoiceTable";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import db from "../firebase";

function InvoicePage() {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [itemName, setItemName] = useState("");
  const [currency, setCurrency] = useState("");
  const [itemCost, setItemCost] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemList, setItemList] = useState([]);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user.id) return navigate("/login");
  }, [navigate, user.id]);

  const addItem = (e) => {
    e.preventDefault();
    if (itemName.trim() && itemCost > 0 && itemQuantity >= 1) {
      setItemList([
        ...itemList,
        {
          itemName,
          itemCost,
          itemQuantity,
        },
      ]);
    }

    setItemName("");
    setItemCost("");
    setItemQuantity("");
  };

  const createInvoice = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "invoices"), {
      user_id: user.id,
      customerName,
      customerAddress,
      customerEmail,
      currency,
      itemList,
      timestamp: serverTimestamp(),
    })
      .then(() => navigate("/dashboard"))
      .catch((err) => {
        console.error("Invoice not created", err);
      });
  };

  return (
    <div className="w-full p-3 md:w-2/3 shadow-xl mx-auto mt-8 rounded  my-8 md:p-8">
      <h3 className="text-center font-bold text-xl mb-4">Create an invoice</h3>

      <form className="w-full mx-auto flex flex-col" onSubmit={createInvoice}>
        <input
          type="text"
          required
          id="customerName"
          placeholder="Customer's Name"
          className="py-2 px-4 bg-gray-100 w-full mb-6"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          type="text"
          required
          id="customerAddress"
          className="py-2 px-4 bg-gray-100 w-full mb-6"
          value={customerAddress}
          placeholder="Customer's Address"
          onChange={(e) => setCustomerAddress(e.target.value)}
        />

        <input
          type="email"
          required
          id="customerEmail"
          className="py-2 px-4 bg-gray-100 w-full mb-6"
          value={customerEmail}
          placeholder="Customer's Email"
          onChange={(e) => setCustomerEmail(e.target.value)}
        />

        <input
          type="text"
          required
          maxLength={3}
          minLength={3}
          id="currency"
          placeholder="Payment Currency"
          className="py-2 px-4 bg-gray-100 w-full mb-6"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />

        <div className="w-full flex justify-between flex-col">
          <h3 className="my-4 font-bold ">Items List</h3>

          <div className="flex space-x-3">
            <div className="flex flex-col w-1/4">
              <label htmlFor="itemName" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="itemName"
                placeholder="Name"
                className="py-2 px-4 mb-6 bg-gray-100"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-1/4">
              <label htmlFor="itemCost" className="text-sm">
                Cost
              </label>
              <input
                type="number"
                id="itemCost"
                placeholder="Cost"
                className="py-2 px-4 mb-6 bg-gray-100"
                value={itemCost}
                onChange={(e) => setItemCost(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-center w-1/4">
              <label htmlFor="itemQuantity" className="text-sm">
                Quantity
              </label>
              <input
                type="number"
                id="itemQuantity"
                placeholder="Quantity"
                className="py-2 px-4 mb-6 bg-gray-100"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-center w-1/4">
              <p className="text-sm">Price</p>
              <p className="py-2 px-4 mb-6 bg-gray-100">
                {Number(itemCost * itemQuantity).toLocaleString("en-US")}
              </p>
            </div>
          </div>
          <button
            className="bg-blue-500 text-gray-100 w-[150px] p-3 rounded my-2"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        {itemList[0] && <InvoiceTable itemList={itemList} />}

        <button
          className="bg-blue-800 text-gray-100 w-full p-5 rounded my-6"
          type="submit"
        >
          CREATE INVOICE
        </button>
      </form>
    </div>
  );
}

export default InvoicePage;
