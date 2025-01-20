import { DataTable } from "@/components/ui/DataTable";
import { UserColumn } from "@/components/tables/UserColumn";
import { getAllUsers } from "@/db/AdminDbQueries";
// import { AddUser } from "@/components";

const page = async () => {
  const users = await getAllUsers();

  return (
    <div className="mt-2">
      {/* <div className="mb-4 flex items-center justify-start gap-10">
        <h1>total {users.length} users found</h1>

        <AddUser />
      </div> */}
      <DataTable columns={UserColumn} data={users} />
    </div>
  );
};

export default page;
