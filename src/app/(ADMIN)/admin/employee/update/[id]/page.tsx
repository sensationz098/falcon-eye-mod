const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;
  return (
    <div>
      <h1 className="text-3xl">{_id}</h1>
    </div>
  );
};

export default page;
