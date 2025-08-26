import { useState } from "react";

function ModalForm({ setModalOpen, fetchTransactions }) {
  const [inputError, setInputError] = useState("");
  const [transaction, setTransaction] = useState({
    transactionDate: "",
    accountNumber: "",
    accountHolderName: "",
    amount: "",
  });

  const handleOnChangeTransactionData = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !transaction.transactionDate ||
      !transaction.accountNumber ||
      !transaction.accountHolderName ||
      !transaction.amount
    ) {
      setInputError("All fields are required");
      return;
    } else if (
      !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(
        transaction.transactionDate
      )
    ) {
      setInputError("Invalid date format. Please use YYYY-MM-DD format.");
      return;
    } else if (!/^\d{4}-\d{4}-\d{4}$/.test(transaction.accountNumber)) {
      setInputError(
        "Invalid account number format. Please use XXXX-XXXX-XXXX format."
      );
      return;
    } else if (transaction.amount <= 0) {
      setInputError("Invalid amount. Please enter a positive number.");
      return;
    }
    setInputError("");
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add transaction. Please try again.");
      }

      const data = await res.json();
      setModalOpen(false);
      fetchTransactions();
    } catch (error) {
      setInputError(error.message);
      return;
    }
  };
  return (
    <div className="flex fixed inset-0 items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="flex justify-center text-xl font-semibold">
          NEW TRANSACTION
        </h1>
        <div className="flex flex-col justify-center space-y-4 mt-4">
          <input
            name="transactionDate"
            className="border text-base lg:text-xl xl:text-2xl border-gray-300 rounded p-2"
            placeholder="Transaction Date"
            value={transaction.transactionDate}
            onChange={handleOnChangeTransactionData}
          />
          <input
            name="accountNumber"
            className="border text-base lg:text-xl xl:text-2xl border-gray-300 rounded p-2"
            placeholder="Account Number"
            value={transaction.accountNumber}
            onChange={handleOnChangeTransactionData}
          />
          <input
            name="accountHolderName"
            type="text"
            className="border text-base lg:text-xl xl:text-2xl border-gray-300 rounded p-2"
            placeholder="Account Holder Name"
            value={transaction.accountHolderName}
            onChange={handleOnChangeTransactionData}
          />
          <input
            type="number"
            name="amount"
            step="any"
            min="0"
            className="border text-base lg:text-xl xl:text-2xl border-gray-300 rounded p-2"
            placeholder="Amount"
            value={transaction.amount}
            onChange={handleOnChangeTransactionData}
          />
          <button
            type="button"
            className="items-center bg-blue-500 text-white rounded text-lg lg:text-2xl px-4 py-2 cursor-pointer hover:bg-blue-600 active:bg-blue-700"
            onClick={handleSubmit}
          >
            Add Transaction
          </button>
          <button
            type="button"
            className="items-center bg-red-500 text-white rounded text-lg lg:text-2xl px-4 py-2 cursor-pointer hover:bg-red-600 active:bg-red-700"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          {inputError && (
            <p className="text-red-500 text-sm lg:text-xl text-semibold text-center font-bold">
              {inputError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
