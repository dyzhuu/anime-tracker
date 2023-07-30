import { NavBar } from "@/app/(navbar)/NavBar";


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
