import React from "react";
import DeleteIcon from "./DeleteIcon.svg";
import ViewIcon from "./ViewIcon.svg";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase";

const Table = ({ invoices }) => {
  const convertTimestamp = (timestamp) => {
    const fireBaseTime = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const day =
      fireBaseTime.getDate() < 10
        ? `0${fireBaseTime.getDate()}`
        : fireBaseTime.getDate();
    const month =
      fireBaseTime.getMonth() < 10
        ? `0${fireBaseTime.getMonth()}`
        : fireBaseTime.getMonth();
    const year = fireBaseTime.getFullYear();

    return `${day}-${month}-${year}`;
  };

  async function deleteInvoice(id) {
    try {
      await deleteDoc(doc(db, "invoices", id));
      alert("Invoice deleted successfully");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-xl text-blue-700 font-semibold">Recent Invoices </h3>
      <table>
        <thead>
          <tr>
            <th className="text-blue-600">Date</th>
            <th className="text-blue-600">Customer</th>
            <th className="text-blue-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="text-sm text-gray-400">
                {convertTimestamp(invoice.data.timestamp)}
              </td>
              <td className="text-sm">{invoice.data.customerName}</td>
              <td>
                <ViewIcon
                  onClick={() => navigate(`/view/invoice/${invoiceId}`)}
                />
                <DeleteIcon onClick={() => deleteInvoice(invoice.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
