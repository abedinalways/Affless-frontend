import Messages from "../_components/Messages";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params;
  console.log("Rendering page for conversation ID:", id);
  return (
    <div className="grid grid-cols-1 w-full h-full">
      <Messages />
    </div>
  )
}