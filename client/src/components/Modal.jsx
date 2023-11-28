import { useContext, useEffect, useState } from "react";
import { UploadContext } from "../contexts/UploadContext";
// import "./Modal.css";
const Modal = ({ setModalOpen }) => {
  const { sharing, removeAccess, getEthereumContract } =
    useContext(UploadContext);
  const [contract, setContract] = useState(null);

  const share = async () => {
    const address = document.querySelector(".address").value;
    await sharing(address);
    setModalOpen(false);
  };

  const revoke = async () => {
    const address = document.querySelector(".address").value;
    await removeAccess(address);
    setModalOpen(false);
    accessList();
  };

  useEffect(() => {
    const init = async () => {
      const contract = await getEthereumContract();
      setContract(contract);
    };
    init();
  }, []);

  const accessList = async () => {
    const contract = await getEthereumContract();
    const addressList = await contract.shareAccess();
    let select = document.querySelector("#selectNumber");
    const options = addressList;

    for (let i = 0; i < options.length; i++) {
      let opt =
        options[i].user.slice(0, 10) +
        "..." +
        options[i].user.slice(options.length - 4) +
        " Access: " +
        options[i].access;
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      el.className = "address bg-transparent text-black sm:text-medium text-xs";
      select.appendChild(el);
    }
  };

  useEffect(() => {
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="blue-glassmorphism relative sm:w-2/5 w-full mt-10 p-5 flex items-center justify-center">
        <div className="modalContainer w-full text-white">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address my-5 border-b-2 border-purple-700 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
              placeholder="Enter Address "
            ></input>
          </div>
          <form id="myForm" className="flex items-center justify-center mb-3">
            <select
              id="selectNumber"
              className="bg-transparent sm:w-3/5 w-full flex items-center justify-center "
            >
              <option className="address bg-transparent text-black sm:text-normal text-xs ">
                People With Access
              </option>
            </select>
          </form>
          <div className="footer flex items-center gap-3 justify-between mt-6">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              className="bg-[#62293d] px-4 py-2 sm:text-medium text-sm  rounded-lg"
            >
              Cancel
            </button>
            <div className="flex gap-4">
              <button
                className="bg-purple-700 px-4 py-2 sm:text-medium text-sm rounded-lg"
                onClick={revoke}
              >
                Revoke
              </button>
              <button
                className="bg-purple-700 px-4 py-2 sm:text-medium text-sm rounded-lg"
                onClick={share}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
