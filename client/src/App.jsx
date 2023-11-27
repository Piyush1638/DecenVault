import { useContext, useState } from "react";
import "./App.css";
import { UploadContext } from "./contexts/UploadContext";

import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

const App = () => {
  const { account } = useContext(UploadContext);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative gradient-bg-welcome">
      <Navbar />
      <section className="flex items-center flex-col justify-center p-10">
        <h1 className="sm:text-5xl text-2xl text-center my-10 font-bold text-white">
          Experience the world of <br />
          <span className="font-montserrat sm:font-bold text-purple-600">
            Decentralized File Storage System
          </span>
        </h1>
        <h3 className="text-white  sm:text-lg text-xs mb-10 font-poppins border rounded-lg p-4 border-purple-600">
          Account: {account ? account : "Please install metamask"}
        </h3>
        <FileUpload></FileUpload>
        {!modalOpen && (
          <button
            onClick={() => setModalOpen(true)}
            className="my-4 bg-purple-700 px-4 rounded-lg py-2 text-white"
          >
            Share
          </button>
        )}
        {
          modalOpen && (
            <Modal setModalOpen={setModalOpen}/>
          )
        }
      </section>
      {/* Display Section */}
      <section className="p-10">
        <Display />
      </section>
    </div>
  );
};

export default App;
