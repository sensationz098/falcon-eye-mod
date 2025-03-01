"use client";

import { CreateSalaySchema, CreateSalarySchemaType } from "@/types";
import { createPayrollAction } from "@/server/ADMIN/serverActions";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CreatePayroll = ({ id }: { id: string }) => {
  const { toast } = useToast();

  const form = useForm<CreateSalarySchemaType>({
    resolver: zodResolver(CreateSalaySchema),
    defaultValues: {
      basic_salary: 0,
      convenience: 0,
      deducation: 0,
      HRA: 0,
      medical: 0,
      other_allowences: 0,
    },
  });

  async function onSubmit(values: CreateSalarySchemaType) {
    const res = await createPayrollAction({ values, id });

    if (res.status) {
      toast({
        title: res.message,
      });
    } else {
      toast({
        title: res.error,
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Payroll</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Payroll Information</DialogTitle>
            <DialogDescription asChild>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="basic_salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Basic Salary</FormLabel>
                        <FormControl>
                          <Input placeholder="basic salary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* HRA  */}
                  <FormField
                    control={form.control}
                    name="HRA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>House Rental Allowences (HRA)</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* medical */}
                  <FormField
                    control={form.control}
                    name="medical"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical deducation</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* convenience */}
                  <FormField
                    control={form.control}
                    name="convenience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Convenice</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* other_allowences */}
                  <FormField
                    control={form.control}
                    name="other_allowences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Allowences</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* deducations */}
                  <FormField
                    control={form.control}
                    name="deducation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deducation</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
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

export default CreatePayroll;
