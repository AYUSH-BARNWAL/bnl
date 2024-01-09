"use client";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Line from "@/components/line";
import { Button } from "@nextui-org/react";
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
const saColumns = [
  {
    key: "schemeName",
    label: "SCHEME NAME",
  },
  {
    key: "schemeCode",
    label: "SCHEME CODE",
  },
  {
    key: "minimumBalance",
    label: "MINIMUM BALANCE",
  },
  {
    key: "annualInterestRate",
    label: "ANNUAL INTEREST RATE",
  },
  {
    key: "interestPayout",
    label: "INTEREST PAYOUT",
  },
  {
    key: "serviceChargeFreq",
    label: "SERVICE CHARGE FREQ",
  },
  {
    key: "serviceCharge",
    label: "SERVICE CHARGE",
  },
  {
    key: "smsChargeFreq",
    label: "SMS CHARGE FREQ",
  },
  {
    key: "smsCharge",
    label: "SMS CHARGE",
  },
];
const fdColumns = [
  {
    key: "schemeName",
    label: "SCHEME NAME",
  },
  {
    key: "schemeCode",
    label: "SCHEME CODE",
  },
  {
    key: "minimumFdAmt",
    label: "MINIMUM FD AMOUNT",
  },
  {
    key: "fdLockInPeriod",
    label: "FD LOCK-IN PERIOD",
  },
  {
    key: "annualInterestRate",
    label: "ANNUAL INTEREST RATE",
  },
  {
    key: "interestPayoutCycle",
    label: "INTEREST PAYOUT CYCLE",
  },
  {
    key: "fdTenure",
    label: "FD TENURE",
  },
  {
    key: "cancelCharges",
    label: "CANCEL CHARGES",
  },
  {
    key: "active",
    label: "ACTIVE",
  },
  {
    key: "otherCharges",
    label: "OTHER CHARGES",
  },
];
const rdColumns = [
  {
    key: "schemeName",
    label: "SCHEME NAME",
  },
  {
    key: "schemeCode",
    label: "SCHEME CODE",
  },
  {
    key: "minimumRdAmt",
    label: "MINIMUM RD AMOUNT",
  },
  {
    key: "rdFreq",
    label: "RD FREQUENCY",
  },
  {
    key: "lockInPeriod",
    label: "LOCK-IN PERIOD",
  },
  {
    key: "annualInterestRate",
    label: "ANNUAL INTEREST RATE",
  },
  {
    key: "interestCompoundInterval",
    label: "INTEREST COMPOUND INTERVAL",
  },
  {
    key: "rdTenureMonth",
    label: "RD TENURE MONTH",
  },
  {
    key: "cancelCharges",
    label: "CANCEL CHARGES",
  },
  {
    key: "otherCharges",
    label: "OTHER CHARGES",
  },
  {
    key: "active",
    label: "ACTIVE",
  },
];

export default function AvailableSchemes() {
  const [rdSchemes, setRdSchemes] = useState([]);
  const [saSchemes, setSaSchemes] = useState([]);
  const [fdSchemes, setFdSchemes] = useState([]);
  const [schemeType, setSchemeType] = useState("SA");

  useEffect(() => {
    axios.get("/api/scheme/getRdSchemes").then(({ data: { schemes } }) => {
      setRdSchemes(schemes || []);
    });
    axios.get("/api/scheme/getSaSchemes").then(({ data: { schemes } }) => {
      setSaSchemes(schemes || []);
    });
    axios.get("/api/scheme/getFdSchemes").then(({ data: { schemes } }) => {
      setFdSchemes(schemes || []);
    });
  }, []);

  const renderTable = (type, columns, data) => {
    if (schemeType === type) {
      return (
        <Table aria-label={`Example table for ${type} schemes`}>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data}>
            {(item) => (
              <TableRow key={item.schemeCode}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
    return null;
  };

  return (
    <div>
      <h1 className="flex text-4xl mt-8 -mb-4 font-medium justify-center text-slate-800 ">
        Available Schemes
      </h1>
      <Line />
      <div className="flex justify-center gap-20 mb-4 -mt-5">
        <Button
          onClick={() => setSchemeType("SA")}
          color={schemeType === "SA" ? "primary" : "default"}
        >
          SA
        </Button>
        <Button
          onClick={() => setSchemeType("FD")}
          color={schemeType === "FD" ? "primary" : "default"}
        >
          FD
        </Button>
        <Button
          onClick={() => setSchemeType("RD")}
          color={schemeType === "RD" ? "primary" : "default"}
        >
          RD
        </Button>
      </div>
      <div>
        {renderTable("SA", saColumns, saSchemes)}
        {renderTable("FD", fdColumns, fdSchemes)}
        {renderTable("RD", rdColumns, rdSchemes)}
      </div>
    </div>
  );
}
