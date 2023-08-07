import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (!user.id) return navigate("/login");

    try {
      const q = query(
        collection(db, "invoices"),
        where("user_id", "==", user.id)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const firebaseInvoices = [];
        querySnapshot.forEach((doc) => {
          firebaseInvoices.push({ data: doc.data(), id: doc.id });
        });
        setInvoices(firebaseInvoices);

        return () => unsubscribe();
      });
    } catch (error) {
      console.log(error);
    }
  }, [navigate, user.id]);

  return (
    <div className="w-full">
      <div className="sm:p-6 flex items-center flex-col p-3 justify-center">
        <h3 className="p-12 text-slate-800">
          Welcome, <span className="text-blue-800">{user.email}</span>
        </h3>
        <button
          className=" h-36 py-6 px-12 border-t-8 border-blue-800 shadow-md rounded hover:bg-slate-200 hover:border-red-500 bg-slate-50 cursor-pointer mb-[100px] mt-[50px] text-blue-700"
          onClick={() => navigate("/new/invoice")}
        >
          Create an invoice
        </button>

        {invoices.length > 0 && <Table invoices={invoices} />}
      </div>
    </div>
  );
};

export default Dashboard;
