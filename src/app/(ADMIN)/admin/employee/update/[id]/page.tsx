import UpdateEmployeeForm from "@/components/forms/UpdateEmployeeForm";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  return (
    <div>
      <h1>Update Employee Details {_id}</h1>
      <UpdateEmployeeForm />
    </div>
  );
};

export default page;
