import UpdateEmployee from "@/components/ADMIN/UpdateEmployee";

const page = ({ _id }: { _id: string }) => {
  return (
    <div>
      <h1>page {_id}</h1>
      <UpdateEmployee id={_id} />
    </div>
  );
};

export default page;
