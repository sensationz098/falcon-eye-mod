"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmployeeSchema, EmployeeSchemaType } from "@/types";
import { format } from "date-fns";
import { IndianStates } from "@/constant";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addEmployeeAction } from "@/server/ADMIN/serverActions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const CreateEmployeeForm = ({ _id }: { _id: string }) => {
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm<EmployeeSchemaType>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      date_of_birth: "",
      employee_id: "",
      name: "",
      email: "",
      gender: "MALE",
      primary_contact: "",
      emergency_contact_1: "",
      emergency_contact_2: "",
      aadhar_no: "",
      PAN_no: "",
      address: "",
      branch: "",
      city: "New Delhi",
      country: "India",
      department: "",
      designation: "",
      employement_type: "FULL_TIME",
    },
  });

  async function onSubmit(values: EmployeeSchemaType) {
    const res = await addEmployeeAction({ values, _id });

    if (res.status) {
      toast({
        title: res.message,
      });

      setTimeout(() => {
        push("/admin/employee");
      }, 1500);
    } else {
      toast({
        title: res.error,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* employee name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                  <Input placeholder="employee name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example@example.com"
                    required
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Employee Id  */}
          <FormField
            control={form.control}
            name="employee_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input placeholder="employee ID" {...field} />
                </FormControl>
                <FormDescription className="text-red-500">
                  This employee ID is so crucial for attendence tracking
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* date of birth */}
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => {
              const formattedDate = field.value || "";

              return (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="date of birth"
                      type="date"
                      {...field}
                      value={formattedDate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* primary contact */}
          <FormField
            control={form.control}
            name="primary_contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Contact</FormLabel>
                <FormControl>
                  <Input placeholder="primary contact" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* emergency contact 1 */}
          <FormField
            control={form.control}
            name="emergency_contact_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact 1</FormLabel>
                <FormControl>
                  <Input placeholder="Emergency contact 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* emergency contact 2 */}
          <FormField
            control={form.control}
            name="emergency_contact_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact 2</FormLabel>
                <FormControl>
                  <Input placeholder="Emergency contact 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* city */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {IndianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* aadhar card */}
          <FormField
            control={form.control}
            name="aadhar_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhar No</FormLabel>
                <FormControl>
                  <Input placeholder="1234 1234 1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PAN no */}
          <FormField
            control={form.control}
            name="PAN_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permanent Address Number (PAN)</FormLabel>
                <FormControl>
                  <Input placeholder="ABCDE1234F" {...field} />
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
                  <Input placeholder="Enter Branch" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* designation */}
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Designation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* department */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Department" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* date of joining */}
          <FormField
            control={form.control}
            name="date_of_joining"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Joining </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      //   disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* employement type */}
          <FormField
            control={form.control}
            name="employement_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employement Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                    <SelectItem value="TEMPORARY">Temporary</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateEmployeeForm;
