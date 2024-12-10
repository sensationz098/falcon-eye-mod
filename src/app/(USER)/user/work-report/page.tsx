import prisma from "@/db/prisma";
import { getSession } from "@/lib/utils";
import { formatDate } from "date-fns";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

const page = async () => {
  const session = await getSession();

  const workReport = await prisma.workReport.findMany({
    where: {
      userID: session?.user?.id,
    },
  });

  if (workReport.length === 0)
    return (
      <div className="text-center text-2xl capitalize">
        no work report found
      </div>
    );

  return (
    <div className="p-2">
      {workReport.map((i) => {
        return (
          <section
            key={i.id}
            className="max-w-xl rounded-lg border p-2 md:grid md:grid-cols-3"
          >
            <section className="flex items-center justify-between px-2 py-2">
              <h1 className="uppercase">{session?.user.name}</h1>
              <p>{formatDate(i.updated_At, "PPP")}</p>
            </section>
            <p className="line-clamp-2 overflow-hidden px-2">{i.work}</p>
          </section>
        );
      })}
    </div>
  );
};

export default page;

{
  /* <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>; */
}
