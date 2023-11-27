import React, { useContext } from "react";

import { UploadContext } from "../contexts/UploadContext";
import Loading from "./Loading";

const FileUpload = () => {
  const { retrieveFile, handleSubmit, loading,file, fileName } = useContext(UploadContext);
  return (
    <div className="top text-white border-b w-4/5 sm:w-2/5  border-gray-200">
      <form onSubmit={handleSubmit} className="form m-10 flex sm:flex-row flex-col justify-center items-center">
        <label htmlFor="file-Upload" className="mx-4  text-sm">
          Choose Image
        </label>
        <input
          type="file"
          onChange={retrieveFile}
          name="data"
          id="file-Upload"
          className="mb-5 hidden"
        />
        <span className="mx-2 my-4">Image: {fileName}</span>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <button type="submit" disabled={!file} className="bg-purple-900 text-white px-3 py-2 rounded-lg disabled:bg-purple-200">
              Upload
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
