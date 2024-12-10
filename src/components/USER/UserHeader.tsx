import prisma from "@/db/prisma";
import { getSession } from "@/lib/utils";
import { formatDate } from "date-fns";

const UserHeader = async () => {
  const session = await getSession();

  const employee = await prisma.employee.findFirst({
    where: {
      email: session?.employee?.email,
    },
  });

  return (
    <div className="flex flex-1 flex-col flex-wrap md:flex-row">
      <section className="mx-2">
        <h1 className="text-xl">
          Hello, <span className="font-bold uppercase">{employee?.name}</span>
        </h1>
        <p className="capitalize">
          {employee?.designation}, {employee?.department}
        </p>

        <p>
          joined since{" "}
          {formatDate(
            employee?.date_of_joining
              ? employee?.date_of_joining
              : "not available",
            "PPP",
          )}
        </p>
      </section>
    </div>
  );
};

export default UserHeader;
