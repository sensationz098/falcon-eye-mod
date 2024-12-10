import UserNavbar from "@/components/USER/UserNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserNavbar />
      <main className="container mx-auto p-2">{children}</main>
    </>
  );
}
