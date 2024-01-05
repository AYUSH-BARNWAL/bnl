"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import axios from "axios";
import {
  Input,
  Select,
  SelectItem,
  Button,
  RadioGroup,
  Radio,
  Textarea,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Line from "@/components/line";
import { transactionAction } from "./actions";
export default function TransactionPage() {
  const [formState, formAction] = useFormState(transactionAction, {});
  const [paymode, setPaymode] = useState("cash");
  const [banks, setBanks] = useState([]);
  const [cBank, setCBank] = useState();
  const [cIFSC, setCIFSC] = useState();
  const [ifscOptions, setIfscOptions] = useState([]);
  const [acOptions, setAcOptions] = useState([]);
  const [cAN, setCAN] = useState();
  const [membershipNumber, setMembershipNumber] = useState(0);
  const [customerAccounts, setCustomerAccounts] = useState([]);
  // const [selectedAccount, setSelectedAccount] = useState(new Set());
  const handleBankChange = (e) => {
    setCBank(() => {
      return e.target.value;
    });

    const ioptions = banks.filter((bank) => bank.bankName == e.target.value);
    setIfscOptions(() => {
      return ioptions;
    });
    setCIFSC();
    setCAN();
  };

  const handleIFSCChange = (e) => {
    setCIFSC(() => {
      return e.target.value;
    });
    setAcOptions(() =>
      banks.filter(
        (bank) => bank.bankName == cBank && bank.ifsc == e.target.value
      )
    );
    setCAN();
  };
  const handleCANChange = (e) => {
    setCAN(() => {
      return e.target.value;
    });
  };

  const getAccounts = () => {
    axios.post("/api/getCustomerAccounts", { membershipNumber }).then(
      ({ data: { error, errorMessage, customerAccounts: ca } }) => {
        console.log({ ca });
        setCustomerAccounts(ca || []);
        if (errorMessage) {
          toast.error(errorMessage);
        }
        // console.log({ error, errorMessage, customerAccounts });
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  useEffect(() => {
    axios.get("/api/getBankAccounts").then(
      ({ data: { bankAccounts } }) => {
        setBanks(() => bankAccounts);
      },
      (error) => {}
    );
    if (formState?.success) {
      toast.success("Transaction successful");
    }
    if (formState?.errorMessage) {
      toast.error(formState.errorMessage);
    }
  }, [formState]);

  return (
    <>
      <div className="flex text-5xl pt-14 mb-8 font-medium text-slate-800 ml-16">
        TRANSACTION
      </div>
      <Line />
      <form className="flex flex-col gap-y-8" action={formAction}>
        <div className="flex flex-row w-11/12 mx-auto">
          <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
            Personal Details
          </p>
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Membership number"
                  labelPlacement={"outside"}
                  placeholder="Enter membership number"
                  type="number"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  name="membershipNumber"
                  isInvalid={formState?.error?.membershipNumber}
                  errorMessage={formState?.error?.membershipNumber}
                  value={membershipNumber}
                  onValueChange={setMembershipNumber}
                  isRequired
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Select
                  label="Transaction type"
                  labelPlacement={"outside"}
                  isRequired
                  placeholder="Select a type"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    trigger:
                      "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  name="transactionType"
                  isInvalid={formState?.error?.transactionType}
                  errorMessage={formState?.error?.transactionType}
                >
                  <SelectItem key="credit">Deposit</SelectItem>
                  <SelectItem key="debit">Withdraw</SelectItem>
                </Select>
              </div>
            </div>
            <div className="flex gap-10 my-10">
              <Button onClick={getAccounts}>Search</Button>
              <Table
                // selectionMode="single"
                // selectedKeys={[selectedAccount]}
                // onSelectionChange={handle}
                removeWrapper
              >
                <TableHeader
                  columns={[
                    { key: "accountType", label: "Account type" },
                    { key: "customerAccountNumber", label: "Account Number" },
                    { key: "schemeCode", label: "Scheme" },
                    { key: "balance", label: "Balance" },
                  ]}
                >
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                {customerAccounts?.length != 0 ? (
                  <TableBody items={customerAccounts}>
                    {(customerAccount) => {
                      return (
                        <TableRow key={customerAccount._id}>
                          {(columnKey) => (
                            <TableCell>
                              {getKeyValue(customerAccount, columnKey)}
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    }}
                  </TableBody>
                ) : (
                  <TableBody>{[]}</TableBody>
                )}
              </Table>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Account number"
                  labelPlacement={"outside"}
                  placeholder="Enter account number"
                  isRequired
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  name="customerAccountNumber"
                  isInvalid={formState?.error?.customerAccountNumber}
                  errorMessage={formState?.error?.customerAccountNumber}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Select
                  label="Account type"
                  labelPlacement={"outside"}
                  isRequired
                  placeholder="Select account type"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    trigger:
                      "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  name="accountType"
                  isInvalid={formState?.error?.accountType}
                  errorMessage={formState?.error?.accountType}
                >
                  <SelectItem key="sa">SA</SelectItem>
                  <SelectItem key="rd">RD</SelectItem>
                  <SelectItem key="fd">FD</SelectItem>
                </Select>
              </div>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Amount"
                  labelPlacement={"outside"}
                  placeholder="Enter amount"
                  isRequired
                  type="number"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  name="amount"
                  isInvalid={formState?.error?.amount}
                  errorMessage={formState?.error?.amount}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Transaction date"
                  labelPlacement={"outside"}
                  placeholder="Enter transaction date"
                  isRequired
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  name="transactionDate"
                  isInvalid={formState?.error?.transactionDate}
                  errorMessage={formState?.error?.transactionDate}
                />
              </div>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Textarea
                  label="Remarks (if any)"
                  labelPlacement={"outside"}
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  name="particular"
                ></Textarea>
              </div>
              <div className="flex flex-col w-2/5">
                <RadioGroup
                  label="Payment mode"
                  orientation="horizontal"
                  isRequired
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                  }}
                  name="paymode"
                  value={paymode}
                  onValueChange={setPaymode}
                >
                  <Radio value="cash">Cash</Radio>
                  <Radio value="cheque">Cheque</Radio>
                  <Radio value="online">Online</Radio>
                </RadioGroup>
              </div>
            </div>
            {paymode != "online" ? (
              <></>
            ) : (
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <Select
                    label="Bank Name"
                    placeholder="Select a bank"
                    labelPlacement="outside"
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      trigger:
                        "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="bankName"
                    selectedKeys={[cBank]}
                    onChange={handleBankChange}
                    isInvalid={formState?.error?.bankName}
                    errorMessage={formState?.error?.bankName}
                    isRequired={paymode == "online"}
                    items={banks}
                  >
                    {(bank) => (
                      <SelectItem key={bank.bankName}>
                        {bank.bankName}
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <div className="flex flex-col w-2/5">
                  <Select
                    label="Bank IFSC Code"
                    placeholder="Select IFSC Code"
                    labelPlacement="outside"
                    isRequired={paymode == "online"}
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      trigger:
                        "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="ifsc"
                    selectedKeys={[cIFSC]}
                    onChange={handleIFSCChange}
                    isInvalid={formState?.error?.ifsc}
                    errorMessage={formState?.error?.ifsc}
                    items={ifscOptions}
                  >
                    {(bank) => {
                      return (
                        <SelectItem key={bank.ifsc}>{bank.ifsc}</SelectItem>
                      );
                    }}
                  </Select>
                </div>
                <div className="flex flex-col w-2/5">
                  <Select
                    label="Account number"
                    placeholder="Select account number"
                    labelPlacement="outside"
                    isRequired={paymode == "online"}
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      trigger:
                        "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="accountNumber"
                    selectedKeys={[cAN]}
                    onChange={handleCANChange}
                    isInvalid={formState?.error?.accountNumber}
                    errorMessage={formState?.error?.accountNumber}
                    items={acOptions}
                  >
                    {(bank) => {
                      return (
                        <SelectItem
                          key={bank.accountNumber}
                          // value={bank.accountnumber}
                        >
                          {bank.accountNumber}
                        </SelectItem>
                      );
                    }}
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-0 items-end self-end justify-end mr-44 mb-16 mt-16">
          {/* <input
            onClick={() => {
              // payment();
              window.location.reload();
            }}
            type="button"
            value="SUBMIT"
            className="bg-red-600 cursor-pointer tracking-wider font-bold w-fit justify-end self-end items-end rounded-lg shadow-xl text-gray-50 px-6 py-1.5 text-xl"
          /> */}
          <Button
            type="submit"
            className="bg-red-600 cursor-pointer tracking-wider font-bold w-fit justify-end self-end items-end rounded-lg shadow-xl text-gray-50 px-6 py-1.5 text-xl"
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </>
  );
}
