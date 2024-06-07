import React, { useState } from "react";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://your-backend-url/pdf/upload/", {
        method: "POST",
        body: formData,
      });
      // Handle successful upload (e.g., get the filename from the response)
    } catch (error) {
      // Handle upload error
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
}
