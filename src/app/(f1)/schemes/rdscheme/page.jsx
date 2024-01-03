"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { Input, Button, RadioGroup, Radio } from "@nextui-org/react";
import Line from "@/components/line";

import { rdAction } from "../actions";

export default function RDSchemePage() {
  const [loading, setLoading] = useState(false);
  const [formState, formAction] = useFormState(rdAction, {});
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
    <div>
      <>
        <h1 className="flex text-5xl pt-15 mb-8 pt-28 font-medium text-slate-800 ml-16">
          RD Scheme Creation
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
                        label="Annual Interest Rate"
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
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Interest Compounding Interval"
                        labelPlacement="outside"
                        placeholder="Enter interest compounding interval"
                        isRequired
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="interestCompoundInterval"
                        isInvalid={formState?.error?.interestCompoundInterval}
                        errorMessage={
                          formState?.error?.interestCompoundInterval
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="RD Tenure Month"
                        labelPlacement="outside"
                        placeholder="Enter RD Tenure Month"
                        isRequired
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="rdTenureMonth"
                        isInvalid={formState?.error?.rdTenureMonth}
                        errorMessage={formState?.error?.rdTenureMonth}
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Cancellation Charges"
                        labelPlacement="outside"
                        placeholder="Enter cancellation charges"
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
                        label="Lock in period"
                        labelPlacement="outside"
                        placeholder="Enter lock in period"
                        isRequired
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="lockInPeriod"
                        isInvalid={formState?.error?.lockInPeriod}
                        errorMessage={formState?.error?.lockInPeriod}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="flex gap-24">
                    <div className="flex flex-col w-2/5">
                      <Input
                        label="Minimum RD Amount"
                        labelPlacement="outside"
                        placeholder="Enter min RD amount"
                        isRequired
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                          inputWrapper:
                            "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                        }}
                        name="minimumRdAmt"
                        isInvalid={formState?.error?.minimumRdAmt}
                        errorMessage={formState?.error?.minimumRdAmt}
                        type="number"
                      />
                    </div>
                    <div>
                      <RadioGroup
                        label="Active"
                        isRequired
                        orientation="horizontal"
                        name="active"
                        defaultValue="true"
                        classNames={{
                          label: "font-bold text-lg text-gray-700",
                        }}
                      >
                        <Radio value="true">Yes</Radio>
                        <Radio value="false">No</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="RD Frequency"
                      labelPlacement="outside"
                      placeholder="Enter RD frequency"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="rdFreq"
                      isInvalid={formState?.error?.rdFreq}
                      errorMessage={formState?.error?.rdFreq}
                    />
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
    </div>
  );
}
