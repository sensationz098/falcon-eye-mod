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
      <h1>user page</h1>
      <AddUser />

      <div>
        <h1>Total number of users - {users.length}</h1>

        <DataTable columns={UserColumn} data={users} />
      </div>
    </div>
  );
};

export default page;
