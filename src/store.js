import { create } from "zustand";

export const useInvoiceDataStore = create((set) => ({
  invoiceData: {
    companyName: "",
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    customerName: "",
    TRN: "",
    customerAddress: "",
    items: [
      {
        description: "",
        unitPrice: 0,
        netWeight: 0,
        totalAmount: 0,
      },
    ],
    paidAmount: "",
  },

  // Functional setter
  setInvoiceData: (update) =>
    set((state) => ({
      invoiceData:
        typeof update === "function"
          ? update(state.invoiceData)
          : update,
    })),
}));


export const useTest = create(() => ({
  testing: 5,
}));
