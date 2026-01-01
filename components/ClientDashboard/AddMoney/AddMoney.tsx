"use client";

import { useMemo, useState } from "react";
import { Calendar, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Step = "BALANCE" | "ADD_MONEY" | "PAYMENT";

export default function AddMoney() {
  const [step, setStep] = useState<Step>("BALANCE");

  // Demo balance
  const balance = 0;

  // Amount state
  const [amount, setAmount] = useState<number>(0);
  const quickAmounts = useMemo(() => [50, 100, 200, 500], []);

  // Payment form states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holder, setHolder] = useState("");

  // validations
  const canGoPayment = amount > 0;
  const canPay =
    amount > 0 &&
    cardNumber.trim().length >= 12 &&
    expiry.trim().length >= 4 &&
    cvc.trim().length >= 3 &&
    holder.trim().length >= 2;

  return (
    <div className=" bg-[#F8F8F8] py-10">
      <Toaster />
      <div className="mx-auto w-full max-w-[860px] space-y-8 px-4">

        {/* STEP: BALANCE */}
        {step === "BALANCE" && (
          <>
            <SectionHeader title="Your Balance" subtitle="" />
            <Panel>
              <BalanceStep
                balance={balance}
                onAddMoney={() => setStep("ADD_MONEY")}
              />
            </Panel>
          </>
        )}

        {/* STEP: ADD MONEY */}
        {step === "ADD_MONEY" && (
          <>
            <SectionHeader title="Add Money" subtitle="Enter amount to add" />
            <Panel>
              <AddMoneyStep
                amount={amount}
                setAmount={setAmount}
                quickAmounts={quickAmounts}
                canGoPayment={canGoPayment}
                onNext={() => setStep("PAYMENT")}
                onBack={() => setStep("BALANCE")}
              />
            </Panel>
          </>
        )}

        {/* STEP: PAYMENT METHOD */}
        {step === "PAYMENT" && (
          <>
            <SectionHeader
              title="Payment Method"
              subtitle={`Select how to pay ${amount.toFixed(2)}`}
            />
            <Panel>
              <PaymentMethodStep
                amount={amount}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                expiry={expiry}
                setExpiry={setExpiry}
                cvc={cvc}
                setCvc={setCvc}
                holder={holder}
                setHolder={setHolder}
                canPay={canPay}
                onBack={() => setStep("ADD_MONEY")}
                onPay={() => {
                  toast.success(`Paid $${amount.toFixed(2)} successfully!`);
                  setTimeout(() => {
                    setStep("BALANCE");
                    setAmount(0);
                    setCardNumber("");
                    setExpiry("");
                    setCvc("");
                    setHolder("");
                  }, 500);
                }}
              />
            </Panel>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- UI Blocks ---------------- */

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="w-full bg-white rounded-2xl p-8">
      <h1 className="text-[36px] font-semibold text-gray-900">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-[16px] text-gray-500">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="w-full bg-white rounded-2xl p-8">{children}</div>;
}

/* ---------------- Step Components ---------------- */

function BalanceStep({
  balance,
  onAddMoney,
}: {
  balance: number;
  onAddMoney: () => void;
}) {
  return (
    <div className="py-12 text-center">
      <div className="text-[38px] font-semibold text-gray-900">
        ${balance.toFixed(2)}
      </div>
      <div className="mt-2 text-[14px] text-gray-500">Available to spend</div>

      <button
        type="button"
        onClick={onAddMoney}
        className="mt-10 w-full h-14 rounded-xl bg-[#FF4B4B] text-white font-semibold text-[16px]
                   cursor-pointer hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Money
      </button>
    </div>
  );
}

function AddMoneyStep({
  amount,
  setAmount,
  quickAmounts,
  canGoPayment,
  onNext,
  onBack,
}: {
  amount: number;
  setAmount: (v: number) => void;
  quickAmounts: number[];
  canGoPayment: boolean;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-[15px] font-medium text-gray-800">
          Enter Amount
        </label>

        <div className="mt-3 rounded-xl border border-gray-200 bg-white px-5 py-6">
          <div className="text-[36px] font-semibold text-gray-900">
            ${amount || 0}
          </div>
        </div>
      </div>

      <div>
        <div className="text-[14px] font-medium text-gray-700">Quick Select</div>

        <div className="mt-4 flex flex-wrap gap-3">
          {quickAmounts.map((q) => {
            const active = amount === q;
            return (
              <button
                key={q}
                type="button"
                onClick={() => setAmount(q)}
                className={`min-w-[88px] h-11 rounded-lg px-4 font-medium transition
                  ${active
                    ? "bg-[#1BB7C5] text-white cursor-not-allowed"
                    : "bg-[#E9F7FA] text-gray-900 hover:opacity-90 cursor-pointer"
                  }`}
              >
                ${q}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <button
          type="button"
          disabled={!canGoPayment}
          onClick={onNext}
          className={`w-full h-14 rounded-xl font-semibold text-[16px] transition
            flex items-center justify-center gap-2
            ${!canGoPayment
              ? "bg-[#FF4B4B]/50 text-white cursor-not-allowed"
              : "bg-[#FF4B4B] text-white cursor-pointer hover:opacity-90"
            }`}
        >
          <Plus size={18} />
          Add Money
        </button>

        <button
          type="button"
          onClick={onBack}
          className="mt-3 w-full h-[50px] rounded-xl border border-gray-200 text-gray-700
                     font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}

function PaymentMethodStep({
  amount,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvc,
  setCvc,
  holder,
  setHolder,
  canPay,
  onBack,
  onPay,
}: {
  amount: number;
  cardNumber: string;
  setCardNumber: (v: string) => void;
  expiry: string;
  setExpiry: (v: string) => void;
  cvc: string;
  setCvc: (v: string) => void;
  holder: string;
  setHolder: (v: string) => void;
  canPay: boolean;
  onBack: () => void;
  onPay: () => void;
}) {
  return (
    <div className="space-y-6">
      <Field label="Card Number">
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="w-full h-12 rounded-lg border border-gray-300 px-4 outline-none focus:border-gray-400"
        />
      </Field>

      <Field label="Expiry Date">
        <div className="relative">
          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM / YY"
            className="w-full h-12 rounded-lg border border-gray-300 px-4 pr-12 outline-none focus:border-gray-400"
          />
          <Calendar
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </Field>

      <Field label="CVC / CVV">
        <input
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          placeholder="123"
          className="w-full h-12 rounded-lg border border-gray-300 px-4 outline-none focus:border-gray-400"
        />
      </Field>

      <Field label="Card holder Name">
        <input
          value={holder}
          onChange={(e) => setHolder(e.target.value)}
          placeholder="John Doe"
          className="w-full h-12 rounded-lg border border-gray-300 px-4 outline-none focus:border-gray-400"
        />
      </Field>

      <button
        type="button"
        disabled={!canPay}
        onClick={onPay}
        className={`w-full h-14 rounded-xl font-semibold text-[16px] transition
          ${!canPay
            ? "bg-[#FF4B4B]/50 text-white cursor-not-allowed"
            : "bg-[#FF4B4B] text-white cursor-pointer hover:opacity-90"
          }`}
      >
        Pay ${amount || 0}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full h-[50px] rounded-xl border border-gray-200 text-gray-700
                   font-medium hover:bg-gray-50 transition cursor-pointer"
      >
        Back
      </button>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[15px] font-medium text-gray-800 mb-2">{label}</div>
      {children}
    </div>
  );
}
