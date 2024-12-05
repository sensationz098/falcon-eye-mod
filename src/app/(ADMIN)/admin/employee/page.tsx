import EmployeeForm from "@/components/forms/EmployeeForm";

const page = () => {
  return (
    <div>
      <h1>create employee details </h1>

      <div>
        {/* <CreateEmployee /> */}
        <EmployeeForm />
      </div>
    </div>
  );
};

export default page;
