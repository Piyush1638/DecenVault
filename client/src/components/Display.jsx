import React, { useContext } from "react";
import { UploadContext } from "../contexts/UploadContext";

const Display = () => {
  const { getData, data } = useContext(UploadContext);

  const fetchData = async ()=>{
     const otherAddress = document.querySelector(".input").value;
     try {
       await getData(otherAddress);
     } catch (error) {
      alert(error.message);
     }
  }

  return (
    <div className="mt-10 relative">
      <h1 className="text-xl font-poppins font-semibold text-white border-b-2 border-purple-600 inline-block">
        My Files
      </h1>
      <div className="grid sm:grid-cols-4 relative gap-3 grid-cols-1 my-6">
        {data}
      </div>
      <div className="flex m-auto items-center justify-center flex-col sm:w-4/5 w-full mt-10 p-6">
        <input
          type="text"
          placeholder="Enter Address"
          className="my-5 input border-b-2 border-purple-700 w-3/5 rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
        />
        <button
          onClick={fetchData}
          className="text-white font-poppins border-2 border-purple-900 px-2 py-2  rounded-lg"
        >
          Get Data
        </button>
      </div>
    </div>
  );
};

export default Display;
