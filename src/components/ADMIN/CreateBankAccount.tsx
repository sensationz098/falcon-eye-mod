"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { BankAccountSchema, CreateBankAccountSchemaType } from "@/types";
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
import { CreateBankAccountAction } from "@/server/action";
import { useToast } from "@/hooks/use-toast";

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
      payID: id,
    },
  });

  async function onSubmit(values: CreateBankAccountSchemaType) {
    const res = await CreateBankAccountAction(values);

    if (res.status) {
      toast({ title: res.message });
    } else {
      toast({ title: res?.error, variant: "destructive" });
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-[5px]">Create Bank</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Bank Account</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* bank account holder name */}
                <FormField
                  control={form.control}
                  name="account_holder_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Account Holder Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="account holder name"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Account numebr  */}
                <FormField
                  control={form.control}
                  name="account_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account no</FormLabel>
                      <FormControl>
                        <Input placeholder="************" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* bank name  */}
                <FormField
                  control={form.control}
                  name="bank_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="bank name" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* branch */}
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch</FormLabel>
                      <FormControl>
                        <Input placeholder="branch name" required {...field} />
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
                        <Input placeholder="IFSC code" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <DialogClose asChild>
                    <Button
                      variant={"secondary"}
                      type="reset"
                      className="rounded-[5px]"
                    >
                      Reset
                    </Button>
                  </DialogClose>

                  <DialogClose asChild>
                    <Button type="submit" className="rounded-[5px]">
                      Submit
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBankAccount;
