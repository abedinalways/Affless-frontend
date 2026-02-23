"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

type propType = {
  btnText: string;
}

export default function BudgetPage({ btnText }: propType) {

  const handleAddWishlist = () => {
    console.log("Added to wishlist");
    toast.success("Added to wishlist");
  }

  return (
    <div className="w-full grid sm:grid-cols-[1fr_1fr] lg:grid-cols-1 mx-auto  gap-6 ]">

      {/* Budget Box */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 text-center space-y-4 ">
        <h2 className="text-lg font-bold text-[#4A4C56]">Budget</h2>

        <p className="text-[30px] log:text-[40px] font-bold text-gray-900">$350</p>

        {/* Wishlist Button */}
        {/* <button onClick={handleAddWishlist} className="w-full border border-red-300 text-red-500 py-4 rounded-lg text-lg font-normal text-[16px] hover:bg-[#FF4D4F] hover:text-white cursor-pointer transition">
          Add to Wishlist
        </button> */}

        {/* Project Info */}
        <div className="bg-gray-50  text- rounded-2xl p-4 mt-4">
          <InfoRow label="Project Duration:" value="1–5 Days" />
          <InfoRow label="Project Level:" value="Expensive" />
          <InfoRow label="Languages:" value="French" />
          <InfoRow label="English Level:" value="Native" />
        </div>
      </div>

      {/* About Client */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 border">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-900">
            About Client
          </h2>

          {/* Buyer Avatar */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border">
              <Link href="/client-profile/1">
                <Image
                  src="/images/jerome.png"
                  alt="Buyer"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </Link>
            </div>

            <Link href="/client-profile/1" className="text-lg font-semibold">Bessie Cooper</Link>

            {/* Small Badge Icons */}
            <div className="flex items-center gap-2 mt-2">
              <Image src="/images/coper1.png" alt="img" width={30} height={30}></Image>
              {/* <Image src="/images/coper2.png" alt="img" width={30} height={30}></Image>
              <Image src="/images/coper3.png" alt="img" width={30} height={30}></Image> */}
            </div>
          </div>

          {/* Buyer Info */}
          <div className="bg-gray-50 border rounded-2xl p-4 mt-4">
            <InfoRow label="Total Jobs Posted:" value="50" />
            <InfoRow label="Hire Rate (%):" value="80%" />
            <InfoRow label="Average Response Time:" value="30 mins" />
            <InfoRow label="Location:" value="Australia" />
            <InfoRow label="Member Since:" value="January, 2020" />
          </div>
        </div>

        {/* Chat Button */}
        <Link href="/editor/message?id=1" className="w-full block text-center bg-red-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition">
          {btnText}
        </Link>
      </div>
    </div>
  );
}

/* Reusable row */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-[#4A6375] font-medium text-[16px] leading-150%">{value}</span>
    </div>
  );
}
