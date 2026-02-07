"use client"
import React from "react";
import { useState } from "react";
import ConfirmationPopup from "../shared/ConfirmationPopup";
type StatCardProps = {
  amount: string;
  label: string;
  buttonText?: string;
  onClick?: () => void;
};

const StatCard: React.FC<StatCardProps> = ({
  amount,
  label,
  buttonText,
  onClick,
}) => {
  const numericAmount = Number(amount.replace(/[^0-9.-]/g, ""));
  return (
    <div className=" rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex justify-center items-center">
      <div className="">
        <h2 className="text-3xl font-semibold text-gray-900">${numericAmount.toFixed(2)}</h2>
      <p className="mt-1 text-sm text-gray-500">{label}</p>

      {buttonText && (
        <button
          onClick={onClick}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition cursor-pointer"
        >
          {buttonText}
          <span>↗</span>
        </button>
      )}
      </div>
    </div>
  );
};

const StatsCards = () => {
  const [isWithdrawPopupOpen, setIsWithdrawPopupOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        amount="$6,712"
        label="Available for Withdrawal"
        buttonText="Withdraw"
        onClick={() => setIsWithdrawPopupOpen(true)}
      />

      <StatCard
        amount="$4,250"
        label="Pending Earnings"
      />

      <StatCard
        amount="$35,800"
        label="Total Earnings"
      />
      <ConfirmationPopup 
        isOpen={isWithdrawPopupOpen}
        onCancel={() => setIsWithdrawPopupOpen(false)}
        title="Withdrawals coming soon"
        description="Withdrawal is not available at the moment. This feature will be available in future updates."
        onConfirm={() => {
          setIsWithdrawPopupOpen(false);
        }}
        confirmText="Ok"
        cancelText="Cancel"
      />
    </div>
  );
};

export default StatsCards;
