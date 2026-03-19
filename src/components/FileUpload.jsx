import { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa"; 

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAllowed, setIsAllowed] = useState(true);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event)=>{
    const file = event.target.files[0];
    setSelectedFile(file);
    
    if(file){
      const fileName = file.name;
      setFileName(fileName);
      const allowedExtensions = ['.md'];
      const fileExtension = fileName.slice(((fileName.lastIndexOf(".")-1)>>>0)+2)

      setIsAllowed(allowedExtensions.includes("."+fileExtension));
    
      if(allowedExtensions.includes("."+fileExtension)){
        console.log('Selected file:', file);
        const reader = new FileReader();
        try {
          reader.onload = (e) => {
            console.log('File content:', e.target.result);
          };
          reader.readAsText(file);
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Hidden input */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
      />

      {/* Icon button */}
      <label
        htmlFor="fileInput"
        title="Browse file"
        style={{
          cursor: "pointer",
          display: "inline-block",
          padding: "12px",
          borderRadius: "50%",
          backgroundColor: "#f0f0f0",
          transition: "0.3s",
        }}
      >
        <FaUpload size={24} />
      </label>

      {/* File name */}
      {fileName && (
        <div style={{ marginTop: "8px", fontSize: "14px", maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
          {fileName}
        </div>
      )}
      {!isAllowed && <p style={{color: 'red'}}>File type not allowed. Only .md files are allowed.</p>}
    </div>
  );
}

export default FileUpload
