import React from "react";

const TermsCondition: React.FC = () => {
  return (
    <div className="flex justify-center py-10 ">
      <div className="w-full  bg-[#F5F0DC] border border-[#D6CEA9] rounded-[20px] shadow-md p-8">
        
        {/* Header */}
        <h2 className="text-[#E44D4D] text-2xl font-medium leading-150%  pb-5">
          Terms & Condition
        </h2>
<hr className="border border-[#B7B6B6] mb-5"/>
        {/* Scrollable Content */}
        <div className=" overflow-y-auto pr-3 text-[#4A4A4A] leading-7 space-y-6">
          <p>
            Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci.
            Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis
            aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis
            habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan
            vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse
            convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis
            convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa
            donec mauris. Sem morbi morbi posuere faucibus.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci.
            Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis
            aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis
            habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan
            vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse
            convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis
            convallis arcu enim tortor.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci.
            Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis
            aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis
            habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan
            vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse
            convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis
            convallis arcu enim tortor. Ut vitae blandit pulvinar fermentum in id
            sed.
          </p>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-[#EE4D47] w-[300px] hover:bg-[#d63d37] text-white px-8 py-3 rounded-full text-lg font-medium transition-all">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
