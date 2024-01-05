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

export default function AvailableBankAccounts() {
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    axios.get("/api/getBankAccounts").then(({ data: { bankAccounts } }) => {
      setBankAccounts(bankAccounts || []);
    });
  }, []);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(bankAccounts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return bankAccounts.slice(start, end);
  }, [page, bankAccounts]);

  return (
    <div>
      <h1 className="flex text-4xl pt-14 mb-8 font-medium text-slate-800 text-center justify-center">
        Available Bank Accounts
      </h1>

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
          <TableColumn key="accountopeningdate">
            Account Opening Date
          </TableColumn>
          <TableColumn key="bankName">Bank Name</TableColumn>
          <TableColumn key="accountNumber">Account Number</TableColumn>
          <TableColumn key="ifsc">IFSC</TableColumn>
          <TableColumn key="branch">Branch</TableColumn>
          <TableColumn key="accountType">Account Type</TableColumn>
          <TableColumn key="address">Address</TableColumn>
        </TableHeader>
        <TableBody items={bankAccounts}>
          {(item) => (
            <TableRow key={item.accountNumber}>
              <TableCell>
                {new Date(item.accountopeningdate).toLocaleDateString()}
              </TableCell>
              <TableCell>{item.bankName}</TableCell>
              <TableCell>{item.accountNumber}</TableCell>
              <TableCell>{item.ifsc}</TableCell>
              <TableCell>{item.branch}</TableCell>
              <TableCell>{item.accountType}</TableCell>
              <TableCell>{item.address}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
