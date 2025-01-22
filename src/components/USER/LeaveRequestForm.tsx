"use client";

import { format, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LeaveRequestSchema, LeaveRequestSchemaType } from "@/types";
import { useSession } from "next-auth/react";
import { createLeaveRequest } from "@/server/USER/userServerActions";
import { useRouter } from "next/navigation";

const LeaveRequestForm = () => {
  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();

  const form = useForm<LeaveRequestSchemaType>({
    resolver: zodResolver(LeaveRequestSchema),
    defaultValues: {
      reason: "",
      half_day: "FIRST_HALF",
      leave_type: "CASUAL",
    },
  });

  async function onSubmit(values: LeaveRequestSchemaType) {
    const res = await createLeaveRequest(
      values,
      session.data?.user.id as string,
      session.data?.user.name as string,
    );

    if (res.status) {
      toast({
        title: res.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: res.error,
      });
    }

    router.push("/user/leave-request");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* start date */}

          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
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
                        initialFocus
                        disabled={(date) => {
                          return date < new Date();
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* end Date */}
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
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
                        initialFocus
                        disabled={(date) => {
                          return date < form.getValues("start_date");
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center">
              {form.getValues("end_date")
                ? differenceInDays(
                    form.getValues("end_date")!,
                    form.getValues("start_date"),
                  )
                : ""}
              {" days"}
            </div>
          </div>

          <div className="flex flex-col p-4">
            {/* select half day */}

            <FormField
              control={form.control}
              name="half_day"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 md:gap-4">
                  <FormLabel className="text-base">Half Day Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a half day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FIRST_HALF">
                        First Half ( Before lunch )
                      </SelectItem>
                      <SelectItem value="SECOND_HALF">
                        Second Half ( After lunch )
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* select leave type  */}
            <FormField
              control={form.control}
              name="leave_type"
              render={({ field }) => (
                <FormItem className="my-5 flex flex-col gap-2 md:gap-4">
                  <FormLabel className="text-base">Leave Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a leave type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PAID">Paid Leave</SelectItem>
                      <SelectItem value="SICK">Sick Leave</SelectItem>
                      <SelectItem value="CASUAL">Casual Leave</SelectItem>
                      <SelectItem value="MATERNITY">Maternity Leave</SelectItem>
                      <SelectItem value="SHORT">Short Leave</SelectItem>
                      <SelectItem value="OTHER">Other </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* reason for leave */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="my-4 flex flex-col gap-2 md:gap-4">
                  <FormLabel className="text-base">Reason for leave</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe reason for leave"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="reset"
              variant={"secondary"}
              className="my-5 hover:rounded-[5px]"
              onClick={() => {
                form.reset();
              }}
            >
              Reset
            </Button>

            <Button type="submit" className="my-5 hover:rounded-[5px]">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LeaveRequestForm;
