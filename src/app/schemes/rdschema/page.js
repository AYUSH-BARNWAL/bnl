"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../signup/loader.css";
import Navbar from "../../../components/navbar";
function RdScheme() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);
      axios.post("/api/scheme/addRdScheme", formData).then(async () => {
        toast.success("Scheme Created Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const [formData, setFormData] = useState({
    schemeName: "",
    schemeCode: "",
    minimumRdAmt: "", //ghfhg
    rdFreq: "", //jbmn
    lockInPeriod: "",
    annualInterestRate: "",
    interestCompoundInterval: "",
    tenureRdMonth: "",
    cancelCharges: "",
    otherCharges: "",
    Active: "",
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
          RD Scheme Creation
        </h1>
        <Line />
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {false ? (
            <div className="text-center py-4">
              <span className="loader"></span>
              <p className="text-black">Creating Scheme, Please wait</p>
            </div>
          ) : (
            <div>
              <div className="flex flex-row w-11/12 mx-auto">
                <p className="text-xl font-bold text-gray-900 w-1/3 text-left"></p>
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
                        placeholder="Enter Annual Interest Rate"
                        value={formData["annualInterestRate"]}
                        onChange={handleOnChange}
                        required

                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Interest Compounding Interval
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        value={formData["interestCompoundInterval"]}
                        onChange={handleOnChange}
                        type="text"
                        name="interestCompoundInterval"
                        placeholder="Enter Interest Compounding Interval"
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        required
                      />
                      <span className="error"></span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        RD Tenure Month<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        type="text"
                        name="tenureRdMonth"
                        placeholder="Enter RD Tenure Month"
                        value={formData["tenureRdMonth"]}
                        onChange={handleOnChange}
                        required

                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Cancellation Charges
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        value={formData["cancelCharges"]}
                        onChange={handleOnChange}
                        type="text"
                        name="cancelCharges"
                        placeholder="Enter cancellation Charges"
                        required
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Other Charges<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        type="text"
                        name="otherCharges"
                        placeholder="Enter other Charges"
                        value={formData["otherCharges"]}
                        onChange={handleOnChange}
                        required

                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Lock in Period<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        placeholder="Enter Lock in Period"
                        value={formData["lockInPeriod"]}
                        type="text"
                        name="lockInPeriod"
                        onChange={handleOnChange}
                        required
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                  </div>
                  <div className="flex gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Minimum RD Amount<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        placeholder="Minimum RD Amount"
                        value={formData["minimumRdAmt"]}
                        type="text"
                        name="minimumRdAmt"
                        onChange={handleOnChange}
                        required
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                    <div>
                      <label className="font-bold text-lg text-gray-700">
                        Active<span className="text-red-600">*</span>
                      </label>
                      <div className="flex flex-row gap-x-2">
                        <label>Yes</label>
                        <input
                          className="pro"
                          type="radio"
                          name="Active"
                          value="Yes"
                          onChange={handleOnChange}
                          required
                        />

                        <label className="ra">No</label>
                        <input
                          className="pro"
                          type="radio"
                          name="Active"
                          value="No"
                          onChange={handleOnChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-2/5">
                    <label className="laa font-bold text-lg text-gray-700">
                      RD Frequency<span className="text-red-600">*</span>
                    </label>
                    <input
                      className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                      placeholder="Enter RD Frequency"
                      value={formData["rdFreq"]}
                      type="text"
                      name="rdFreq"
                      onChange={handleOnChange}
                      required
                      // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                    />
                    <span className="error"></span>
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
}

export default RdScheme;
