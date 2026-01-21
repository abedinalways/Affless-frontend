"use client";

interface ReviewItem {
  stars: number;
  count: number;
}

interface ReviewBreakdownProps {
  reviewe: ReviewItem[];
  title?: string;
}

export default function ReviewBreakdown({
  reviewe,
  title = "Reviews",
}: ReviewBreakdownProps) {
  const totalReviews = reviewe.reduce(
    (sum, review) => sum + review.count,
    0
  );

  return (
    <div className="bg-white rounded-2xl">
      <div className="rounded-xl p-6 mt-10 mx-w-md lg:max-w-lg">
        <h2 className="text-xl font-medium text-[18px] lg:text-[24px] pb-6">
          {totalReviews.toLocaleString()} {title}
        </h2>

        <div className="space-y-4">
          {reviewe.map((r) => (
            <div key={r.stars} className="flex items-center gap-4">
              <span className="w-16">{r.stars} Stars</span>

              <div className="flex-1 bg-gray-200 h-2 rounded-full">
                <div
                  className="h-full bg-red-400 rounded-full"
                  style={{
                    width: `${(r.count / totalReviews) * 100}%`,
                  }}
                />
              </div>

              <span className="text-gray-600 text-sm">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
