import { NavBar } from "@/components/NavBar";

export default function NavBarLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavBar></NavBar>
      {children}
    </section>
  );
}