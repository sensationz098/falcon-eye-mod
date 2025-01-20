"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateWorkReportSchema, CreateWorkReportType } from "@/types";
import { createWorkReport } from "@/server/USER/userServerActions";

const WorkReportUpdate = ({ userID }: { userID: string }) => {
  const { toast } = useToast();

  const form = useForm<CreateWorkReportType>({
    resolver: zodResolver(CreateWorkReportSchema),
    defaultValues: {
      work: "",
    },
  });

  async function onSubmit(values: CreateWorkReportType) {
    const res = await createWorkReport(values, userID);

    if (res) {
      toast({
        title: "Work Report Updated Successfully",
      });

      form.reset();
    } else {
      toast({
        title: "error",
        variant: "destructive",
      });
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-[5px]">
            <Pencil /> Update Work
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Work Report</DialogTitle>
            <DialogDescription
              aria-describedby={"this the a descirption"}
              asChild
            >
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
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="update your work report"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogClose asChild>
                    <Button type="submit">Submit</Button>
                  </DialogClose>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkReportUpdate;
