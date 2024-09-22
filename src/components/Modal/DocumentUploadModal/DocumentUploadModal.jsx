import React, { useState } from 'react';
import './DocumentUploadModal.css';
import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';
import { BASE_URL } from '../../../../config';
import { useSelector } from 'react-redux';
import errorAnimation from '../../../assets/animations/error.json'
import uploaded from '../../../assets/animations/uploaded.json'
import uploading from '../../../assets/animations/uploading.json'
import Popup from '../../../screens/Popup/Popup';

const DocumentUploadModal = ({ isOpen, onClose }) => {
  const [colorMode, setColorMode] = useState('black-and-white');
  const [isBWActive, setIsBWActive] = useState(true);
  const [files, setFiles] = useState([]);
  const [copies, setCopies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const darkModeOn = useSelector(state => state.darkmode.darkModeOn)
  const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({ animation: null, text: '' });



  const handleBWClick = () => {
    setIsBWActive(true);
   
  };

  const handleColoredClick = () => {
    setIsBWActive(false);
  };


  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles);
    setCopies(newFiles.map(() => 1));
  };

  const handleCopyChange = (index, value) => {
    const newCopies = [...copies];
    newCopies[index] = value;
    setCopies(newCopies);
  };

  const handleDeleteFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newCopies = copies.filter((_, i) => i !== index);
    setFiles(newFiles);
    setCopies(newCopies);
  };
  

  const convertImageToPdf = async (imageFile) => {
    const pdfDoc = await PDFDocument.create();
    const image = new Image();
    image.src = URL.createObjectURL(imageFile);

    return new Promise((resolve, reject) => {
      image.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);

          const imgData = canvas.toDataURL('image/png');
          const imgBytes = await fetch(imgData).then((res) => res.arrayBuffer());
          const embeddedImage = await pdfDoc.embedPng(imgBytes);

          const { width, height } = embeddedImage.scale(1);
          const page = pdfDoc.addPage([width, height]);
          page.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width,
            height,
          });

          resolve(pdfDoc);
        } catch (error) {
          reject(error);
        }
      };

      image.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Show "Uploading..." animation immediately
    setIsLoading(true);
    setPopupContent({
      animation: uploading,
      text: 'Uploading your document, please wait...',
    });
    setPopupOpen(true); 
  
    const combinedPdf = await PDFDocument.create();
  
    try {
      // File processing: Generate combined PDF
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const copyCount = copies[i];
        let pdfDoc;
  
        if (file.type === 'application/pdf') {
          const pdfBytes = await file.arrayBuffer();
          pdfDoc = await PDFDocument.load(pdfBytes);
        } else if (file.type.startsWith('image/')) {
          pdfDoc = await convertImageToPdf(file);
        } else {
          console.error('Unsupported file type:', file.type);
          continue;
        }
  
        for (let j = 0; j < copyCount; j++) {
          const copiedPages = await combinedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          copiedPages.forEach((page) => combinedPdf.addPage(page));
        }
      }
  
      // Save combined PDF
      const combinedPdfBytes = await combinedPdf.save();
  
      // Prepare file for upload
      const blob = new Blob([combinedPdfBytes], { type: 'application/pdf' });
      const formData = new FormData();
      const localdata = localStorage.getItem('user_details');
      const firstName = localdata?.first_name || 'User';
      const today = new Date().toISOString().split('T')[0];
      const fileName = `${firstName}_${today}.pdf`;
      formData.append('document', blob, fileName);
      formData.append(colorMode === 'black-and-white' ? 'bw_pages' : 'color_pages', combinedPdf.getPageCount());
      const token = localStorage.getItem('token');

  
      // Upload the file
      const response = await fetch(`${BASE_URL}upload_print_job/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.status === 201 && data.success) {
        // Hide the loading animation and show success animation
        setIsLoading(false);
        setPopupContent({
          animation: uploaded, // Show success animation
          text: data.message,
        });
  
        setUploadSuccess(true);
        setTimeout(() => {
          setPopupOpen(true); // Show success popup
        }, 200); // A slight delay to ensure the loading closes first

        setTimeout(() => {
            
            setPopupOpen(false);
          }, 3000);
        
        const printId = data.print_job_id;
        localStorage.setItem('printid', JSON.stringify(printId));
  
        // Reset file inputs
        setFiles([]);
        setCopies([]);
        
      } else {
        throw new Error(data.message || 'Failed to upload document');
      }
  
    } catch (error) {
      console.error('Error uploading document:', error);
      // Display error animation
      setPopupContent({
        animation: errorAnimation,
        text: error.message || 'Error uploading document',
      });
      setPopupOpen(true);
    } finally {
      // Always stop the loading spinner once the operation finishes
      setIsLoading(false);
    }
  };
  


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
    <div className="modal-layout">
      <div className="close" onClick={onClose}>
        <i className="ri-close-circle-line" style={{ fontSize: 27, color: `${darkModeOn?"white":"black"}` }} />
      </div>
      <div className="modal-content">
        {isLoading && (
          <div className="popup-overlay">
            <div className="popup-content">Uploading...</div>
          </div>
        )}
        {uploadSuccess && (
          <div className="popup-overlay">
            <div className="popup-content">Upload Successful!</div>
          </div>
        )}
  
        <div className={`action-controls`}>
          <input
            type="radio"
            name="action"
            id="B&W"
            checked={isBWActive}
            onChange={handleBWClick}
          />
          <input
            type="radio"
            name="action"
            id="colored"
            checked={!isBWActive}
            onChange={handleColoredClick}
          />
          <label
            htmlFor="B&W"
            className={`action-button ${isBWActive ? 'active1' : ''}`}
            onClick={handleBWClick}
          >
            B&W
          </label>
          <label
            htmlFor="colored"
            className={`action-button ${!isBWActive ? 'active2' : ''}`}
            onClick={handleColoredClick}
          >
            Colored
          </label>
          <div className="slider-tab"></div>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="file-upload">
            <input
              type="file"
              multiple
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="choose-file-button">Choose Files</label>
          </div>
          <div className="file-details">
            {files.length >0 && <div className='table-heading py-2 px-4'><h5>Name</h5> <div className='flex justify-center gap-2'><h5>Copies</h5><h5>Delete</h5></div></div>}
            {files.map((file, index) => (
              <div key={index} className="file-item mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded">
                <span className="text-white">{file.name}</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={copies[index]}
                    onChange={(e) => handleCopyChange(index, parseInt(e.target.value, 10))}
                    className="w-10 text-center bg-gray-700 text-white border-0 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteFile(index)}
                    className="ml-2 text-white bg-red-400 border-0 py-1 px-2 focus:outline-none hover:bg-red-500 rounded"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
          {files.length >0 && <button type="submit" className="submit-button mt-4 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-md">
                Submit
            </button>}
            
        </form>
      </div>
    </div>
    <Popup
        isOpen={isPopupOpen}
        animation={popupContent.animation}
        text={popupContent.text}
        onclose={() => setPopupOpen(false)}
      />
  </div>
  
  
  );
};

export default DocumentUploadModal;