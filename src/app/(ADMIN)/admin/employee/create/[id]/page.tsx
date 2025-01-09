import CreateEmployeeForm from "@/components/forms/CreateEmployeeForm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;

  return <CreateEmployeeForm _id={_id} />;
};

export default Page;
