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

export default function AvailablePromoters() {
  const [promoters, setPromoters] = useState([]);

  useEffect(() => {
    const promotersData = axios
      .get("/api/getPromoterData")
      .then(({ data: { promoters } }) => {
        setPromoters(promoters || []);
      })
      .then(() => {
        console.log(promotersData);
      });
  }, []);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(promoters.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return promoters.slice(start, end);
  }, [page, promoters]);

  return (
    <div>
      <h1 className="flex text-4xl pt-14 mb-8 font-medium text-slate-800 text-center justify-center">
        Available Promoters
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
        <TableHeader aria-label="table">
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="dob">Date of Birth</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="mobile">Phone</TableColumn>
          <TableColumn key="totalShareValue">Total Share Value</TableColumn>
          <TableColumn key="shareNominalHold">Share Nominal Hold</TableColumn>
          <TableColumn key="shareNominalValue">Share Nominal Value</TableColumn>
          <TableColumn key="bankName">Bank Name</TableColumn>
          <TableColumn key="accountNumber">Account Number</TableColumn>
          <TableColumn key="ifsc">IFSC</TableColumn>
        </TableHeader>
        <TableBody items={promoters} aria-label="table">
          {(item) => (
            <TableRow key={item.aadhaar}>
              <TableCell>
                {item.firstName} {item.lastName}
              </TableCell>
              <TableCell>{new Date(item.dob).toLocaleDateString()}</TableCell>
              <TableCell> {item.email}</TableCell>
              <TableCell>{item.mobile}</TableCell>
              <TableCell>{item.totalShareValue}</TableCell>
              <TableCell>{item.shareNominalHold}</TableCell>
              <TableCell>{item.shareNominalValue}</TableCell>
              <TableCell>{item.bankName}</TableCell>
              <TableCell>{item.accountNumber}</TableCell>
              <TableCell>{item.ifsc}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
