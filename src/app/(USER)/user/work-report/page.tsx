import { getAllWorkReport } from "@/db/UserDbQueries";
import { getSession } from "@/lib/utils";
import { formatDate } from "date-fns";

import { UpdateWorkReport } from "@/components";

const page = async () => {
  const session = await getSession();

  const workReport = await getAllWorkReport({
    _id: session?.user.id as string,
    type: "ALL",
  });

  if (workReport.length === 0) return <h1>no work report found</h1>;

  return (
    <div>
      <div className="p-2">
        {workReport.map(({ id, updated_At, work }) => {
          return (
            <section
              key={id}
              className="flex w-full justify-between rounded-lg border p-2"
            >
              <section className="flex items-center justify-between gap-10 px-2 py-2">
                <p>{formatDate(updated_At, "PP")}</p>
                <p className="line-clamp-1 overflow-hidden px-2">{work}</p>
              </section>

              <section className="flex gap-4">
                <UpdateWorkReport _id={id} work={work} />
              </section>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default page;
