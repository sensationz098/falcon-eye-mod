import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline">Landing page</h1>
      <h1>
        <Link href="/admin">Admin</Link>
      </h1>
      <h1>
        <Link href="/user">user</Link>
      </h1>
    </div>
  );
}
