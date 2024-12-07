// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import AdminSideBar from "@/components/ADMIN/AdminSideBar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-2">{children}</main>
    </>
  );
}
