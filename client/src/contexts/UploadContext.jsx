import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { uploadABI, uploadAddress } from "../utils/constants";

export const UploadContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(uploadAddress, uploadABI, signer);
    console.log("Contract:", contract);
    return contract;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

export const UploadProvider = ({ children }) => {
  const [account, setAccount] = React.useState("");
  const [provider, setProvider] = useState(null);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const [accessAddress, setAccessAddress] = useState([]);

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(accounts[0]);
      setProvider(provider);
    } catch (error) {
      alert(error.message);
      throw new Error("No ethereum object.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "aea0facdee0555edb65a",
            pinata_secret_api_key:
              "e5f96e58f178bf8c76dd76d8f3a6ec98d460d8423eef1cd7a1b7c32a043ef194",
            "Content-Type": "multipart/form-data",
          },
        });
        const Imghash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        alert("File is uploaded on pinata");
        const contract = await getEthereumContract();
        const tx = await contract.add(account, Imghash);
        await tx.wait();
        setLoading(false);
        setFileName("");
        setFile(null);
        console.log(Imghash);
        alert("File added on blockchain");
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const getData = async (otherAddress) => {
    const contract = await getEthereumContract();
    let dataArray;
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(account);
      }
      const isEmpty = Object.keys(dataArray).length == 0;
      if (!isEmpty) {
        const images = dataArray.map((item, i) => {
          return (
            <a
              className=""
              href={item}
              key={`a-${i}`}
              target="blank"
              rel="noopener noreferrer"
            >
              <img
                src={item}
                key={`img-${i}`}
                alt="Loading"
                className="aspect-[3/2] h-80 w-80 object-contain border border-purple-700 rounded-lg"
              />
            </a>
          );
        });
        setData(images);
      } else {
        alert("No images to show.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sharing = async (address) => {
    const contract = await getEthereumContract();
    await contract.allow(address);
  };

  const removeAccess = async (address)=>{
    const contract = await getEthereumContract();
    await contract.disallow(address);
  }

  useEffect(() => {
    const accessList = async () => {
      try {
        const contract = await getEthereumContract();
        const addressList = await contract.shareAccess();
        setAccessAddress(addressList);
      } catch (error) {
        console.error("Error accessing shareAccess:", error.message);
      }
    };
     accessList();
  },[]);

  useEffect(() => {
    const init = async () => {
      await connectWallet();
    };

    init();
  }, []);

  return (
    <UploadContext.Provider
      value={{
        getEthereumContract,
        account,
        provider,
        retrieveFile,
        handleSubmit,
        getData,
        sharing,
        removeAccess,
        data,
        loading,
        file,
        fileName,
        accessAddress,
        getEthereumContract,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
