import ProposalDetails from "../_component/ProposalDetails";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params;
  return (
    <div>
      <ProposalDetails id={id} />
    </div>
  )
}