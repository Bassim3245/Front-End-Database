import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { saveAs } from "file-saver";

import NotoKufiArabic from "../../../Font/NotoKufiArabic-VariableFont_wght.ttf"; // Adjust the path as necessary

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyDocument = () => {
  const [numPages, setNumPages] = useState(null);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const documentRef = useRef();

  useEffect(() => {
    // Register the font when the component mounts
    pdfjs.GlobalWorkerOptions.fonts = {
      ...pdfjs.GlobalWorkerOptions.fonts,
      NotoKufiArabic: {
        normal: NotoKufiArabic,
      },
    };
    setIsFontLoaded(true);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const createPDF = async () => {
    try {
      const blob = await renderMyDocumentToBlob();
      saveAs(blob, "my-document.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const renderMyDocumentToBlob = async () => {
    try {
      if (!documentRef.current) return;
      
      // Access Document component's instance and call getRenderedCanvas
      const renderedCanvas = await documentRef.current.getRenderedCanvas({
        pageNumber: 1, // Assuming we are rendering the first page
      });

      // Convert the canvas to a blob
      return new Promise(resolve => {
        renderedCanvas.toBlob(blob => {
          resolve(blob);
        });
      });
    } catch (error) {
      console.error("Error rendering PDF to blob:", error);
      throw error;
    }
  };

  return (
    <div>
      <button onClick={createPDF}>Download PDF</button>
      {isFontLoaded && (
        <Document
          file="path/to/your/document.pdf" // Specify the path to the PDF file
          onLoadSuccess={onDocumentLoadSuccess}
          inputRef={ref => (documentRef.current = ref)} // Using callback ref
        >
          <Page pageNumber={1} /> {/* Assuming we are rendering the first page */}
        </Document>
      )}
    </div>
  );
};

export default MyDocument;
