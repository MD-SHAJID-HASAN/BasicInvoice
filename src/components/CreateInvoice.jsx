"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useInvoiceDataStore } from "@/store";


const InvoiceManager = dynamic(() => import("@/components/InvoiceManager"), {
  ssr: false,
});

export default function CreateInvoice() {
  const today = new Date().toISOString().split("T")[0];
  const invoiceData = useInvoiceDataStore((state) => state.invoiceData);
  const setInvoiceData = useInvoiceDataStore((state) => state.setInvoiceData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setInvoiceData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const parsedValue = value === "" ? 0 : parseFloat(value);
    setInvoiceData((prev) => {
      const updatedItems = [...prev.items];
      const updatedItem = { ...updatedItems[index], [field]: field === "unitPrice" || field === "netWeight" ? parsedValue : value };

      updatedItem.totalAmount = updatedItem.unitPrice * updatedItem.netWeight;
      updatedItems[index] = updatedItem;

      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const addNewItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          unitPrice: 0,
          netWeight: 0,
          totalAmount: 0,
        },
      ],
    }));
  };

  const totalSum = invoiceData.items.reduce((acc, item) => acc + item.totalAmount, 0);

  return (
    <div className="w-full mx-auto p-6 bg-white">
      <div className="flex flex-col lg:flex-row justify-around items-start gap-8">
        {/* Form Section */}
        <form className="space-y-6 w-full lg:w-[45%]">
          <div>
            <label className="block text-sm font-medium">Company Name</label>
            <select
              name="companyName"
              value={invoiceData.companyName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select a company</option>
              <option value="company1">Sumon Hanif Scrap and Metal Waste Trading L.L.C</option>
              <option value="company2">AL Setou Metal Scrap TR.</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                value={invoiceData.invoiceDate || today}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <input
              name="customerName"
              value={invoiceData.customerName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">TRN</label>
            <input
              type="text"
              name="TRN"
              value={invoiceData.TRN}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Customer Address</label>
            <input
              name="customerAddress"
              value={invoiceData.customerAddress}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Items Table */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Items</h2>
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Net Weight</th>
                  <th className="p-2 border">Unit Price</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={item.netWeight}
                        onChange={(e) => handleItemChange(index, "netWeight", e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                        min={0}
                        step="any"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                        min={0}
                        step="any"
                      />
                    </td>
                    <td className="p-2 border text-right">{item.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="text-right font-semibold p-2 border">
                    Subtotal
                  </td>
                  <td className="text-right p-2 border">{totalSum.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <button
              type="button"
              onClick={addNewItem}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Item
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium">Paid Amount</label>
            <input
              type="number"
              name="paidAmount"
              value={invoiceData.paidAmount || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              min={0}
              step="any"
            />
          </div>
        </form>

        {/* Invoice Preview Section */}
        <div className="w-full lg:w-[55%] sticky top-10">
          <div className="border rounded-lg bg-white shadow p-4">
            <InvoiceManager invoiceData={invoiceData} />
          </div>
        </div>
      </div>
    </div>
  );
}
