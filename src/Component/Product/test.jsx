import { useRef } from "react";
import htmlToPdf from "html-to-pdf-js";

const Test = () => {
  const targetRef = useRef();

  const generatePDF = () => {
    // Set document language to Arabic
    document.documentElement.setAttribute('lang', 'ar');

    // Apply styles with font embedding
    const pdfElement = targetRef.current;
    pdfElement.style.fontFamily = "'Noto Naskh Arabic', sans-serif";

    // Ensure the font supports Arabic characters
    // Embed font if needed - this is library specific and may require importing the font file

    // Generate PDF
    htmlToPdf().from(pdfElement).toPdf().get('blob').then(blob => {
      console.log('Generated Blob:', blob); // Log the blob for debugging
      if (blob) {
        // Proceed only if blob is not null or undefined
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      } else {
        console.error('Blob is null or undefined.');
      }
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  }

  return (
    <div>
      <div ref={targetRef}>
        {/* Make sure to include the content you want to export to PDF here */}
        <h1>مرحباً بكم في مستند PDF</h1>
        <p>هذا المحتوى سيتم تحويله إلى ملف PDF.</p>
        {/* More content here */}
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
}

export default Test;