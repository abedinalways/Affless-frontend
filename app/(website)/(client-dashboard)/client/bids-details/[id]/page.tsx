import BidsDetails from '@/components/ClientEditor/BidsDetails/BidsDetails'

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params;
  return (
    <div>
      <BidsDetails id={id} />
    </div>
  )
}