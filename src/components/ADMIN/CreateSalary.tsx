"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CreateSalarySchemaType, CreateSalaySchema } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createSalary } from "@/server/action";
const CreateSalary = ({ _id }: { _id: string }) => {
  const form = useForm<CreateSalarySchemaType>({
    resolver: zodResolver(CreateSalaySchema),
    defaultValues: {
      basic_salary: "",
      HRA: "0",
      medical: "0",
      convenience: "0",
      other_allowences: "0",
      deducation: "0",
    },
  });

  async function onSubmit(values: CreateSalarySchemaType) {
    await createSalary(values, _id);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>create payroll</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Payroll</DialogTitle>
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
                        <Input placeholder="shadcn" {...field} />
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

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSalary;
