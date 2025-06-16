import CreateInvoice from "@/components/CreateInvoice";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-black bg-white">
      <CreateInvoice></CreateInvoice>
    </div>
  );
}
