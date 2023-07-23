import { NavBar } from "@/components/NavBar";


export default async function NavBarLayout({
  children 
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
