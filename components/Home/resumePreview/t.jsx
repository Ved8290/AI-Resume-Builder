import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PdfGenerator = () => {
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('download.pdf');
  };

  return (
    <>
      <div ref={printRef} style={{ padding: 20, backgroundColor: 'white' }}>
        <h1>Hello World!</h1>
        <p>This will be downloaded as PDF.</p>
      </div>
      <button onClick={handleDownloadPdf}>Download PDF</button>
    </>
  );
};

export default PdfGenerator;
