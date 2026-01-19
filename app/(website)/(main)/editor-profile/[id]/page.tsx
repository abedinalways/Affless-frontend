import PublicEditorProfile from "../_components/PublicEditorProfile"

export default async function page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const { id } = params
    return (
        <div>
            <PublicEditorProfile />
        </div>
    )
}