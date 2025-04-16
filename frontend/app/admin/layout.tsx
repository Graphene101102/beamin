import type { Metadata } from "next";
import AdminSidebar from '../components/admin/layout/Sidebar';
// import AdminHeader from '../components/admin/layout/Header'

export const metadata: Metadata = {
  title: "BeaMin Admin",
  description: "BeaMin Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      {/* <div className="flex-1 flex flex-col"> */}
        {/* <AdminHeader /> */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      {/* </div> */}
    </div>
  );
}
