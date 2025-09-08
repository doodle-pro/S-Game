import DFooter from "@/components/ui-playmode/footer";
import DHeader from "@/components/ui-playmode/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid items-center bg-black relative">
      <DHeader />
      {children}
      <DFooter />
    </div>
  );
}
