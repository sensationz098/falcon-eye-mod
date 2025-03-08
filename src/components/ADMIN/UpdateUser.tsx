"use client";
// export const dynamic = "force-dynamic";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema, UserSchemaType } from "@/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generatePassword } from "@/lib/utils";
import { updateUser } from "@/server/ADMIN/serverActions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
type userType = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};
const UpdateUser = ({ user }: { user: userType }) => {
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: generatePassword(),
      role: user.role,
    },
  });

  async function onSubmit(values: UserSchemaType) {
    const res = await updateUser(values);

    if (res.status) {
      toast({
        title: res.message,
      });

      setTimeout(() => {
        push("/admin/user");
      }, 1500);
    } else {
      toast({
        variant: "destructive",
        title: res.error,
      });
    }

    form.reset();
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-xl bg-blue-500">Update User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update new user to the system</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@ex.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"ADMIN"}>ADMIN</SelectItem>
                        <SelectItem value={"USER"}>USER</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogClose asChild>
                <Button variant={"secondary"} className="mr-3">
                  Close
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Submit</Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateUser;
