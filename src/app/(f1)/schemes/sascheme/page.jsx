"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { Input, Button } from "@nextui-org/react";
import Line from "@/components/line";

import { saAction } from "../actions";

export default function SASchemePage() {
  const [loading, setLoading] = useState(false);
  const [formState, formAction] = useFormState(saAction, {});
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
      <h1 className="flex text-5xl pt-15 mb-8 pt-28 font-medium text-slate-800 ml-16">
        Saving Scheme Creation
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
              <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
                Saving Scheme
              </p>
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
                      label="Interest Payout"
                      labelPlacement="outside"
                      placeholder="Enter interest payout"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="interestPayout"
                      isInvalid={formState?.error?.interestPayout}
                      errorMessage={formState?.error?.interestPayout}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Minimum balance"
                      labelPlacement="outside"
                      placeholder="Enter minimum balance"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="minimumBalance"
                      isInvalid={formState?.error?.minimumBalance}
                      errorMessage={formState?.error?.minimumBalance}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Line />
            <div className="flex flex-row w-11/12 mx-auto">
              <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
                Service Charges
              </p>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Charge Frequency"
                      labelPlacement="outside"
                      placeholder="Enter charge frequency"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="serviceChargeFreq"
                      isInvalid={formState?.error?.serviceChargeFreq}
                      errorMessage={formState?.error?.serviceChargeFreq}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Service Charge"
                      labelPlacement="outside"
                      placeholder="Enter Service Charge"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="serviceCharge"
                      isInvalid={formState?.error?.serviceCharge}
                      errorMessage={formState?.error?.serviceCharge}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Line />
            <div className="flex flex-row w-11/12 mx-auto">
              <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
                SMS Charges
              </p>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Charge Frequency"
                      labelPlacement="outside"
                      placeholder="Enter Charge Frequency"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="smsChargeFreq"
                      isInvalid={formState?.error?.smsChargeFreq}
                      errorMessage={formState?.error?.smsChargeFreq}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="SMS Charge"
                      labelPlacement="outside"
                      placeholder="Enter SMS Charge"
                      isRequired
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      name="smsCharge"
                      isInvalid={formState?.error?.smsCharge}
                      errorMessage={formState?.error?.smsCharge}
                      type="number"
                    />
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
