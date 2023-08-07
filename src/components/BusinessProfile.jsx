import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import db, { storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { useSelector } from "react-redux";

function BusinessProfile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [logo, setLogo] = useState(
    "https://www.pesmcopt.com/admin-media/images/default-logo.png"
  );

  const handleFileReader = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setLogo(readerEvent.target.result);
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "businesses"), {
      user_id: user.id,
      businessName,
      businessAddress,
      accountName,
      accountNumber,
      bankName,
    });

    const imageRef = ref(storage, `businesses/${docRef.id}/image`);

    if (
      logo !== "https://www.pesmcopt.com/admin-media/images/default-logo.png"
    ) {
      await uploadString(imageRef, logo, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "businesses", docRef.id), {
          logo: downloadURL,
        });
        //Sucessfully created a business Profile
        alert("Congratulations, Your business Profile is ready!");
      });

      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (!user.id) return navigate('/login');

    try {
      const q = query(
        collection(db, 'businesses'),
        where('user_id', '==', user.id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const business = [];
        querySnapshot.forEach((doc) => {
          business.push(doc.data().name);
        });
        if (business.length > 0) {
          navigate('/dashboard');
        }
      });
      return () => unsubscribe();
    }
    catch (error) {
      console.log(error);
    }
  }, [navigate, user.id]);

  return (
    <div className="w-full mt-12 md:p-8 md:w-2/3 md:shadow-md mx-auto md:mt-2 rounded p-3">
      <h3 className="text-center font-bold text-xl md:text-3xl text-[#A020F0] mb-6">
        Setup Business Profile
      </h3>

      <form className="w-full mx-auto flex flex-col" onSubmit={handleSubmit}>
        {/* The handleSubmit function sends the form details to Firestore */}
        <input
          type="text"
          required
          className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded focus:outline-none"
          id="businessName"
          value={businessName}
          placeholder="Business Name"
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          type="text"
          required
          className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded focus:outline-none"
          id="businessAddress"
          value={businessAddress}
          placeholder="Business Address"
          onChange={(e) => setBusinessAddress(e.target.value)}
        />

        <input
          type="text"
          required
          className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded focus:outline-none"
          id="accountName"
          value={accountName}
          placeholder="Account Name"
          onChange={(e) => setAccountName(e.target.value)}
        />

        <input
          type="number"
          required
          className="py-2 px-4 bg-gray-100 w-full mb-6 rounded focus:outline-none"
          id="accountNumber"
          value={accountNumber}
          placeholder="Account Number"
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <input
          type="text"
          required
          className="py-2 px-4 bg-gray-100 w-full mb-6 capitalize rounded focus:outline-none"
          id="bankName"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="Bank Name"
        />

        <div className="flex items-center space-x-4 w-full">
          <div className="flex flex-col w-1/2">
            <img src={logo} alt="Logo" className=" w-full max-h-[300px]" />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="logo" className="text-sm mb-1">
              Upload logo
            </label>
            <input
              type="file"
              accept="image/*"
              required
              className="w-full mb-6  rounded"
              id="logo"
              onChange={handleFileReader}
            />
          </div>
        </div>

        <button className="bg-blue-700 text-gray-100 w-full p-5 rounded-lg overflow-hidden mt-4 hover:bg-blue-800">
          COMPLETE PROFILE
        </button>
      </form>
    </div>
  );
}

export default BusinessProfile;
