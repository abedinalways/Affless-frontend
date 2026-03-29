import Messages from "../_components/Messages";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params;
  return (
    <div className="grid grid-cols-1 w-full h-full">
      <Messages id={id} />
    </div>
  )
}