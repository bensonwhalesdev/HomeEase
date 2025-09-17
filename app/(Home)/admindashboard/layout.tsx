import AdminHeader from "./components/header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <AdminHeader />
        {children}
    </div>
  );
}