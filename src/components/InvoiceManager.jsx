"use client";

import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "@/components/InvoicePDF";

export default function InvoiceManager({ invoiceData }) {
  console.log(invoiceData);

  return (
    <div className="h-fit">
      <div className="invoice-container mx-auto text-black text-sm font-sans h-[842px] relative">
        {/* Live PDF Preview */}
        <PDFViewer width="100%" height="100%">
          <InvoicePDF data={invoiceData} />
        </PDFViewer>
      </div>
    </div>
  );
}
