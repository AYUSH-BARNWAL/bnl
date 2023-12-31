import Nav from "@/components/navbar";

export default function Layout1({ children }) {
  return (
    <>
      <Nav></Nav>
      {children}
    </>
  );
}
