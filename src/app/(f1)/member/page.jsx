"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";

import { addMemberAction } from "./actions";
import Line from "@/components/line";

const MemberPage = () => {
  const [loading, setLoading] = useState(false);
  const [martial, setMartial] = useState();
  const [formState, formAction] = useFormState(addMemberAction, {});
  const [nominee1, setNominee1] = useState(false);
  const [nominee2, setNominee2] = useState(false);
  const [nominee3, setNominee3] = useState(false);
  const [paymode, setPaymode] = useState("cash");
  const [banks, setBanks] = useState([]);
  const [promoters, setPromoters] = useState([]);

  const [cBank, setCBank] = useState();
  const [cIFSC, setCIFSC] = useState();
  const [ifscOptions, setIfscOptions] = useState([]);
  const [acOptions, setAcOptions] = useState([]);
  const [cAN, setCAN] = useState();
  const [cPromoterName, setCPromoterName] = useState();
  const [share, setShare] = useState({
    sharePurchaseAmount: 0,
    numberOfShares: 0,
    membershipCharge: 0,
    total: 0,
  });
  const handlePromoterChange = (e) => {
    setCPromoterName(() => {
      return e.target.value;
    });
  };

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

  const handleShareChange = (e) => {
    let { name, value } = e.target;
    setShare((pData) => {
      return { ...pData, [name]: value ? parseInt(value) : 0 };
    });
    setShare((pData) => {
      return {
        ...pData,
        total:
          pData.membershipCharge +
          pData.numberOfShares * pData.sharePurchaseAmount,
      };
    });
  };

  useEffect(() => {
    setLoading(false);
    axios.get("/api/getBankAccounts").then(
      ({ data: { bankAccounts } }) => {
        setBanks(() => bankAccounts);
      },
      (error) => {}
    );
    axios.get("/api/getPromoterShares").then(
      ({ data: { promoterShares } }) => {
        setPromoters(() => promoterShares);
      },
      (error) => {}
    );

    if (formState?.errorMessage) {
      toast.error(formState.errorMessage);
    }
    if (formState?.infoMessage) {
      toast.info(formState.infoMessage);
    }
    if (formState?.success) {
      toast.success("Member created successfully");
      // TODO: cash/cheque/online mode processing
    }
  }, [formState]);

  return (
    <>
      <div className="text-5xl pt-14 mb-8 font-medium text-slate-800 ml-16">
        MEMBER DETAILS
      </div>
      <Line />
      <form className="flex flex-col gap-y-8" action={formAction}>
        <div className="flex flex-row w-11/12 mx-auto">
          <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
            FormData Details
          </p>
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Membership no."
                  labelPlacement="outside"
                  isRequired
                  // isDisabled
                  // defaultValue="0"
                  value="0"
                  classNames={{
                    label: "font-bold text-lg text-gray-700 whitespace-nowrap",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  name="membershipNumber"
                />
              </div>
              <div className="flex  w-2/5">
                <RadioGroup
                  label="Title"
                  isRequired
                  orientation="horizontal"
                  name="title"
                  classNames={{
                    label: "font-bold text-lg whitespace-nowrap text-gray-700",
                  }}
                  defaultValue="mr"
                >
                  <Radio value={"mr"}>Mr.</Radio>
                  <Radio value={"mrs"}>Mrs.</Radio>
                </RadioGroup>
              </div>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="First Name"
                  isRequired
                  placeholder="Enter first name"
                  labelPlacement="outside"
                  name="firstName"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.firstName}
                  errorMessage={formState?.error?.firstname}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Middle Name"
                  // isRequired
                  placeholder="Enter middle name"
                  labelPlacement="outside"
                  name="middleName"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.middleName}
                  errorMessage={formState?.error?.middlename}
                />
              </div>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Last Name"
                  isRequired
                  placeholder="Enter last name"
                  labelPlacement="outside"
                  name="lastName"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.lastName}
                  errorMessage={formState?.error?.lastname}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Date of Birth"
                  isRequired
                  placeholder="Enter dob"
                  labelPlacement="outside"
                  name="dob"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.dob}
                  errorMessage={formState?.error?.dob}
                  type="date"
                />
              </div>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Father Name"
                  isRequired
                  placeholder="Enter father's name"
                  labelPlacement="outside"
                  name="fatherName"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.fatherName}
                  errorMessage={formState?.error?.fatherName}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Mother's Name"
                  isRequired
                  placeholder="Enter mother's name"
                  labelPlacement="outside"
                  name="motherName"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.motherName}
                  errorMessage={formState?.error?.motherName}
                />
              </div>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex  w-2/5">
                <RadioGroup
                  label="Gender"
                  orientation={"horizontal"}
                  name="gender"
                  isRequired
                  classNames={{
                    label: "font-bold text-lg whitespace-nowrap text-gray-700",
                  }}
                  defaultValue="male"
                >
                  <Radio value={"male"}>Male</Radio>
                  <Radio value={"female"}>Female</Radio>
                  <Radio value={"trans"}>Trans</Radio>
                </RadioGroup>
              </div>
              <div className="flex w-2/5">
                <RadioGroup
                  label="Martial Status"
                  isRequired
                  orientation="horizontal"
                  name="martial"
                  classNames={{
                    label: "font-bold text-lg whitespace-nowrap text-gray-700",
                  }}
                  value={martial}
                  onValueChange={setMartial}
                  defaultValue="unmarried"
                >
                  <Radio value={"married"}>Married</Radio>
                  <Radio value={"unmarried"}>Unmarried</Radio>
                </RadioGroup>
              </div>
            </div>
            <Input
              label="Spouse Name"
              labelPlacement="outside"
              isRequired={martial == "married"}
              placeholder="Enter spouse name"
              isDisabled={martial != "married"}
              classNames={{
                label: "font-bold text-lg text-gray-700",
              }}
            />
          </div>
        </div>
        <Line />
        <div className="flex flex-row w-11/12 mx-auto">
          <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
            Contact Details
          </p>
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Email"
                  placeholder="Enter email"
                  isRequired
                  labelPlacement="outside"
                  name="email"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.email}
                  errorMessage={formState?.error?.email}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Mobile number"
                  placeholder="Enter mobile number"
                  isRequired
                  labelPlacement="outside"
                  name="phone"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.phone}
                  errorMessage={formState?.error?.phone}
                  // pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                  type="tel"
                />
              </div>
            </div>
            <div className="flex flex-row gap-24 my-2">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Aadhaar Number"
                  placeholder="Enter aadhaar number"
                  isRequired
                  labelPlacement="outside"
                  name="aadhaar"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.aadhaar}
                  errorMessage={formState?.error?.aadhaar}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="PAN Number"
                  placeholder="Enter PAN"
                  isRequired
                  labelPlacement="outside"
                  name="pan"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.pan}
                  errorMessage={formState?.error?.pan}
                  // pattern="^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$"
                />
              </div>
            </div>
            <div className="flex flex-row gap-24 my-2">
              <div className="flex flex-col w-2/5">
                <Input
                  // pattern="^([a-zA-Z]){3}([0-9]){7}?$"
                  label="Voter ID"
                  placeholder="Enter Voter ID"
                  isRequired
                  labelPlacement="outside"
                  name="voter"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.voter}
                  errorMessage={formState?.error?.voter}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Ration Card Number"
                  placeholder="Enter Ration card number"
                  isRequired
                  labelPlacement="outside"
                  name="ration"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
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
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Area/Locality"
                  placeholder="Enter area/locallity"
                  isRequired
                  labelPlacement="outside"
                  name="area"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.area}
                  errorMessage={formState?.error?.area}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Landmark (if any)"
                  placeholder="Enter landmark"
                  // isRequired
                  labelPlacement="outside"
                  name="landmark"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.landmark}
                  errorMessage={formState?.error?.landmark}
                />
              </div>
            </div>
            <div className="flex flex-row gap-24 my-2">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Post"
                  placeholder="Enter post"
                  isRequired
                  labelPlacement="outside"
                  name="post"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.post}
                  errorMessage={formState?.error?.post}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="District"
                  placeholder="Enter district"
                  isRequired
                  labelPlacement="outside"
                  name="dist"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.dist}
                  errorMessage={formState?.error?.dist}
                />
              </div>
            </div>
            <div className="flex flex-row gap-24 my-2">
              <div className="flex flex-col w-2/5">
                <Input
                  label="State"
                  placeholder="Enter state"
                  isRequired
                  labelPlacement="outside"
                  name="state"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.state}
                  errorMessage={formState?.error?.state}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Pincode"
                  placeholder="Enter pincode"
                  isRequired
                  labelPlacement="outside"
                  name="pincode"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
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
            Nominee Details
          </p>
          <div className="flex flex-col gap-y-4 w-full">
            <div className="w-[89%]">
              <Button
                onClick={() => {
                  setNominee1((p) => {
                    return !p;
                  });
                }}
                className="rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold py-2.5 border border-black"
                type="button"
                name="nominee1"
              >
                Add Nominee 1
              </Button>
            </div>

            {nominee1 === true ? (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Name"
                      labelPlacement="outside"
                      placeholder="Enter name for nominee 1"
                      name="name1"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Relation"
                      labelPlacement="outside"
                      placeholder="Enter relation"
                      name="relation1"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Email"
                      labelPlacement="outside"
                      placeholder="Enter email for nominee 1"
                      name="email1"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Mobile Number"
                      labelPlacement="outside"
                      placeholder="Enter mobile number for nominee 1"
                      name="phone1"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      type="tel"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Aadhaar Number"
                      labelPlacement="outside"
                      placeholder="Enter aadhaar number for nominee 1"
                      name="aadhaar1"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="PAN Number"
                      labelPlacement="outside"
                      placeholder="Enter PAN for nominee 1"
                      name="pan1"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Ration Card Number"
                      labelPlacement="outside"
                      placeholder="Enter Ration Card Number for nominee 1"
                      name="ration1"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Voter ID"
                      labelPlacement="outside"
                      placeholder="Enter Voter ID for nominee 1"
                      name="voter1"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="w-[89%]">
              <Button
                onClick={() => {
                  setNominee2((p) => {
                    return !p;
                  });
                }}
                className="rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold py-2.5 border border-black"
                name="nominee2"
              >
                Add Nominee 2
              </Button>
            </div>

            {nominee1 == true && nominee2 == true ? (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Name"
                      labelPlacement="outside"
                      placeholder="Enter name for nominee 2"
                      name="name2"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Relation"
                      labelPlacement="outside"
                      placeholder="Enter relation"
                      name="relation2"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Email"
                      labelPlacement="outside"
                      placeholder="Enter email for nominee 2"
                      name="email2"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Mobile Number"
                      labelPlacement="outside"
                      placeholder="Enter mobile number for nominee 2"
                      name="phone2"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      type="tel"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Aadhaar Number"
                      labelPlacement="outside"
                      placeholder="Enter aadhaar number for nominee 2"
                      name="aadhaar2"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="PAN Number"
                      labelPlacement="outside"
                      placeholder="Enter PAN for nominee 2"
                      name="pan2"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Ration Card Number"
                      labelPlacement="outside"
                      placeholder="Enter Ration Card Number for nominee 2"
                      name="ration2"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Voter ID"
                      labelPlacement="outside"
                      placeholder="Enter Voter ID for nominee 2"
                      name="voter2"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            <div className="w-[89%]">
              <Button
                onClick={() => {
                  setNominee3((p) => {
                    return !p;
                  });
                }}
                className="rounded-md h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold py-2.5 border border-black"
                type="button"
                name="nominee3"
              >
                Add Nominee 3
              </Button>
            </div>

            {nominee1 && nominee2 && nominee3 ? (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Name"
                      labelPlacement="outside"
                      placeholder="Enter name for nominee 3"
                      name="name3"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Relation"
                      labelPlacement="outside"
                      placeholder="Enter relation"
                      name="relation3"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Email"
                      labelPlacement="outside"
                      placeholder="Enter email for nominee 3"
                      name="email3"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Mobile Number"
                      labelPlacement="outside"
                      placeholder="Enter mobile number for nominee 3"
                      name="phone3"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                      type="tel"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Aadhaar Number"
                      labelPlacement="outside"
                      placeholder="Enter aadhaar number for nominee 3"
                      name="aadhaar3"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="PAN Number"
                      labelPlacement="outside"
                      placeholder="Enter PAN for nominee 3"
                      name="pan3"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24 my-2">
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Ration Card Number"
                      labelPlacement="outside"
                      placeholder="Enter Ration Card Number for nominee 3"
                      name="ration3"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Input
                      label="Voter ID"
                      labelPlacement="outside"
                      placeholder="Enter Voter ID for nominee 3"
                      name="voter3"
                      classNames={{
                        label: "font-bold text-lg text-gray-700",
                        inputWrapper:
                          "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Line />
        <div className="flex flex-row w-11/12 mx-auto">
          <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
            Membership Details
          </p>
          <div className="flex flex-col gap-y-4 w-full">
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Share Purchase Amount"
                  placeholder="Enter share purchase amount"
                  isRequired
                  labelPlacement="outside"
                  name="sharePurchaseAmount"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.sharePurchaseAmount}
                  errorMessage={formState?.error?.sharePurchaseAmount}
                  type="number"
                  value={share.sharePurchaseAmount}
                  onChange={handleShareChange}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Input
                  label="Number of Shares"
                  placeholder="Enter no. of shares"
                  isRequired
                  labelPlacement="outside"
                  name="numberOfShares"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.numberOfShares}
                  errorMessage={formState?.error?.numberOfShares}
                  value={share.numberOfShares}
                  onChange={handleShareChange}
                  type="number"
                />
              </div>
            </div>
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Membership Charge"
                  placeholder="Enter membership charge"
                  isRequired
                  labelPlacement="outside"
                  name="membershipCharge"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.membershipCharge}
                  errorMessage={formState?.error?.membershipCharge}
                  type="number"
                  value={share.membershipCharge}
                  onChange={handleShareChange}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <Select
                  label="Promoter"
                  placeholder="Select a promoter"
                  labelPlacement="outside"
                  isRequired
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    trigger:
                      "rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  // defaultSelectedKeys={[]}
                  items={promoters}
                  selectedKeys={[cPromoterName]}
                  onChange={handlePromoterChange}
                  name="promoter"
                >
                  {(promoter) => {
                    return (
                      <SelectItem key={promoter._id}>
                        {`${promoter.promoterName}: ${promoter.sharesLeft}`}
                      </SelectItem>
                    );
                  }}
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <RadioGroup
                    label="Paymode"
                    orientation="horizontal"
                    isRequired
                    classNames={{
                      label: "font-bold text-lg text-gray-700",
                    }}
                    name="paymode"
                    value={paymode}
                    onValueChange={setPaymode}
                  >
                    <Radio value={"cash"}>Cash</Radio>
                    <Radio value={"cheque"}>Cheque</Radio>
                    <Radio value={"online"}>Online</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div>
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
            <div className="flex flex-row gap-24">
              <div className="flex flex-col w-2/5">
                <Input
                  label="Total Amount payable"
                  placeholder="Enter total amount payable"
                  isRequired
                  labelPlacement="outside"
                  name="total"
                  classNames={{
                    label: "font-bold text-lg text-gray-700",
                    inputWrapper:
                      "rounded-md border border-black px-2 h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold",
                  }}
                  isInvalid={formState?.error?.total}
                  errorMessage={formState?.error?.total}
                  value={share.total}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-0 items-end self-end justify-end mb-20 mr-44 mt-16">
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
      </form>
    </>
  );
};

export default MemberPage;
