import { useEffect, useState } from "react";
import ModalForm from "./ModalForm";

const TransactionsForm = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await res.json();
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col mx-auto items-center justify-center w-full lg:w-5/6 2xl:w-1/2 space-y-4 p-4 shadow-sm sm:shadow-xl rounded-3xl mt-20">
      <h1 className="flex flex-col text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
        TRANSACTIONS
      </h1>
      {loading ? (
        <p className="text-gray-500 text-md md:text-lg lg:text-xl xl:text-2xl">
          Loading...
        </p>
      ) : (
        <table className="table-auto border border-collapse border-gray-300 w-full text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl overflow-y-auto list-none">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2">
                Transaction Date
              </th>
              <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2">
                Account Number
              </th>
              <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2">
                Account Holder Name
              </th>
              <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2">
                Amount
              </th>
              <th className="border border-gray-300 px-2 md:px-4 py-1 md:py-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i) => (
              <tr key={i}>
                <td className="border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2">
                  {transaction["Transaction Date"]}
                </td>
                <td className="border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2">
                  {transaction["Account Number"]}
                </td>
                <td className="border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2">
                  {transaction["Account Holder Name"]}
                </td>
                <td className="border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2">
                  {transaction["Amount"]}
                </td>
                <td
                  className={`border border-gray-300 px-1 sm:px-2 md:px-4 py-1 md:py-2 ${
                    transaction["Status"] === "Failed"
                      ? "bg-red-300"
                      : transaction["Status"] === "Settled"
                      ? "bg-green-300"
                      : transaction["Status"] === "Pending"
                      ? "bg-yellow-300"
                      : ""
                  }`}
                >
                  {transaction["Status"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!modalOpen && !loading && !error && (
        <button
          type="button"
          className="self-end bg-blue-500 text-white rounded text-sm md:text-lg lg:text-xl px-4 py-2 cursor-pointer hover:bg-blue-600 active:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Add Transaction
        </button>
      )}
      {error && (
        <p className="text-red-500 text-sm md:text-lg lg:text-2xl font-bold text-center">
          {error}
        </p>
      )}
      {modalOpen && (
        <ModalForm
          setModalOpen={setModalOpen}
          fetchTransactions={fetchTransactions}
        />
      )}
    </div>
  );
};

export default TransactionsForm;
