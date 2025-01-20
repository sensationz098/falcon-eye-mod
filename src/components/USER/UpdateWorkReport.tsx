"use client";

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
import {
  deleteWorkReport,
  updateWorkReport,
} from "@/server/USER/userServerActions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const UpdateWorkReportFormType = z.object({
  work: z.string().min(2, "the minimum length is required"),
});

const UpdateWorkReport = ({ _id, work }: { _id: number; work: string }) => {
  return (
    <div className="flex gap-2">
      <UpdateReportById work={work} _id={_id} />
      <Button
        onClick={() => deleteWorkReport(_id)}
        variant={"destructive"}
        className="rounded-[5px]"
      >
        Delete
      </Button>
    </div>
  );
};

export default UpdateWorkReport;

const UpdateReportById = ({ work, _id }: { _id: number; work: string }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof UpdateWorkReportFormType>>({
    resolver: zodResolver(UpdateWorkReportFormType),
    defaultValues: {
      work: work,
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateWorkReportFormType>) {
    const res = await updateWorkReport(_id, values.work);
    if (res.status) {
      toast({
        title: res.message,
      });
    } else {
      toast({
        title: res.message,
        variant: "destructive",
      });
    }

    form.reset();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="rounded-[5px]">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your Work Report</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="work"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Report</FormLabel>
                      <FormControl>
                        <Input placeholder="work update" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose asChild>
                  <Button type="submit">Update</Button>
                </DialogClose>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
