'use client'
import CreateInvoice from "@/components/CreateInvoice";
import InvoicePDF from "@/components/InvoicePDF";
import { useInvoiceDataStore, useTest } from "@/store";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Image from "next/image";

export default function Home() {

  const invoiceData = useInvoiceDataStore((state) => state.invoiceData);
  
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-black bg-white">

      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
        <div className="p-4">
          {invoiceData?.items && (<PDFDownloadLink
            document={<InvoicePDF data={invoiceData}/>}
            fileName={`${invoiceData.customerName ? invoiceData.customerName : 'NoName'} ${invoiceData.invoiceDate ? invoiceData.invoiceDate : today}.pdf`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {({ loading }) => (loading ? "Generating PDF..." : "Save")}
          </PDFDownloadLink>)}
        </div>

      </div>
      <CreateInvoice></CreateInvoice>
    </div>
  );
}
