import React from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // If modal is not open, return null

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg text-center shadow-xl w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-t-8 border-t-red-500 border-gray-200 rounded-full w-16 h-16 mx-auto animate-spin"></div>
        <h2 className="mt-4 text-xl font-semibold">Processing your payment Securely..</h2>
        <p className="mt-2 text-gray-600">Please wait while we confirm your transaction</p>
      </div>
    </div>
  );
};

export default PaymentModal;
