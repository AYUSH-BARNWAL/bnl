"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import {
  Input,
  Button,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { addPromoterAction } from "./actions";
import Line from "../components/line";

export default function addPromoterPage() {
  const [loading, setLoading] = useState(false);
  const [martial, setMartial] = useState("unmarried");
  const [formState, formAction] = useFormState(addPromoterAction, {});
  const [banks, setBanks] = useState([]);
  const [cBank, setCBank] = useState();
  const [cIFSC, setCIFSC] = useState();
  const [cAN, setCAN] = useState();
  const [share, setShare] = useState({
    shareNominalValue: 0,
    totalShareValue: 0,
    shareNominalHold: 0,
  });

  const [ifscOptions, setIfscOptions] = useState([]);
  const [acOptions, setAcOptions] = useState([]);

  const handleShareChange = (e) => {
    const { name, value } = e.target;
    setShare((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShare((pData) => {
      return {
        ...pData,
        shareNominalHold:
          pData.shareNominalValue == 0
            ? 0
            : pData.totalShareValue / pData.shareNominalValue,
      };
    });
  };

  const handleBankChange = (e) => {
    setCBank(() => {
      return e.target.value;
    });
    setIfscOptions(() => {
      return banks.filter((bank) => bank.bankname == e.target.value);
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
        (bank) => bank.bankname == cBank && bank.ifsc == e.target.value
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
    axios.get("/api/getBankAccounts").then(
      ({ data }) => {
        setBanks(() => {
          return data;
        });
      },
      (err) => {}
    );
    if (formState?.error) {
      toast.error(formState.error);
    }
    if (formState?.success) {
      toast.success(formState.success);
    }
  }, [formState]);

  return (
    <>
      <h1 className="flex text-5xl pt-28 mb-8 font-medium text-slate-800 ml-16">
        Promoter
      </h1>
      <Line />
      <form
        className="flex flex-col"
        onSubmit={handleSubmit}
        action={formAction}
      >
        {loading ? (
          <div className="text-center py-4">
            {/* <span className="loader"></span> */}
            <p className="text-black">Adding promoter, please wait . . .</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-row w-11/12 mx-auto">
              <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
                Account
              </p>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="First name"
                      labelPlacement={"outside"}
                      isRequired
                      placeholder="Enter first name"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="firstName"
                      isInvalid={formState?.error?.firstName}
                      errorMessage={formState?.error?.firstName}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Middle Name"
                      labelPlacement={"outside"}
                      placeholder="Enter middle name"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="middleName"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Last Name"
                      labelPlacement={"outside"}
                      placeholder="Enter last name"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="lastName"
                      isInvalid={formState?.error?.lastName}
                      errorMessage={formState?.error?.lastName}
                    />
                  </div>
                  <div>
                    <RadioGroup
                      label="Gender"
                      isRequired
                      orientation={"horizontal"}
                      name="gender"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                      }}
                      defaultValue="male"
                    >
                      <Radio value="male">M</Radio>
                      <Radio value="female">F</Radio>
                      <Radio value="trans">T</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Date of Birth"
                      labelPlacement={"outside"}
                      isRequired
                      placeholder="Enter DOB"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="dob"
                      type="date"
                      isInvalid={formState?.error?.dob}
                      errorMessage={formState?.error?.dob}
                    />
                  </div>
                  <div className="flex flex-col w-2/5 gap-4">
                    <RadioGroup
                      label="Martial status"
                      isRequired
                      name="martial"
                      classNames={{ label: "font-bold text-lg text-gray-700" }}
                      orientation={"horizontal"}
                      value={martial}
                      onValueChange={setMartial}
                    >
                      <Radio value="married">Married</Radio>
                      <Radio value="unmarried">Unmarried</Radio>
                    </RadioGroup>
                    <Input
                      label="Spouse name"
                      classNames={{
                        base: "mt-12",
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      placeholder="Enter Spouse name"
                      labelPlacement={"outside"}
                      isRequired={martial == "married"}
                      isDisabled={martial != "married"}
                      name="spouse"
                      isInvalid={formState?.error?.spouse}
                      errorMessage={formState?.error?.spouse}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Father's name"
                      labelPlacement={"outside"}
                      placeholder="Enter father's name"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="fatherName"
                      isInvalid={formState?.error?.fatherName}
                      errorMessage={formState?.error?.fatherName}
                    ></Input>
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Mother's name"
                      labelPlacement={"outside"}
                      placeholder="Enter mother's name"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="motherName"
                      isInvalid={formState?.error?.motherName}
                      errorMessage={formState?.error?.motherName}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
            <Line />
            <div className="flex flex-row w-11/12 mx-auto">
              <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
                Contact Details
              </p>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Email"
                      labelPlacement={"outside"}
                      isRequired
                      placeholder="Enter email"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="email"
                      type="email"
                      isInvalid={formState?.error?.email}
                      errorMessage={formState?.error?.email}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Mobile number"
                      labelPlacement={"outside"}
                      placeholder="Enter Mobile number"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="mobile"
                      isInvalid={formState?.error?.mobile}
                      errorMessage={formState?.error?.mobile}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Aadhaar number"
                      labelPlacement={"outside"}
                      placeholder="Enter Aadhaar number"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="aadhaar"
                      isInvalid={formState?.error?.aadhaar}
                      errorMessage={formState?.error?.aadhaar}
                    ></Input>
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="PAN number"
                      placeholder="Enter PAN number"
                      labelPlacement={"outside"}
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="pan"
                      isInvalid={formState?.error?.pan}
                      errorMessage={formState?.error?.pan}
                    />
                    {/* <span className="error">{getError.pan}</span> */}
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Voter ID Number"
                      placeholder="Enter voter id number"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="voter"
                      isInvalid={formState?.error?.voter}
                      errorMessage={formState?.error?.voter}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Ration Number"
                      placeholder="Enter ration number"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="ration"
                      isInvalid={formState?.error?.ration}
                      errorMessage={formState?.error?.ration}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Line />
            <div className="flex flex-row w-11/12 mx-auto">
              <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
                Address
              </p>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Area/Locality"
                      placeholder="Enter area/locality"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="area"
                      isInvalid={formState?.error?.area}
                      errorMessage={formState?.error?.area}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Landmark"
                      placeholder="Enter landmark"
                      labelPlacement="outside"
                      // isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="landmark"
                      isInvalid={formState?.error?.landmark}
                      errorMessage={formState?.error?.landmark}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Post"
                      placeholder="Enter post"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="post"
                      isInvalid={formState?.error?.post}
                      errorMessage={formState?.error?.post}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="District"
                      placeholder="Enter district"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="dist"
                      isInvalid={formState?.error?.dist}
                      errorMessage={formState?.error?.dist}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="State"
                      placeholder="Enter State"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="state"
                      isInvalid={formState?.error?.state}
                      errorMessage={formState?.error?.state}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="PIN code"
                      placeholder="Enter PIN code"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="pincode"
                      isInvalid={formState?.error?.pincode}
                      errorMessage={formState?.error?.pincode}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Line />
            <div className="flex flex-row w-11/12 mx-auto">
              <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
                Share Holding Details
              </p>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Allotment"
                      placeholder="Enter allotment date"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="allotmentDate"
                      type="date"
                      isInvalid={formState?.error?.allotmentDate}
                      errorMessage={formState?.error?.allotmentDate}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Share nominal value"
                      placeholder="0"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="shareNominalValue"
                      type="number"
                      value={share.shareNominalValue}
                      onChange={handleShareChange}
                      isInvalid={formState?.error?.shareNominalValue}
                      errorMessage={formState?.error?.shareNominalValue}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Total Share Value (in Rs.)"
                      placeholder="0"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="totalShareValue"
                      type="number"
                      value={share.totalShareValue}
                      onChange={handleShareChange}
                      isInvalid={formState?.error?.totalShareValue}
                      errorMessage={formState?.error?.totalShareValue}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Share Nominal Hold"
                      placeholder="Share Nominal Hold"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="shareNominalHold"
                      type="number"
                      value={share.shareNominalHold}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="First Distinction Number"
                      placeholder="Enter Fist Distinction Number"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="firstDistinctionNumber"
                      isInvalid={formState?.error?.firstDistinctionNumber}
                      errorMessage={formState?.error?.firstDistinctionNumber}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Last Dinction Number"
                      placeholder="Enter last dinction number"
                      labelPlacement="outside"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="lastDistinctionNumber"
                      isInvalid={formState?.error?.lastDistinctionNumber}
                      errorMessage={formState?.error?.lastDistinctionNumber}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Select
                      label="Bank Name"
                      placeholder="Select a bank"
                      labelPlacement="outside"
                      isRequired
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
                        <SelectItem key={bank.bankname} value={bank.bankname}>
                          {bank.bankname}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Select
                      label="Bank IFSC Code"
                      placeholder="Select IFSC Code"
                      labelPlacement="outside"
                      isRequired
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
                      isRequired
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
                          <SelectItem key={bank.accountnumber}>
                            {bank.accountnumber}
                          </SelectItem>
                        );
                      }}
                    </Select>
                  </div>
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
                className=" justify-end cursor-pointer self-end items-end mr-12 tracking-wider  text-gray-500 text-xl leading-loose font-bold"
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
