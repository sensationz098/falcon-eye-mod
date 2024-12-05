import EmployeeForm from "@/components/forms/EmployeeForm";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  return (
    <div>
      <h1>page {_id}</h1>
      <EmployeeForm _id={_id} />
    </div>
  );
};

export default page;
