const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const _id = (await params).id;
  return <div>page</div>;
};

export default page;
