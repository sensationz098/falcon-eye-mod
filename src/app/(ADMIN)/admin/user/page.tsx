import prisma from "@/db/prisma";
import { DataTable } from "@/components/ui/DataTable";
import { UserColumn } from "@/components/tables/UserColumn";
import AddUser from "@/components/ADMIN/AddUser";

const page = async () => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
      id: true,
      created_At: true,
      password: true,
    },
  });

  return (
    <div>
      <div className="flex flex-1 justify-around md:justify-between">
        <h1 className="py-2">Total number of users - {users.length}</h1>
        <AddUser />
      </div>
      <div>
        <DataTable columns={UserColumn} data={users} />
      </div>
    </div>
  );
};

export default page;
