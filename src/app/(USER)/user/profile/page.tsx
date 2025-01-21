import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  // empTypes,
  formatCurrency,
  // formatNumber,
  getSession,
} from "@/lib/utils";
import { formatDate } from "date-fns";
import { getUserProfile } from "@/db/UserDbQueries";
import { User } from "lucide-react";

const page = async () => {
  const session = await getSession();
  const user = await getUserProfile({ _id: session?.user.id as string });

  // Utility function to render table rows
  const renderTableRow = (
    label: string,
    value: string | number | null | undefined,
  ) => (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell>{value || "N/A"}</TableCell>
    </TableRow>
  );

  return (
    <div className="bg-gray-900 px-4 text-white">
      <section>
        <div className="bg-gray-800">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
              {/* Personal Profile Section */}
              <div className="rounded-5xl col-span-4 sm:col-span-3">
                <div className="rounded-lg bg-gray-700 p-6 shadow">
                  <div className="flex flex-col items-center">
                    <User className="mb-4 h-32 w-32 shrink-0 rounded-full bg-gray-600" />
                    <h1 className="text-xl font-bold">{session?.user.name}</h1>
                    <p className="text-gray-300">
                      {user?.Employee?.designation}
                    </p>
                  </div>
                  <hr className="my-6 border-t border-gray-600" />
                  <p className="text-center text-gray-300">
                    {user?.Employee?.employee_id}
                  </p>
                </div>
              </div>

              {/* Employee Details Table */}
              <div className="col-span-4 sm:col-span-9">
                <div className="rounded-lg bg-gray-700 p-6 shadow">
                  <h2 className="mb-4 text-center text-2xl font-bold">
                    Personal Details
                  </h2>
                  <hr className="my-6 border-t border-gray-600" />
                  <div className="mx-auto flex w-full gap-72">
                    <div>
                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Name
                        </h3>
                        <p className="mb-2">{user?.Employee?.name}</p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Gender
                        </h3>
                        <p className="mb-2">{user?.Employee?.gender}</p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Date of Birth
                        </h3>
                        <p className="mb-2">
                          {" "}
                          {user?.Employee?.date_of_birth
                            ? formatDate(user.Employee.date_of_birth, "PPP")
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Email
                        </h3>
                        <p className="mb-2">{user?.Employee?.email}</p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Contact
                        </h3>
                        <p className="mb-2">
                          <span className="font-semibold text-gray-200">
                            Primary Contact:{" "}
                          </span>
                          {user?.Employee?.primary_contact}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold text-gray-200">
                            Emer Contact1{" "}
                          </span>
                          {user?.Employee?.emergency_contact_1}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold text-gray-200">
                            Emer Contact2{" "}
                          </span>
                          {user?.Employee?.emergency_contact_2}
                        </p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Address:
                        </h3>
                        <p className="mb-2">
                          {user?.Employee?.address}
                          {", "} {user?.Employee?.city}
                          {", "} {user?.Employee?.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative right-0 col-span-4 sm:col-span-9">
                <div className="rounded-lg bg-gray-700 p-6 shadow">
                  <h2 className="mb-4 text-center text-2xl font-bold">
                    Employee Details
                  </h2>
                  <hr className="my-6 border-t border-gray-600" />
                  <div className="mx-auto flex w-full gap-72">
                    <div>
                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Branch
                        </h3>
                        <p className="mb-2">{user?.Employee?.branch}</p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Aadhaar Number
                        </h3>
                        <p className="mb-2">{user?.Employee?.aadhar_no}</p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Date of Joining
                        </h3>
                        <p className="mb-2">
                          {" "}
                          {user?.Employee?.date_of_birth
                            ? formatDate(user.Employee.date_of_joining, "PPP")
                            : "N/A"}
                        </p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Employee Type:
                        </h3>
                        <p className="mb-2">
                          {user?.Employee?.employement_type}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Pan Number
                        </h3>
                        <p className="mb-2">{user?.Employee?.PAN_no}</p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Department
                        </h3>
                        <p className="mb-2">{user?.Employee?.department}</p>
                      </div>

                      <div className="text-medium w-full rounded-lg p-6 text-gray-400">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          Designation:
                        </h3>
                        <p className="mb-2">{user?.Employee?.designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payroll Table Section */}
        <section>
          {!user?.payroll ? (
            <h1>No Payroll Information</h1>
          ) : (
            <Table className="border dark:border-gray-600">
              <TableCaption>Payroll Information</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Information</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderTableRow(
                  "Basic Salary",
                  formatCurrency(user?.payroll?.basic_salary as number),
                )}
                {renderTableRow(
                  "HRA",
                  formatCurrency(user?.payroll?.HRA as number),
                )}
                {renderTableRow(
                  "Medical deductions",
                  formatCurrency(user?.payroll?.medical as number),
                )}
                {renderTableRow(
                  "Convenience",
                  formatCurrency(user?.payroll?.convenience as number),
                )}
                {renderTableRow(
                  "Other Allowances",
                  formatCurrency(user?.payroll?.other_allowences as number),
                )}
                {renderTableRow(
                  "Deductions",
                  formatCurrency(user?.payroll?.deducation as number),
                )}
                {renderTableRow(
                  "Gross Salary",
                  formatCurrency(user?.payroll?.gross_salary as number),
                )}
                {renderTableRow(
                  "Net Salary",
                  formatCurrency(user?.payroll?.net_salary as number),
                )}
              </TableBody>
            </Table>
          )}
        </section>

        {/* Bank Account Information */}
        <section>
          <Table className="border dark:border-gray-600">
            <TableCaption>Bank Account Information</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Information</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableRow(
                "Account Holder Name",
                user?.bank?.account_holder_name,
              )}
              {renderTableRow("Account No", user?.bank?.account_no)}
              {renderTableRow("Bank Name", user?.bank?.bank_name)}
              {renderTableRow("Branch", user?.bank?.branch)}
              {renderTableRow("IFSC Code", user?.bank?.IFSC_code)}
            </TableBody>
          </Table>
        </section>
      </section>
    </div>
  );
};

export default page;
