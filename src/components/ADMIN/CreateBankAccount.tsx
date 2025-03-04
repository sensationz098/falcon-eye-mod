"use client";

import { Input } from "@/components/ui/input";
import { BankAccountSchema, CreateBankAccountSchemaType } from "@/types";
import { createBankAccountDetails } from "@/server/ADMIN/serverActions";
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

const CreateBankAccount = ({ id }: { id: string }) => {
  const { toast } = useToast();

  const form = useForm<CreateBankAccountSchemaType>({
    resolver: zodResolver(BankAccountSchema),
    defaultValues: {
      account_holder_name: "",
      account_no: "",
      bank_name: "",
      branch: "",
      IFSC_code: "",
    },
  });

  async function onSubmit(values: CreateBankAccountSchemaType) {
    const res = await createBankAccountDetails({ id, values });

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
    <div className="mx-16">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Enter Bank Details</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Bank Information</DialogTitle>
            <DialogDescription asChild>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* account holder name */}
                  <FormField
                    control={form.control}
                    name="account_holder_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Account holder name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bank account no */}
                  <FormField
                    control={form.control}
                    name="account_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account No</FormLabel>
                        <FormControl>
                          <Input placeholder="bank account no" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* bank name */}
                  <FormField
                    control={form.control}
                    name="bank_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="bank name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Branch nmae */}
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                          <Input placeholder="branch name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* IFSC code */}
                  <FormField
                    control={form.control}
                    name="IFSC_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IFSC Code</FormLabel>
                        <FormControl>
                          <Input placeholder="enter ifsc code" {...field} />
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

export default CreateBankAccount;
