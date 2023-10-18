import Link from "next/link";

export default function Home() {
  return (
    <div className="text-red-500">
      This is a next app
      <br></br>
      <div>
        Click <Link href="/login">here</Link> to go to another page
      </div>
    </div>
  );
}
