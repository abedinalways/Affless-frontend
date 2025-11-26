import Image from "next/image";
import { notFound } from "next/navigation";
import { stories } from "../data";

export default async function StoryDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  const storyId = parseInt(id);

  const story = stories.find((s) => s.id === storyId);

  if (!story) return notFound();

  return (
    <div className="containers mx-auto py-16">
      {/* Back Button */}
      
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Image
          src={story.image}
          alt={story.name}
          width={600}
          height={400}
          className="rounded-xl shadow-lg w-full"
        />

        <div>
          <h1 className="text-[#333] font-poppins text-[40px] font-semibold leading-[120%] mb-2">
            {story.name}
          </h1>

          <p className="text-[#777] text-[18px] font-poppins mb-4">
            {story.role} • {story.country}
          </p>

          <p className="text-[#4A4C56] font-poppins text-[16px] leading-[150%]">
            {story.description}
          </p>

          <div className="mt-6 bg-gray-100 p-5 rounded-xl">
            <p className="text-gray-700">Type: {story.type}</p>
            <p className="text-gray-700">Category: {story.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
