import prisma from "@/db/prisma";
import { getSession } from "@/lib/utils";
import { formatDate } from "date-fns";

const UserHeader = async () => {
  const session = await getSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: { employee: true },
  });

  return (
    <div className="flex flex-1 flex-col flex-wrap md:flex-row">
      <section className="mx-2">
        <h1 className="text-xl">
          Hello,{" "}
          <span className="font-bold uppercase">{user?.employee?.name}</span>
        </h1>
        <p className="capitalize">
          {user?.employee?.designation}, {user?.employee?.department}
        </p>

        <p>
          joined since{" "}
          {formatDate(
            user?.employee?.date_of_joining
              ? user?.employee?.date_of_joining
              : "not available",
            "PPP",
          )}
        </p>
      </section>
    </div>
  );
};

export default UserHeader;
