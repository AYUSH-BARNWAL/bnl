"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { Input, Button } from "@nextui-org/react";
import { addBankAccountAction } from "./actions";
import Line from "@/components/line";

export default function BankAccountPage() {
  const [loading, setLoading] = useState(false);
  const [formState, formAction] = useFormState(addBankAccountAction, {});

  const handleSubmit = () => {
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
    if (formState?.success) {
      toast.success("Bank account added successfully");
    } else {
      toast.error(formState?.errorMessage);
    }
  }, [formState]);

  return (
    <>
      <h1 className="flex text-5xl pt-28 mb-8 font-medium text-slate-800 ml-16">
        New Bank Account Opening Form
      </h1>
      <Line />
      <form
        className="flex flex-col mb-16"
        action={formAction}
        onSubmit={handleSubmit}
      >
        {loading ? (
          <div className="text-center py-4">
            {/* <span className="loader"></span> */}
            <p className="text-black">Creating Bank Account, Please wait</p>
          </div>
        ) : (
          <div className="flex flex-row w-11/12 mx-auto">
            <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
              Details
            </p>
            <div className="flex flex-col gap-10 w-full">
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <Input
                    label="Bank Name"
                    isRequired
                    labelPlacement={"outside"}
                    placeholder="Enter the bank name"
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      inputWrapper:
                        "rounded-md h-10 border border-black px-2 bg-slate-300 text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="bankName"
                    isInvalid={formState?.error?.bankName}
                    errorMessage={formState?.error?.bankName}
                  />
                </div>
                <div className="flex flex-col w-2/5">
                  <Input
                    label="Account Opening Date"
                    type="date"
                    labelPlacement={"outside"}
                    isRequired
                    placeholder="Date"
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      inputWrapper:
                        "rounded-md h-10 border border-black px-2 bg-slate-300 text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="accountopeningdate"
                    isInvalid={formState?.error?.accountopeningdate}
                    errorMessage={formState?.error?.accountopeningdate}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <Input
                    label="Account Number"
                    placeholder="Enter the bank account number"
                    labelPlacement={"outside"}
                    isRequired
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      inputWrapper:
                        "rounded-md h-10 border border-black px-2 bg-slate-300 text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="accountNumber"
                    isInvalid={formState?.error?.accountNumber}
                    errorMessage={formState?.error?.accountNumber}
                  />
                </div>
                <div className="flex flex-col w-2/5">
                  <Input
                    label="Account Type"
                    placeholder="Account type"
                    labelPlacement={"outside"}
                    isRequired
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      inputWrapper:
                        "rounded-md h-10 border border-black px-2 bg-slate-300 text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="accountType"
                    isInvalid={formState?.error?.accountType}
                    errorMessage={formState?.error?.accountType}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <Input
                    label="Branch"
                    placeholder="Enter bank branch"
                    labelPlacement={"outside"}
                    isRequired
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      inputWrapper:
                        "rounded-md h-10 border border-black px-2 bg-slate-300 text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="branch"
                    isInvalid={formState?.error?.branch}
                    errorMessage={formState?.error?.branch}
                  />
                </div>
                <div className="flex flex-col w-2/5">
                  <Input
                    label="IFSC"
                    placeholder="Enter IFSC"
                    labelPlacement={"outside"}
                    isRequired
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      inputWrapper:
                        "rounded-md h-10 border border-black px-2 bg-slate-300 text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="ifsc"
                    isInvalid={formState?.error?.ifsc}
                    errorMessage={formState?.error?.ifsc}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-[61vw]">
                  <Input
                    label="Address"
                    placeholder="Enter address"
                    labelPlacement={"outside"}
                    isRequired
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                      inputWrapper:
                        "rounded-md h-10 border border-black px-2 bg-slate-300 text-gray-700 cursor-pointer font-semibold",
                    }}
                    name="address"
                    isInvalid={formState?.error?.address}
                    errorMessage={formState?.error?.address}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-0 items-end self-end justify-end mr-44 mt-16">
          <input
            onClick={() => {
              window.history.back();
            }}
            type="button"
            value="CANCEL"
            className="justify-end cursor-pointer self-end items-end mr-12 tracking-wider  text-gray-500 text-xl leading-loose font-bold"
            disabled={loading}
          />
          <Button
            type="submit"
            isDisabled={loading}
            className="bg-red-600 cursor-pointer tracking-wider font-bold w-fit justify-end self-end items-end rounded-lg shadow-xl text-gray-50 px-6 py-1.5 text-xl"
          >
            CREATE
          </Button>
        </div>
      </form>
    </>
  );
}
