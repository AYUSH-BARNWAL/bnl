"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { RadioGroup, Radio, Input, Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import Line from "@/components/line";
import { fdAction } from "../actions";

export default function FDSchemePage() {
  const [loading, setLoading] = useState(false);
  const [formState, formAction] = useFormState(fdAction, {});
  const handleSubmit = () => {
    setLoading(true);
  };
  useEffect(() => {
    setLoading(false);
    if (formState?.success) {
      toast.success("Scheme added successfully");
    }
    if (formState?.errorMessage) {
      toast.error(formState.errorMessage);
    }
  }, [formState]);
  return (
    <>
      <h1 className="flex text-5xl pt-14 mb-8 font-medium text-slate-800 ml-16">
        FD Scheme Creation
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
            <p className="text-black">Creating Scheme, Please wait</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-row w-11/12 mx-auto">
              <p className="text-xl font-bold text-gray-900 w-1/3 text-left"></p>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Scheme Name"
                      labelPlacement="outside"
                      placeholder="Enter Scheme name"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="schemeName"
                      isInvalid={formState?.error?.schemeName}
                      errorMessage={formState?.error?.schemeName}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Scheme Code"
                      labelPlacement="outside"
                      placeholder="Enter Scheme code"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="schemeCode"
                      isInvalid={formState?.error?.schemeCode}
                      errorMessage={formState?.error?.schemeCode}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Min FD Amount"
                      labelPlacement="outside"
                      placeholder="Enter min FD amount"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="minimumFdAmt"
                      isInvalid={formState?.error?.minimumFdAmt}
                      errorMessage={formState?.error?.minimumFdAmt}
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Interest payout cycle"
                      labelPlacement="outside"
                      placeholder="Enter interest payout cycle"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="interestPayoutCycle"
                      isInvalid={formState?.error?.interestPayoutCycle}
                      errorMessage={formState?.error?.interestPayoutCycle}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="FD Tenure"
                      labelPlacement="outside"
                      placeholder="Enter tenure of FD"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="fdTenure"
                      isInvalid={formState?.error?.fdTenure}
                      errorMessage={formState?.error?.fdTenure}
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Cancellation Charges"
                      labelPlacement="outside"
                      placeholder="Enter cancellation charge"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="cancelCharges"
                      isInvalid={formState?.error?.cancelCharges}
                      errorMessage={formState?.error?.cancelCharges}
                      type="number"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Other Charges"
                      labelPlacement="outside"
                      placeholder="Enter other charges"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="otherCharges"
                      isInvalid={formState?.error?.otherCharges}
                      errorMessage={formState?.error?.otherCharges}
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Annual Interest rate"
                      labelPlacement="outside"
                      placeholder="Enter annual interest rate"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="annualInterestRate"
                      isInvalid={formState?.error?.annualInterestRate}
                      errorMessage={formState?.error?.annualInterestRate}
                      type="number"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Lock in Period"
                      labelPlacement="outside"
                      placeholder="Enter lock in period"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="fdLockInPeriod"
                      isInvalid={formState?.error?.fdLockInPeriod}
                      errorMessage={formState?.error?.fdLockInPeriod}
                      type="number"
                    />
                  </div>
                  <div>
                    <RadioGroup
                      label="Active"
                      orientation="horizontal"
                      isRequired
                      name="active"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                      }}
                      defaultValue="true"
                    >
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            <Line />

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
