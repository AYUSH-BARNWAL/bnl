"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "../../signup/loader.css";
import Navbar from "../../../components/navbar";
const SaScheme = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);
      axios.post("/api/scheme/addSaScheme", formData).then(async () => {
        toast.success("Scheme Created Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    schemeName: "",
    schemeCode: "",
    minimumBalance: "",
    annualInterestRate: "",
    interestPayout: "",
    serviceChargeFreq: "",
    serviceCharge: "",
    smsChargeFreq: "",
    smsCharge: "",
  });
  const handleOnChange = (e) => {
    console.log(formData);
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const Line = () => {
    return <div className="w-11/12 mx-auto h-[1.5px] my-10 bg-gray-400" />;
  };

  return (
    <div>
      <Navbar />
      <>
        <h1 className="flex text-5xl pt-15 mb-8 pt-28 font-medium text-slate-800 ml-16">
          Saving Scheme Creation
        </h1>
        <Line />
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {loading ? (
            <div className="text-center py-4">
              <span className="loader"></span>
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
                      <label className=" font-bold text-lg text-gray-700">
                        Scheme Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        placeholder="Enter Scheme Name"
                        value={formData["schemeName"]}
                        type="text"
                        name="schemeName"
                        onChange={handleOnChange}
                        required
                        // pattern="[a-zA-Z]"
                      />
                      <span className="error"></span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Scheme Code:
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        value={formData["schemeCode"]}
                        type="text"
                        name="schemeCode"
                        onChange={handleOnChange}
                        placeholder="Enter  Scheme Code"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Annual Interest Rate
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        type="text"
                        name="annualInterestRate"
                        required
                        placeholder="Enter Interest Rate"
                        value={formData["annualInterestRate"]}
                        onChange={handleOnChange}

                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Interest Payout<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        value={formData["interestPayout"]}
                        onChange={handleOnChange}
                        type="text"
                        name="interestPayout"
                        placeholder="Enter Interest Payout"
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        required
                      />
                      <span className="error"></span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Minimum Balance<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        placeholder="Enter Minimum Balance"
                        value={formData["minimumBalance"]}
                        type="text"
                        name="minimumBalance"
                        onChange={handleOnChange}
                        required
                        // pattern="[a-zA-Z]"
                      />
                      <span className="error"></span>
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
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="emails"
                      >
                        Charge Frequency<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        placeholder="Enter Charge Frequency"
                        value={formData["serviceChargeFreq"]}
                        onChange={handleOnChange}
                        name="serviceChargeFreq"
                        required
                      />
                      <span className="error"></span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Service Charge<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        type="text"
                        name="serviceCharge"
                        placeholder="Enter Service Charges"
                        value={formData["serviceCharge"]}
                        onChange={handleOnChange}
                        // pattern="^[\+]?[(]?[0-9]$"
                        required
                      />
                      <span className="error"></span>
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
                      <label className="laa font-bold text-lg text-gray-700">
                        Charge Frequency<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        placeholder="Enter Charge Frequency"
                        value={formData["smsChargeFreq"]}
                        onChange={handleOnChange}
                        name="smsChargeFreq"
                        required
                      />
                      <span className="error"></span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Sms Charge<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        type="text"
                        name="smsCharge"
                        placeholder="Enter Sms Charges"
                        value={formData["smsCharge"]}
                        onChange={handleOnChange}
                        // pattern="^[\+]?[(]?[0-9]$"
                        required
                      />
                      <span className="error"></span>
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
                <button
                  type="submit"
                  className="bg-red-600 cursor-pointer tracking-wider font-bold w-fit justify-end self-end items-end rounded-lg shadow-xl text-gray-50 px-6 py-1.5 text-xl"
                >
                  CREATE
                </button>
              </div>
            </div>
          )}
        </form>
      </>
    </div>
  );
};

export default SaScheme;
