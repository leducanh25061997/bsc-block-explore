import { useEffect, useRef, useState } from "react";

export default function GuideModal() {
  const [open, setOpen] = useState(true); // luôn mở khi load trang
  const modalRef = useRef<HTMLDivElement>(null);

  // đóng modal
  const handleClose = () => setOpen(false);

  // click outside để đóng
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
    >
      <div
        ref={modalRef}
        // className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-xl animate-scaleIn"
        className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-xl animate-scaleIn max-h-[85vh] overflow-y-auto sm:max-h-[90vh]"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 text-black">Operating Mechanism</h1>
        <div className="text-gray-600 leading-relaxed">
          <h3><span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Method 1:</span> Perform transactions to earn rewards (Reward Transactions) — Profit: 1% per day</h3>
          <h3 className="ml-4 mt-4">* From 7:00 AM to 7:00 PM, register a transaction package.
            Select a block on the block explorer page → Specify the amount of BNB to be traded → Click Register.
          </h3>
          <h3 className="ml-4 mt-2">* From 7:00 PM to 7:00 AM, execute the transaction.
            Transfer the registered amount of BNB as previously set, and receive BM tokens as transaction rewards.</h3>
          <h3 className="mt-4"><span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Method 2:</span> Swap BNB to BM tokens for mining — Mining reward: 1.5% per day</h3>
          <h3 className="ml-4 mt-2">* On the Swap Tokens page, users can directly swap BNB → BM tokens to start staking and earn rewards immediately.</h3>
          <h3 className="ml-4 mt-2">* Users can convert BM tokens back to BNB directly, or stake BM tokens to earn additional rewards.</h3>
          <h3 className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-4">Affiliate Rewards</h3>
          Users can earn up to 30% BM token rewards from the activities of referred users.
        </div>
      </div>
    </div>
  );
}
