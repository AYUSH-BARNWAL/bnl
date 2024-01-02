"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import axios from "axios";
import { format } from "date-fns";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { newCustomerAccountAction } from "../actions";
import Line from "@/components/line";
import { toast } from "react-toastify";

export default function CustomerAccountPage() {
  const [loading, setLoading] = useState(false);
  const [formState, formAction] = useFormState(newCustomerAccountAction, {});
  const [fdSchemes, setFdSchemes] = useState([]);
  const [rdSchemes, setRdSchemes] = useState([]);
  const [saSchemes, setSaSchemes] = useState([]);
  const [schemeOptions, setSchemeOptions] = useState([]);
  const [cScheme, setCScheme] = useState();
  const [banks, setBanks] = useState([]);
  const [ifscOptions, setIfscOptions] = useState([]);
  const [acOptions, setAcOptions] = useState([]);
  const [cBank, setCBank] = useState();
  const [cIFSC, setCIFSC] = useState();
  const [cAN, setCAN] = useState();
  const [paymentMode, setPaymentMode] = useState("cash");
  const [accountType, setAccountType] = useState();

  const handleSchemeChange = (e) => {
    setCScheme(() => e.target.value);
    // console.log({ e });
  };

  const handleAccountTypeChange = (e) => {
    const { value } = e.target;
    setAccountType(() => value);
    setSchemeOptions(() => {
      return value == "fd"
        ? fdSchemes
        : value == "rd"
        ? rdSchemes
        : value == "sa"
        ? saSchemes
        : [];
    });
  };

  const handleBankChange = (e) => {
    setCBank(() => {
      return e.target.value;
    });
    setIfscOptions(() => {
      return banks.filter((bank) => bank.bankName == e.target.value);
    });
    setCIFSC();
    setCAN();
  };

  const handleIFSCChange = (e) => {
    setCIFSC(() => {
      return e.target.value;
    });
    setAcOptions(() => {
      return banks.filter(
        (bank) => bank.bankName == cBank && bank.ifsc == e.target.value
      );
    });
    setCAN();
  };
  const handleCANChange = (e) => {
    setCAN(() => {
      return e.target.value;
    });
  };

  const handleSubmit = () => {
    setLoading(true);
  };
  useEffect(() => {
    setLoading(false);
    axios.get("/api/scheme/getFdSchemes").then(({ data: { schemes } }) => {
      setFdSchemes(schemes || []);
    });
    axios.get("/api/scheme/getRdSchemes").then(({ data: { schemes } }) => {
      setRdSchemes(schemes || []);
    });
    axios.get("/api/scheme/getSaSchemes").then(({ data: { schemes } }) => {
      setSaSchemes(schemes || []);
    });
    axios.get("/api/getBankAccounts").then(({ data: { bankAccounts } }) => {
      setBanks(bankAccounts);
    });

    if (formState?.success) {
      toast.success("Account created successfully");
    }
    if (formState?.errorMessage) {
      toast.error(formState.errorMessage);
    }
  }, [formState]);
  return (
    <>
      <h1 className="flex text-5xl mb-8 pt-14 font-medium text-slate-800 ml-16">
        New Customer Account
      </h1>
      <Line />
      <form
        className="flex flex-col"
        action={formAction}
        onSubmit={handleSubmit}
      >
        {loading ? (
          <div className="text-center py-4">
            {/* <span className="loader"></span> */}
            <p className="text-black">Creating customer account, Please wait</p>
          </div>
        ) : (
          <div>
            <div>
              <div className="flex flex-row w-11/12 mx-auto">
                <p className="text-xl font-bold text-gray-900 w-1/3 text-left"></p>
                <div className="flex flex-col gap-10 w-full">
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Member Number"
                        labelPlacement={"outside"}
                        placeholder="Enter membership number"
                        isRequired
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="membershipNumber"
                        isInvalid={formState?.error?.membershipNumber}
                        errorMessage={formState?.error?.membershipNumber}
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Membership Name: "
                        labelPlacement={"outside"}
                        placeholder="Enter Membership Name"
                        isRequired
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="memberName"
                        isInvalid={formState?.error?.memberName}
                        errorMessage={formState?.error?.memberName}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <Select
                        label="Account Type"
                        labelPlacement={"outside"}
                        placeholder="Select Account type"
                        isRequired
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          trigger:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="accountType"
                        selectedKeys={[accountType]}
                        onChange={handleAccountTypeChange}
                        isInvalid={formState?.error?.accountType}
                        errorMessage={formState?.error?.accountType}
                      >
                        <SelectItem key={"sa"}>Saving</SelectItem>
                        <SelectItem key={"rd"}>Recurring Deposit</SelectItem>
                        <SelectItem key={"fd"}>Fixed Deposit</SelectItem>
                      </Select>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <Select
                        label="Scheme"
                        labelPlacement={"outside"}
                        isRequired
                        placeholder="Select a scheme"
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          trigger:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        items={schemeOptions}
                        name="scheme"
                        selectedKeys={[cScheme]}
                        onChange={handleSchemeChange}
                        isInvalid={formState?.error?.scheme}
                        errorMessage={formState?.error?.scheme}
                      >
                        {(scheme) => {
                          return (
                            <SelectItem key={scheme.schemeName}>
                              {`${scheme.schemeCode} - ${scheme.schemeName}`}
                            </SelectItem>
                          );
                        }}
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Opening Date"
                        labelPlacement={"outside"}
                        isRequired
                        placeholder="Enter opening date"
                        type="date"
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="openingDate"
                        defaultValue={format(new Date(), "yyyy-MM-dd")}
                        isInvalid={formState?.error?.openingDate}
                        errorMessage={formState?.error?.openingDate}
                      />
                    </div>

                    <div className="flex flex-row gap-x-4 my-5">
                      <RadioGroup
                        label="Type of Account"
                        isRequired
                        orientation={"horizontal"}
                        name="typeOfAccount"
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                        }}
                        defaultValue="single"
                        isInvalid={formState?.error?.typeOfAccount}
                        errorMessage={formState?.error?.typeOfAccount}
                      >
                        <Radio value="single">Single</Radio>
                        <Radio value="joint">Joint</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Nominee"
                        labelPlacement={"outside"}
                        isRequired
                        placeholder="Enter nominee name"
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="nominee"
                        isInvalid={formState?.error?.nominee}
                        errorMessage={formState?.error?.nominee}
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Amount deposited"
                        labelPlacement={"outside"}
                        isRequired
                        placeholder="Enter amount deposited"
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="amountDeposited"
                        type="number"
                        isInvalid={formState?.error?.amountDeposited}
                        errorMessage={formState?.error?.amountDeposited}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Transaction Date"
                        labelPlacement={"outside"}
                        isRequired
                        placeholder="Enter transaction date"
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="transactionDate"
                        type="date"
                        defaultValue={format(new Date(), "yyyy-MM-dd")}
                        isInvalid={formState?.error?.transactionDate}
                        errorMessage={formState?.error?.transactionDate}
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <RadioGroup
                        label="Payment mode"
                        isRequired
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                        }}
                        name="paymentMode"
                        defaultValue="cash"
                        orientation={"horizontal"}
                        value={paymentMode}
                        onValueChange={setPaymentMode}
                        isInvalid={formState?.error?.paymentMode}
                        errorMessage={formState?.error?.paymentMode}
                      >
                        <Radio value="cash">Cash</Radio>
                        <Radio value="cheque">Cheque</Radio>
                        <Radio value="online">Online</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                  {paymentMode == "online" ? (
                    <>
                      <div className="flex flex-row gap-24">
                        <div className="flex flex-col w-2/5">
                          <Select
                            label="Bank Name"
                            placeholder="Select a bank"
                            labelPlacement="outside"
                            isRequired={paymentMode == "online"}
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
                            items={banks}
                          >
                            {(bank) => (
                              <SelectItem
                                key={bank.bankName}
                                value={bank.bankName}
                              >
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
                            isRequired={paymentMode == "online"}
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
                                <SelectItem key={bank.ifsc}>
                                  {bank.ifsc}
                                </SelectItem>
                              );
                            }}
                          </Select>
                        </div>
                        <div className="flex flex-col w-2/5">
                          <Select
                            label="Account number"
                            placeholder="Select account number"
                            labelPlacement="outside"
                            isRequired={paymentMode == "online"}
                            classNames={{
                              label: "font-bold text-lg text-gray-700",
                              trigger:
                                "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                            }}
                            name="bankAccountNumber"
                            selectedKeys={[cAN]}
                            onChange={handleCANChange}
                            isInvalid={formState?.error?.bankAccountNumber}
                            errorMessage={formState?.error?.bankAccountNumber}
                            items={acOptions}
                          >
                            {(bank) => {
                              return (
                                <SelectItem key={bank.accountNumber}>
                                  {bank.accountNumber}
                                </SelectItem>
                              );
                            }}
                          </Select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-0 items-end self-end justify-end mb-20  mr-44 mt-16">
              <input
                onClick={() => {
                  window.location.reload();
                }}
                type="button"
                value="CANCEL"
                className=" justify-end cursor-pointer  self-end items-end mr-12 tracking-wider  text-gray-500 text-xl leading-loose font-bold"
              />
              <Button
                type="submit"
                className="bg-red-600 cursor-pointer tracking-wider font-bold w-fit justify-end self-end items-end rounded-lg shadow-xl text-gray-50 px-6 py-1.5 text-xl"
              >
                CREATE
              </Button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
