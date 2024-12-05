import { getSession } from "@/lib/utils";

const Page = async () => {
  const session = await getSession();

  return (
    <div>
      <h1 className="text-3xl font-bold">admin Page {session?.user?.name}</h1>
    </div>
  );
};

export default Page;
