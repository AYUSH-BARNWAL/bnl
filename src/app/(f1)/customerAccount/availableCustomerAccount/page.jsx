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

  useEffect(() => {
    axios
      .get("/api/getCustomerAccounts")
      .then(({ data: { customerAccounts } }) => {
        setCustomerAccounts(customerAccounts || []);
      });
  }, []);

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
      <h1 className="flex text-4xl pt-14 mb-8 font-medium text-slate-800 text-center justify-center">
        Available Customer Accounts
      </h1>
      {/* <table>
        <thead>
          <tr>
            <th>Membership Number</th>
            <th>Member Name</th>
            <th>Account Type</th>
            <th>Scheme Code</th>
            <th>Opening Date</th>
            <th>Type of Account</th>
            <th>Nominee</th>
            <th>Balance</th>
            <th>Customer Account Number</th>
          </tr>
        </thead>
        <tbody>
          {customerAccounts.map((account) => (
            <tr key={account.customerAccountNumber}>
              <td>{account.membershipNumber}</td>
              <td>{account.memberName}</td>
              <td>{account.accountType}</td>
              <td>{account.schemeCode}</td>
              <td>{account.openingDate}</td>
              <td>{account.typeOfAccount}</td>
              <td>{account.nominee}</td>
              <td>{account.balance}</td>
              <td>{account.customerAccountNumber}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
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
          <TableColumn key="memberName">Member Name</TableColumn>
          <TableColumn key="accountType">Account Type</TableColumn>
          <TableColumn key="schemeCode">Scheme Code</TableColumn>
          <TableColumn key="openingDate">Opening Date</TableColumn>
          <TableColumn key="typeOfAccount">Type of Account</TableColumn>
          <TableColumn key="nominee">Nominee</TableColumn>
          <TableColumn key="balance">Balance</TableColumn>
          <TableColumn key="customerAccountNumber">
            Customer Account Number
          </TableColumn>
        </TableHeader>
        <TableBody items={customerAccounts}>
          {(item) => (
            <TableRow key={item.membershipNumber}>
              <TableCell>{item.membershipNumber}</TableCell>
              <TableCell>{item.memberName}</TableCell>
              <TableCell>{item.accountType}</TableCell>
              <TableCell>{item.schemeCode}</TableCell>
              <TableCell>{item.openingDate}</TableCell>
              <TableCell>{item.typeOfAccount}</TableCell>
              <TableCell>{item.nominee}</TableCell>
              <TableCell>{item.balance}</TableCell>
              <TableCell>{item.customerAccountNumber}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
