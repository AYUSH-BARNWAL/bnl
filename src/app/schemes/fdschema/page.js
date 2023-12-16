"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../signup/loader.css";
import Navbar from "../../../components/navbar";
function FdAcScheme() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);
      axios.post("/api/scheme/addFdScheme", formData).then(async () => {
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
    minimumFdAmt: "",
    fdLockInPeriod: "",
    annualInterestRate: "",
    interestPayoutCycle: "",
    fdTenure: "",
    cancelCharges: "",
    active: "",
    otherCharges: "",
    // membershipNo: "",
    // membershipName: "",
    // accountType: "",
    // scheme: "",
    // openingDate: "",
    // typeOfAccount: "",
    // nominie: "",
    // amountDeposited: "",
    // transactionDate: "",
    // paymentMode: "",
  });

  const [loading, setLoading] = useState(false);
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
          FD Scheme Creation
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
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
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
                        Minimum FD Amount<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        type="text"
                        name="minimumFdAmt"
                        placeholder="Enter Minimum FD Amount"
                        value={formData["minimumFdAmt"]}
                        onChange={handleOnChange}
                        required
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Interest Payout Cycle
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        value={formData["interestPayoutCycle"]}
                        onChange={handleOnChange}
                        type="text"
                        name="interestPayoutCycle"
                        placeholder="Enter Interest Payout Cycle"
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        required
                      />
                      <span className="error"></span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        FD Tenure<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        type="text"
                        name="fdTenure"
                        placeholder="Enter Tenure of FD"
                        value={formData["FdTenure"]}
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
                        Annual Interest Rate
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        placeholder="Enter Annual Interest Rate"
                        value={formData["annualInterestRate"]}
                        type="text"
                        name="annualInterestRate"
                        onChange={handleOnChange}
                        required
                        // pattern="^([a-zA-Zà-úÀ-Ú])+$"
                      />
                      <span className="error"></span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Lock in Period<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        placeholder="Enter Lock in Period"
                        value={formData["fdLockInPeriod"]}
                        type="text"
                        name="fdLockInPeriod"
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
                          value="true"
                          onChange={handleOnChange}
                          required
                        />

                        <label className="ra">No</label>
                        <input
                          className="pro"
                          type="radio"
                          name="Active"
                          value="false"
                          onChange={handleOnChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Line />

              {/* <h1 className="flex text-5xl pt-15 mb-8 my-4 font-medium text-slate-800 ml-16">
                AC Openning Scheme
              </h1>
              <div>
                <div className="flex flex-row w-11/12 mx-auto">
                  <p className="text-xl font-bold text-gray-900 w-1/3 text-left"></p>
                  <div className="flex flex-col gap-10 w-full">
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className=" font-bold text-lg text-gray-700">
                          Membership No<span className="text-red-600">*</span>
                        </label>
                        <input
                          className="border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          placeholder="Enter Membership Number"
                          value={formData["membershipNo"]}
                          type="text"
                          name="membershipNo"
                          onChange={handleOnChange}
                          required
                          pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        />
                        <span className="error"></span>
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Membership Name:
                        </label>
                        <input
                          className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          value={formData[""]}
                          type="text"
                          name="membershipName"
                          onChange={handleOnChange}
                          placeholder="Enter Membership Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="laa font-bold text-lg text-gray-700">
                          Account Type<span className="text-red-600">*</span>
                        </label>
                        <input
                          className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          list="account-type-list"
                          type="text"
                          name="accountType"
                          placeholder="Enter  Account type"
                          value={formData["accountType"]}
                          onChange={handleOnChange}
                          required
                          pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        />
                        <datalist id="account-type-list">
                          <option>Saving</option>
                          <option>RD</option>
                          <option>FD</option>
                        </datalist>

                        <span className="error"></span>
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="laa font-bold text-lg text-gray-700">
                          Scheme <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          value={formData["scheme"]}
                          onChange={handleOnChange}
                          type="text"
                          name="scheme"
                          placeholder="Enter the Scheme"
                          pattern="^([a-zA-Zà-úÀ-Ú])+$"
                          required
                        />
                        <span className="error"></span>
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="laa font-bold text-lg text-gray-700">
                          Opening Date<span className="text-red-600">*</span>
                        </label>
                        <input
                          className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          type="text"
                          name="openingDate"
                          placeholder="Enter Ac opening Date"
                          value={formData["openingDate"]}
                          onChange={handleOnChange}
                          required
                          pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        />
                        <span className="error"></span>
                      </div>

                      <div className="flex flex-row gap-x-4 my-5">
                        <label className="font-bold text-lg text-gray-700">
                          Type Of Account<span className="text-red-600">*</span>
                        </label>
                        <label>Single</label>
                        <input
                          className="pro"
                          type="radio"
                          name="typeOfAccount"
                          value="single"
                          onChange={handleOnChange}
                          required
                        />

                        <label className="ra">joint</label>
                        <input
                          className="pro"
                          type="radio"
                          name="typeOfAccount"
                          value="joint"
                          onChange={handleOnChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="laa font-bold text-lg text-gray-700">
                          Nominie<span className="text-red-600">*</span>
                        </label>
                        <input
                          className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          type="text"
                          name="nominie"
                          placeholder="Enter Nominie Name"
                          value={formData["nominie"]}
                          onChange={handleOnChange}
                          required
                          pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        />
                        <span className="error"></span>
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="laa font-bold text-lg text-gray-700">
                          Amount Deposited
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          placeholder="Enter the amount Deposited"
                          value={formData["amountDeposited"]}
                          type="text"
                          name="amountDeposited"
                          onChange={handleOnChange}
                          required
                          pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        />
                        <span className="error"></span>
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="laa font-bold text-lg text-gray-700">
                          Transaction Date
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          type="text"
                          name="transactionDate"
                          placeholder="Enter Transaction  Date"
                          value={formData["transactionDate"]}
                          onChange={handleOnChange}
                          required
                          pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        />
                        <span className="error"></span>
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="laa font-bold text-lg text-gray-700">
                          Payment Mode:<span className="text-red-600">*</span>
                        </label>
                        <input
                          className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          placeholder="Enter the Payment Mode"
                          value={formData["paymentMode"]}
                          type="text"
                          name="paymentMode"
                          onChange={handleOnChange}
                          required
                          pattern="^([a-zA-Zà-úÀ-Ú])+$"
                        />
                        <span className="error"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

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

export default FdAcScheme;
