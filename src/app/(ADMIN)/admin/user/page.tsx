import { DataTable } from "@/components/ui/DataTable";
import { UserColumn } from "@/components/tables/UserColumn";
import { getAllUsers } from "@/db/AdminDbQueries";

const page = async () => {
  const users = await getAllUsers();

  return (
    <div>
      <h1>total users {3} found</h1>

      <DataTable columns={UserColumn} data={users} />
    </div>
  );
};

export default page;
