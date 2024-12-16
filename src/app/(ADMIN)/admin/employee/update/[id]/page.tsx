import prisma from "@/db/prisma";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  const employee = await prisma.employee.findFirst({ where: { id: _id } });

  console.log(employee);

  return (
    <div>
      <h1 className="text-3xl">{_id}</h1>
    </div>
  );
};

export default page;
