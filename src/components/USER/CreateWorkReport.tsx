"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateWorkReportSchema, CreateWorkReportType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { UpdateWorkReport } from "@/server/userAction";

const CreateWorkReport = ({ _id }: { _id: string }) => {
  const { toast } = useToast();

  const form = useForm<CreateWorkReportType>({
    resolver: zodResolver(CreateWorkReportSchema),
    defaultValues: {
      work: "",
    },
  });

  async function onSubmit(values: CreateWorkReportType) {
    const res = await UpdateWorkReport(values, _id);
    if (res) {
      toast({
        title: "Work Report Updated Successfully",
      });
    }
  }

  return (
    <div className="p-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-[5px]">
            <Pencil /> Update Work
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Work Report</DialogTitle>
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
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWorkReport;
