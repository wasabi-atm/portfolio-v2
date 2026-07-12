import Sidebar from "@/components/Sidebar";

export default function WebLayout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 lg:pl-[348px] flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
