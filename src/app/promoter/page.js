"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar";
import axios from "axios";
import "./loader.css";
const Promoter = () => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedIFSC, setSelectedIFSC] = useState("");
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState({});
  const [proFormData, setProFormData] = useState({
    gender: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    fatherName: "",
    motherName: "",
    email: "",
    mobile: "",
    aadhar: "",
    pan: "",
    voter: "",
    ration: "",
    martial: "",
    area: "",
    landmark: "",
    post: "",
    dist: "",
    state: "",
    spouse: "",
    pincode: "",
    totalShareValue: "",
    shareNominalHold: "",
    allotmentDate: "",
    firstDistinctionNumber: "",
    lastDistinctionNumber: "",
    shareNominalValue: "",
    bankName: "",
    bankAccountNumber: "",
    ifsc: "",
  });
  const [share, setShare] = useState({
    promoterName: "",
    sharesLeft: 0,
    transactionDate: "",
    membershipNumber: 0,
    sharesSold: 0,
    transactionID: "",
  });
  function generateTimestampOrderedStrings(prefix) {
    const timestamp = Date.now();
    const formattedTimestamp = prefix + timestamp.toString().slice(0, 10);
    return formattedTimestamp;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankAccounts = await axios.get("/api/bankAccount/getBankAccount");
        setBanks(bankAccounts.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestampString = generateTimestampOrderedStrings("TRN-PROMOTER-");
    try {
      setLoading(true);
      console.log(proFormData);
      axios.post("/api/promoter/addPromoter", proFormData).then(async () => {
        const sentData = await axios
          .post("/api/chequeOrOnline/addPromoterAmount", proFormData)
          .then(async () => {
            share.transactionID = timestampString;
            share.promoterName =
              proFormData.firstName + " " + proFormData.lastName;
            share.membershipNumber = proFormData.membershipNumber;
            share.sharesLeft = proFormData.shareNominalHold;
            share.transactionDate = proFormData.allotmentDate.toString();
            await axios.post("/api/promoter/addPromoterShares", share);
          });
        // console.log(sentData.data.newChequeOnline);
        toast.success("Account Created Successfully");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleError = (e) => {
    if (e.target.name === "firstName" || e.target.name === "lastName") {
      let p = /[a-zA-Z]{2,10}/;
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "name required" });
        console.log(getError.firstName);
        console.log("null value");
      } else if (!p.test(e.target.value)) {
        setError({
          ...getError,
          [e.target.name]:
            "name should be of more than 2 and less than 10 characters",
        });
        console.log(getError.firstName);
        console.log("pattern");
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "DOB") {
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "please enter your DOB" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (
      e.target.name === "fatherName" ||
      e.target.name === "motherName"
    ) {
      let p = /^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$/;
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "name required" });
      } else if (!p.test(e.target.value)) {
        setError({
          ...getError,
          [e.target.name]:
            "name should be firstname and last name and name should be minimum 2 character",
        });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "email") {
      let p = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter email" });
      } else if (!p.test(e.target.value)) {
        setError({
          ...getError,
          [e.target.name]: "enter email in proper format",
        });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "text") {
      let p = /^[+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter phone number" });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "enter valid mobile Number" });
      }
    } else if (e.target.name === "aadhar") {
      let p = /^[1-9]{1}\d{3}\d{4}\d{4}$/;

      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter aadhaar Number" });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "enter valid aadhar Number" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "pan") {
      let p = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter pan Number" });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "enter valid pan Number" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "voter") {
      let p = /^([a-zA-Z]){3}([0-9]){7}?$/;
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter voter id" });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "enter valid voter id" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "ration") {
      let p = /^([a-zA-Z0-9]){8,12}\s*$/;
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter ration card Number" });
      } else if (!p.test(e.target.value)) {
        setError({
          ...getError,
          [e.target.name]: "enter valid ration card Number",
        });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "areal") {
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter your area" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "post") {
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter post name" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "dist") {
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter your district" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "state") {
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter your state" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "pincode") {
      let p = /^[1-9]{1}\d{2}\s?\d{3}$/gm;

      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter your pin code" });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "invalid pin code" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    }
  };
  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
    proFormData.bankName = event.target.value;
    setSelectedIFSC("");
    proFormData.ifsc = "";
    setSelectedAccountNumber("");
    proFormData.bankAccountNumber = "";
  };

  const handleIFSCChange = (event) => {
    setSelectedIFSC(event.target.value);
    proFormData.ifsc = event.target.value;
    setSelectedAccountNumber("");
    proFormData.bankAccountNumber = "";
  };

  const handleAccountNumberChange = async (event) => {
    const accountNumber = event.target.value;
    setSelectedAccountNumber(accountNumber);
    proFormData.bankAccountNumber = accountNumber;
    setLoading(true);
    await axios
      .post("/api/chequeOrOnline/getBankBalance", {
        bankAccountNumber: accountNumber,
      })
      .then((response) => {
        const oldBalance = response.data.balance;
        console.log(oldBalance);
        setProFormData((prevData) => ({
          ...prevData,
          balance: oldBalance,
        }));
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.log(error);
      });
  };
  const Line = () => {
    return <div className="w-11/12 mx-auto h-[1.5px] my-10 bg-gray-400" />;
  };

  const uniqueBankNames = Array.from(
    new Set(banks.map((item) => item.bankname))
  );

  const uniqueIFSCCodes = Array.from(
    new Set(
      banks
        .filter((item) => item.bankname === selectedBank)
        .map((item) => item.ifsc)
    )
  );

  return (
    <div>
      <Navbar />
      <>
        <h1 className="flex text-5xl pt-28 mb-8 font-medium text-slate-800 ml-16">
          Promoter
        </h1>
        <Line />
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {loading ? (
            <div className="text-center py-4">
              <span className="loader"></span>
              <p className="text-black">Creating Bank Account, Please wait</p>
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
                      <label
                        id="firstnames"
                        className=" font-bold text-lg text-gray-700"
                      >
                        {" "}
                        First Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        placeholder="Enter First Name"
                        value={proFormData.firstName}
                        type="text"
                        name="firstName"
                        required
                        // pattern="[a-zA-Z]{2}"
                      />
                      <span className="error">{getError.firstName}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Middle Name:
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="middleName"
                        placeholder="Enter Middle Name"
                        value={proFormData.middleName}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="lastnames"
                      >
                        Last Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  border px-2 pro rounded-md h-10 bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                        value={proFormData.lastName}
                        type="text"
                        name="lastName"
                        required
                        // pattern="[a-zA-Z]{2}"
                      />
                      <span className="error">{getError.lastName}</span>
                    </div>
                    <div>
                      <label
                        id="genders"
                        className="font-bold text-lg text-gray-700"
                        value={proFormData.gender}
                        onChange={handleInputChange}
                      >
                        Gender<span className="text-red-600">*</span>
                      </label>
                      <div className="flex flex-row gap-x-2">
                        <input
                          className="pro"
                          onChange={handleInputChange}
                          type="radio"
                          name="gender"
                          value="male"
                          required
                        />

                        <label className="ra">M</label>
                        <input
                          className="pro"
                          onChange={handleInputChange}
                          type="radio"
                          name="gender"
                          value="female"
                          required
                        />

                        <label className="ra">F</label>
                        <input
                          className="pro"
                          onChange={handleInputChange}
                          type="radio"
                          name="gender"
                          value="trans"
                          required
                        />
                        <label className="ra">T</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Date of Birth<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="date"
                        name="dob"
                        required
                      />
                      <span className="error">{getError.DOB}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label
                        className="font-bold text-lg text-gray-700"
                        value={proFormData.martial}
                        onChange={handleInputChange}
                      >
                        Marital status<span className="text-red-600">*</span>
                      </label>
                      <div className="flex flex-row gap-2">
                        <input
                          className="pro"
                          onChange={handleInputChange}
                          type="radio"
                          name="martial"
                          value="married"
                          required
                        />
                        <label>married</label>
                        <input
                          className="pro"
                          onChange={handleInputChange}
                          type="radio"
                          name="martial"
                          value="unmarried"
                          required
                        />
                        <label>unmarried</label>
                      </div>

                      {proFormData.martial === "married" ? (
                        <>
                          <label className=" font-bold text-lg text-gray-700">
                            Spouse Name<span className="text-red-600">*</span>
                          </label>
                          <input
                            className="pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Enter Spouse Name"
                            value={proFormData.spouse}
                            name="spouse"
                            required
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="fathernames"
                      >
                        Father Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="fatherName"
                        required
                        placeholder="Enter Father Name"
                        value={proFormData.fatherName}
                        // pattern="^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$"
                      />
                      <span className="error">{getError.fatherName}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="mothernames"
                      >
                        Mother Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="motherName"
                        placeholder="Enter Mother Name"
                        value={proFormData.motherName}
                        // pattern="^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$"
                        required
                      />
                      <span className="error">{getError.motherName}</span>
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
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="emails"
                      >
                        Email<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={proFormData.email}
                        required
                      />
                      <span className="error">{getError.email}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="mobiles"
                      >
                        Mobile<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="mobile"
                        placeholder="Enter Mobile"
                        value={proFormData.mobile}
                        // pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                        required
                      />
                      <span className="error">{getError.number}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Aadhar Number.<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="aadhar"
                        placeholder="Enter Aadhar"
                        value={proFormData.aadhar}
                        // pattern="^[1-9]{1}\d{3}\d{4}\d{4}$"
                        required
                      />
                      <span className="error">{getError.aadhar}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="pans"
                      >
                        Pan Number<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="pan"
                        placeholder="Enter Pan number"
                        value={proFormData.pan}
                        // pattern="^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$"
                        required
                      />
                      <span className="error">{getError.pan}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="voters"
                      >
                        Voter ID Number<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.voter}
                        placeholder="Enter voter id"
                        name="voter"
                        // pattern="^([a-zA-Z]){3}([0-9]){7}?$"
                        required
                      />
                      <span className="error">{getError.voter}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label
                        className="laa font-bold text-lg text-gray-700"
                        id="rations"
                      >
                        Ration Number<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.ration}
                        placeholder="Enter ration number"
                        name="ration"
                        // pattern="^([a-zA-Z0-9]){8,12}\s*$"
                        required
                      />
                      <span className="error">{getError.ration}</span>
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
                      <label className="laa font-bold text-lg text-gray-700">
                        Areal Locality<span className="text-red-600">*</span>:
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="area"
                        value={proFormData.area}
                        placeholder="Enter Areal Locality"
                        required
                      />
                      <span className="error">{getError.areal}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Land Mark:
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.landmark}
                        placeholder="Enter Land Mark"
                        name="Landmark"
                      />
                      <span className="error">{getError.Landmark}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Post<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.post}
                        placeholder="Enter Post"
                        name="post"
                        required
                      />
                      <span className="error">{getError.post}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        District<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.dist}
                        placeholder="Enter District"
                        name="dist"
                        required
                      />
                      <span className="error">{getError.dist}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        State<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.state}
                        placeholder="Enter State"
                        name="state"
                        required
                      />
                      <span className="error">{getError.state}</span>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Pin Code<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="pincode"
                        value={proFormData.pincode}
                        placeholder="Enter Pin Code"
                        // pattern="^[1-9]{1}\d{2}\s?\d{3}$"
                        required
                      />
                      <span className="error">{getError.pincode}</span>
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
                      <label className="laa font-bold text-lg text-gray-700">
                        Allotment Date<span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="Date"
                        value={proFormData.allotmentDate}
                        placeholder="Enter Allotment Date"
                        name="allotmentDate"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Share Nominal Value
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.shareNominalValue}
                        placeholder="0"
                        name="shareNominalValue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Total Share Value (in Rs.)
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.totalShareValue}
                        placeholder="0"
                        name="totalShareValue"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Share Nominal Hold
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={
                          (proFormData.shareNominalHold =
                            proFormData.totalShareValue &&
                            proFormData.shareNominalValue
                              ? proFormData.totalShareValue /
                                proFormData.shareNominalValue
                              : 0)
                        }
                        name="shareNominalHold"
                        required
                        disabled
                        placeholder="Share Nominal Hold"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        First Distinction Number
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.firstDistinctionNumber}
                        placeholder="First Distinction Number"
                        name="firstDistinctionNumber"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Last Distinction Number
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        value={proFormData.lastDistinctionNumber}
                        placeholder="Last Distinction Number"
                        name="lastDistinctionNumber"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Bank Name
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleBankChange}
                        type="text"
                        value={selectedBank}
                        placeholder="Bank Name"
                        name="bankName"
                        required
                      >
                        <option value="">Select a bank</option>
                        {uniqueBankNames.map((bankname) => (
                          <option key={bankname} value={bankname}>
                            {bankname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Bank IFSC Code
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleIFSCChange}
                        type="text"
                        value={selectedIFSC}
                        placeholder="Bank Account Number"
                        name="bankAccountNumber"
                        required
                      >
                        <option value="">Select an IFSC code</option>
                        {uniqueIFSCCodes.map((ifsc) => (
                          <option key={ifsc} value={ifsc}>
                            {ifsc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="laa font-bold text-lg text-gray-700">
                        Bank Account Number
                        <span className="text-red-600">*</span>
                      </label>
                      <select
                        className="border-black  h-10 border px-2 pro rounded-md bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleAccountNumberChange}
                        type="text"
                        value={selectedAccountNumber}
                        placeholder="Bank Account Number"
                        name="bankAccountNumber"
                        required
                      >
                        <option value="">Select an account number</option>
                        {banks
                          .filter(
                            (item) =>
                              item.bankname === selectedBank &&
                              item.ifsc === selectedIFSC
                          )
                          .map((item) => (
                            <option
                              key={item.accountnumber}
                              value={item.accountnumber}
                            >
                              {item.accountnumber}
                            </option>
                          ))}
                      </select>
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
export default Promoter;
