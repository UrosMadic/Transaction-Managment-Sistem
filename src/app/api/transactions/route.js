// API route to read transactions.csv and return as JSON
import { promises as fs } from "fs";
import path from "path";

const csvPath = path.join(process.cwd(), "public", "data", "transactions.csv");

const transactionStatuses = ["Pending", "Settled", "Failed"];

function getRandomStatus() {
  const randomIndex = Math.floor(Math.random() * transactionStatuses.length);
  return transactionStatuses[randomIndex];
}

function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const transaction = {};
    headers.forEach((header, index) => {
      transaction[header.trim()] = values[index]?.trim() || "";
    });
    return transaction;
  });
}

export async function GET() {
  try {
    const csv = await fs.readFile(csvPath, "utf-8");
    const data = parseCSV(csv);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const transaction = await req.json();
    const newTransaction = {
      transactionDate: transaction.transactionDate,
      accountNumber: transaction.accountNumber,
      accountHolderName: transaction.accountHolderName,
      amount: parseFloat(transaction.amount).toFixed(2).toString(),
      status: getRandomStatus(),
    };

    const csvLine = `${newTransaction.transactionDate},${newTransaction.accountNumber},${newTransaction.accountHolderName},${newTransaction.amount},${newTransaction.status}\n`;
    await fs.appendFile(csvPath, csvLine);
    return new Response(JSON.stringify(newTransaction), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
