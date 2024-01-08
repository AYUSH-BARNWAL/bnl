"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { Radio, RadioGroup, Input } from "@nextui-org/react";

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
  const [isCashbookSelected, setCashbookSelected] = useState(false);
  const [isBankbookSelected, setBankbookSelected] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] =
    useState("transactionType");
  const [searchParams, setSearchParams] = useState({
    startDate: "",
    endDate: "",
  });

  const handleCashbookClick = () => {
    setCashbookSelected((prev) => !prev);
    setBankbookSelected(false);
  };

  const handleBankbookClick = () => {
    setBankbookSelected((prev) => !prev);
    setCashbookSelected(false);
  };

  useEffect(() => {
    axios.get("/api/getTransactions").then(({ data: { transactions } }) => {
      let filteredTransactions = transactions || [];

      if (isCashbookSelected) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) => transaction.paymode === "cash"
        );
      } else if (isBankbookSelected) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) => transaction.paymode === "online"
        );
      }

      switch (selectedFilterOption) {
        case "transactionDate":
          const startDate = new Date(searchParams.startDate);
          const endDate = new Date(searchParams.endDate);

          filteredTransactions = filteredTransactions.filter(
            (transaction) =>
              new Date(transaction.transactionDate) >= startDate &&
              new Date(transaction.transactionDate) <= endDate
          );
          break;
        // Add more cases for other radio button options

        default:
          break;
      }
      const sortedTransactions = filteredTransactions.sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      );

      // setBook(filteredTransactions);
      setBook(sortedTransactions || []);
    });
  }, [
    isCashbookSelected,
    isBankbookSelected,
    selectedFilterOption,
    searchParams,
  ]);

  const handleSearch = (param, value) => {
    setSearchParams((prev) => ({ ...prev, [param]: value }));
  };

  const getKeyValue = (item, key) => {
    // if (item && key && Object.prototype.hasOwnProperty.call(item, key)) {
    return item[key];
    // }
    // return "";
  };

  const SearchBar = ({ selectedOption, onSearch }) => {
    if (selectedOption === "transactionDate") {
      return (
        <div className="flex gap-4 ml-10">
          {/* <label className="text-sm whitespace-nowrap">Start Date:</label> */}
          <Input
            type="date"
            defaultValue={searchParams.startDate}
            className="max-w-xs"
            label="Start Date:"
            onChange={(e) => onSearch("startDate", e.target.value)}
          />
          <Input
            className="max-w-xs"
            defaultValue={searchParams.endDate}
            label="End Date:"
            type="date"
            onChange={(e) => onSearch("endDate", e.target.value)}
          />
        </div>
      );
    }
    // You can add more conditions for other search bar types here
    return null;
  };

  const FilterOptions = ({ selectedOption }) => {
    return (
      <RadioGroup
        name="filterOptions"
        label="Filter by"
        value={selectedOption}
        onValueChange={(value) => setSelectedFilterOption(value)}
        className="ml-10"
      >
        <Radio value="transactionType">Transaction Type</Radio>
        <Radio value="membershipNumber">Membership Number</Radio>
        <Radio value="accountNumber">Account Number</Radio>
        <Radio value="transactionDate">Transaction Date</Radio>
        <Radio value="transactionNumber">Transaction Number</Radio>
      </RadioGroup>
    );
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
      <FilterOptions selectedOption={selectedFilterOption} />
      <SearchBar
        selectedOption={selectedFilterOption}
        onSearch={handleSearch}
      />
      <Table aria-label="transaction book">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-center">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={book}>
          {(item) => (
            <TableRow key={item.transactionNumber}>
              {(columnKey) => (
                <TableCell className="text-sm">
                  {columnKey === "transactionDate"
                    ? new Date(item[columnKey]).toLocaleString()
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
