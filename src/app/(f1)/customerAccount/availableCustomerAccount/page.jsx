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

export default function AvailableCustomerAccountPage() {
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomerAccounts, setFilteredCustomerAccounts] =
    useState(customerAccounts);

  useEffect(() => {
    setCustomerAccounts(customerAccounts || []);
    setFilteredCustomerAccounts(customerAccounts || []);
  }, [customerAccounts]);

  useEffect(() => {
    axios
      .get("/api/getCustomerAccounts")
      .then(({ data: { customerAccounts } }) => {
        setCustomerAccounts(customerAccounts || []);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = customerAccounts.filter((customerAccount) => {
      const fullName = `${customerAccount.memberName}`.toLowerCase();
      const membershipNumber = String(customerAccount.membershipNumber);
      const accountNumber = String(
        customerAccount.customerAccountNumber
      ).trim();
      return (
        accountNumber.includes(query) ||
        fullName.includes(query) ||
        membershipNumber.includes(query)
      );
    });
    setFilteredCustomerAccounts(filtered);
    setPage(1);
  };

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(customerAccounts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return customerAccounts.slice(start, end);
  }, [page, customerAccounts]);

  return (
    <div>
      <div>
        <h1 className=" text-4xl pt-14  font-medium text-slate-800 text-center justify-center">
          Customer Accounts Registered
        </h1>
        <div className="flex justify-start ml-5 mb-4">
          <input
            type="text"
            placeholder="Search accounts in the list"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded-md"
          />
        </div>
      </div>
      <Table
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="membershipNumber">Membership Number</TableColumn>
          <TableColumn key="customerAccountNumber">
            Customer Account Number
          </TableColumn>
          <TableColumn key="memberName">Member Name</TableColumn>
          <TableColumn key="accountType">Account Type</TableColumn>
          <TableColumn key="schemeCode">Scheme Code</TableColumn>
          <TableColumn key="openingDate">Opening Date</TableColumn>
          <TableColumn key="typeOfAccount">Type of Account</TableColumn>
          <TableColumn key="nominee">Nominee</TableColumn>
          <TableColumn key="balance">Balance</TableColumn>
        </TableHeader>
        <TableBody items={filteredCustomerAccounts}>
          {(item) => (
            <TableRow key={item.membershipNumber}>
              <TableCell>{item.membershipNumber}</TableCell>
              <TableCell>{item.customerAccountNumber}</TableCell>
              <TableCell>{item.memberName}</TableCell>
              <TableCell>{item.accountType}</TableCell>
              <TableCell>{item.schemeCode}</TableCell>
              <TableCell>
                {new Date(item.openingDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{item.typeOfAccount}</TableCell>
              <TableCell>{item.nominee}</TableCell>
              <TableCell>{item.balance}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
