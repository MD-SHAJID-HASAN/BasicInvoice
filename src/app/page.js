'use client';

import { useEffect, useState } from "react";
import CreateInvoice from "@/components/CreateInvoice";
import InvoicePDF from "@/components/InvoicePDF";
import { useInvoiceDataStore } from "@/store";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function Home() {
  const invoiceData = useInvoiceDataStore((state) => state.invoiceData);
  const today = new Date().toISOString().split("T")[0];

  // Client-only rendering safeguard
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-black bg-white">
      <div className="flex justify-between p-6 pb-0">
        <h1 className="text-2xl font-bold">Create Invoice</h1>

        {mounted && invoiceData?.items?.length > 0 && (
          <PDFDownloadLink
            document={<InvoicePDF data={invoiceData} />}
            fileName={`${invoiceData.customerName || "NoName"} ${invoiceData.invoiceDate || today}.pdf`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {({ loading }) => (loading ? "Generating PDF..." : "Save")}
          </PDFDownloadLink>
        )}
      </div>

      <CreateInvoice />
    </div>
  );
}
