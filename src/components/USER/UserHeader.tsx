import { formatDate } from "date-fns";
import { getUserHeader } from "@/db/UserDbQueries";

const UserHeader = async ({ _id }: { _id: string }) => {
  const user = await getUserHeader(_id);

  if (user === null) return <h1>the employee details not found</h1>;

  return (
    <div className="flex flex-1 flex-col flex-wrap md:flex-row">
      <section className="mx-2">
        <h1 className="text-xl">
          Hello, <span className="font-bold uppercase">{user?.name}</span>
        </h1>

        <p className="capitalize">
          {user?.designation}, {user?.department}
        </p>

        <p>joined since {formatDate(user?.date_of_joining as Date, "PPP")}</p>
      </section>
    </div>
  );
};

export default UserHeader;
