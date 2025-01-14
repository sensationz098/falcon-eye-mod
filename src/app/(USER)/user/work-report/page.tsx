import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAllWorkReport } from "@/db/UserDbQueries";
import { getSession } from "@/lib/utils";
import { formatDate } from "date-fns";
import { deleteWorkReport } from "@/server/USER/userServerActions";

// import { deleteWorkReport } from "@/server/USER/userServerActions";

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
              className="max-w-xl rounded-lg border p-2 md:grid md:grid-cols-3"
            >
              <section className="flex items-center justify-between px-2 py-2">
                <h1 className="uppercase">{session?.user.user?.name}</h1>
                <p>{formatDate(updated_At, "PPP")}</p>
              </section>
              <p className="line-clamp-2 overflow-hidden px-2">{work}</p>
              <section className="flex gap-4">
                <UpdateReportById work={work} />
                <Button variant={"destructive"} className="rounded-[5px]">
                  Delete
                </Button>
              </section>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default page;

const UpdateReportById = ({ work }: { work: string }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant={"secondary"} className="rounded-[5px]">
        Edit
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Enter Your Work Report</DialogTitle>
        <DialogDescription>{work}</DialogDescription>

        <DialogClose asChild>
          <Button>edit</Button>
        </DialogClose>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);
