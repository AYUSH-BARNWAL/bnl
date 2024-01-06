"use client";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

// const columns = [
//   {
//     key: "transactionNumber",
//     label: "Transaction Number",
//   },
//   {
//     key: "transactionType",
//     label: "Transaction Type",
//   },
//   {
//     key: "transactionDate",
//     label: "Transaction Date",
//   },
//   {
//     key: "amount",
//     label: "Amount",
//   },
//   {
//     key: "membershipNumber",
//     label: "Membership Number",
//   },
//   {
//     key: "customerAccountNumber",
//     label: "Customer Account Number",
//   },
//   {
//     key: "balance",
//     label: "Balance",
//   },
//   {
//     key: "particular",
//     label: "Particular",
//   },
// ];
const columns = [
  {
    key: "transactionNumber",
    label: "Transaction Number",
  },
  {
    key: "transactionType",
    label: "Transaction Type",
  },
  {
    key: "transactionDate",
    label: "Transaction Date",
  },
  {
    key: "amount",
    label: "Amount",
  },
  {
    key: "membershipNumber",
    label: "Membership Number",
  },
  {
    key: "customerAccountNumber",
    label: "Customer Account Number",
  },
  {
    key: "paymode",
    label: "Payment Mode",
  },
  {
    key: "bank_id",
    label: "Bank ID",
  },
  {
    key: "balance",
    label: "Balance",
  },
  {
    key: "particular",
    label: "Particular",
  },
];

export default function CashbookPage() {
  const [book, setBook] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [isCashbookSelected, setCashbookSelected] = useState(false);
  const [isBankbookSelected, setBankbookSelected] = useState(false);

  const handleCashbookClick = () => {
    setCashbookSelected((prev) => !prev);
  };

  const handleBankbookClick = () => {
    setBankbookSelected((prev) => !prev);
  };

  useEffect(() => {
    axios.get("/api/getTransactions").then(({ data: { transactions } }) => {
      setBook(transactions || []);
    });
  }, []);

  const getKeyValue = (item, key) => {
    if (item && key && Object.prototype.hasOwnProperty.call(item, key)) {
      return item[key];
    }
    return ""; // or provide a default value based on your requirements
  };

  return (
    <div>
      <h1 className="flex text-3xl pt-8 font-medium text-slate-800 ml-16">
        Transaction Book
      </h1>
      <div className="flex justify-center gap-20 mb-4 -mt-5">
        <Button
          onClick={handleCashbookClick}
          color={isCashbookSelected ? "primary" : "default"}
        >
          Cashbook
        </Button>
        <Button
          onClick={handleBankbookClick}
          color={isBankbookSelected ? "primary" : "default"}
        >
          Bankbook
        </Button>
      </div>
      <Table aria-label="transaction book">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={book}>
          {(item) => (
            <TableRow key={item.transactionNumber}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
