import prisma from "@/db/prisma";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  const user_prisma = await prisma.user.findFirst({
    where: { id: _id },
    include: { employee: true },
  });
  console.log(user_prisma);

  return (
    <div>
      <h1 className="text-3xl font-bold">{_id}</h1>

      <h1>{user_prisma?.employee === null && "No Employee details found"}</h1>
    </div>
  );
};

export default page;
