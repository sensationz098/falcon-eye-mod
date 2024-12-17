import prisma from "@/db/prisma";

const page = async () => {
  const requests = await prisma.leaveRequest.findMany({});

  return (
    <div>
      <h1 className="text-center">apply for leave request</h1>
    </div>
  );
};

export default page;
