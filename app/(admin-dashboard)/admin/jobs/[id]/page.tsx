import JobDetails from "../../_components/JobDetails";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params;
  return (
    <div>
      <JobDetails id={id} />
    </div>
  )
}