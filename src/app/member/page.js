"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { toast } from "react-toastify";
import axios from "axios";
import "../signup/loader.css";

const Member = () => {
  const [Nominee1, setdefault1] = useState(false);
  const [Nominee2, setdefault2] = useState(false);
  const [Nominee3, setdefault3] = useState(false);
  const [getpaymode, setpaymode] = useState({ paymode: "cash" });
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedIFSC, setSelectedIFSC] = useState("");
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState({});
  const [banks, setBanks] = useState([]);
  const [formData, setFormData] = useState({
    membershipNumber: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birth: "",
    father: "",
    mother: "",
    gender: "",
    martial: "",
    spouse: "",
    email: "",
    phone: "",
    aadhar: "",
    pan: "",
    voter: "",
    ration: "",
    area: "",
    landmark: "",
    post: "",
    dist: "",
    state: "",
    pincode: "",

    name1: "",
    aadhar1: "",
    email1: "",
    pan1: "",
    phone1: "",
    relation1: "",
    voter1: "",
    ration1: "",

    name2: "",
    aadhar2: "",
    email2: "",
    pan2: "",
    phone2: "",
    relation2: "",
    voter2: "",
    ration2: "",

    name3: "",
    aadhar3: "",
    email3: "",
    pan3: "",
    phone3: "",
    relation3: "",
    voter3: "",
    ration3: "",
  });
  const [payment, setPayment] = useState({
    membershipNumber: "",
    selectedBank: "",
    sharePurchaseAmount: "10",
    membershipCharge: "25",
    promoter: "",
    numberOfShares: "",
    paymode: "cash",
    BankName: "",
    total: "",
  });
  const [cash, setCash] = useState({
    amount: "",
    transactiondate: Date.now(),
    shareamount: null,
    membershipamount: "",
    membershipNumber: "",
  });
  const [promoters, setPromoters] = useState([]);

  const nominee1 = () => {
    if (Nominee1 === true) {
      setdefault1(false);
    } else {
      setdefault1(true);
    }
  };
  const nominee2 = () => {
    if (Nominee2 === true) {
      setdefault2(false);
    } else {
      setdefault2(true);
    }
  };
  const nominee3 = () => {
    if (Nominee3 === true) {
      setdefault3(false);
    } else {
      setdefault3(true);
    }
  };

  const handleError = (e) => {
    if (e.target.name === "firstName" || e.target.name === "lastName") {
      let p = /[a-zA-Z]{2,10}/;
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: " name required" });
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
    } else if (e.target.name === "date") {
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "please enter your DOB" });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "father" || e.target.name === "mother") {
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
      let p = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
    } else if (e.target.name === "phone") {
      let p = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter phone number" });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "enter valid mobile no." });
      }
    } else if (e.target.name === "aadhar") {
      let p = /^[1-9]{1}\d{3}\d{4}\d{4}$/;

      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter aadhaar no." });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "enter valid aadhar no." });
      } else {
        setError({ ...getError, [e.target.name]: "" });
      }
    } else if (e.target.name === "pan") {
      let p = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

      if (e.target.value === "") {
        setError({ ...getError, [e.target.name]: "enter pan no." });
      } else if (!p.test(e.target.value)) {
        setError({ ...getError, [e.target.name]: "enter valid pan no." });
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
        setError({ ...getError, [e.target.name]: "enter ration card no." });
      } else if (!p.test(e.target.value)) {
        setError({
          ...getError,
          [e.target.name]: "enter valid ration card no.",
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
    formData.bankName = event.target.value;
    setSelectedIFSC("");
    formData.ifsc = "";
    setSelectedAccountNumber("");
    formData.bankAccountNumber = "";
  };

  const handleIFSCChange = (event) => {
    setSelectedIFSC(event.target.value);
    formData.ifsc = event.target.value;
    setSelectedAccountNumber("");
    formData.bankAccountNumber = "";
  };

  const handleAccountNumberChange = async (event) => {
    const accountNumber = event.target.value;
    setSelectedAccountNumber(accountNumber);
    formData.bankAccountNumber = accountNumber;

    await axios
      .post("/api/chequeOrOnline/getBankBalance", {
        bankAccountNumber: accountNumber,
      })
      .then((response) => {
        const oldBalance = response.data.balance;
        console.log(oldBalance);
        setFormData((prevData) => ({
          ...prevData,
          balance: oldBalance,
        }));
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePayChange = async (e) => {
    const { name, value } = e.target;
    setPayment((prevData) => ({ ...prevData, [name]: value }));
    if (name === "paymode") setpaymode({ paymode: value });
  };
  const handleCashChange = async (e) => {
    const { name, value } = e.target;
    setCash((prevData) => ({ ...prevData, [name]: value }));
    if (name === "paymode") setpaymode({ paymode: value });
  };

  function generateTimestampOrderedStrings(prefix) {
    const timestamp = Date.now();
    const formattedTimestamp = prefix + timestamp.toString().slice(0, 10);
    return formattedTimestamp;
  }

  const [p, setP] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      cash.membershipNumber = formData.membershipNumber;
      cash.amount = payment.amount;
      cash.membershipamount = payment.membershipCharge;
      cash.shareamount = payment.sharePurchaseAmount;
      console.log(formData);
      console.log(getpaymode);
      console.log(cash);
      console.log(payment);

      const createMember = async () => {
        toast("Creating member");
        return axios.post("/api/member/createMember", formData).then(
          ({ data: { error, doc } }) => {
            if (error) {
              toast("Unable to create member");
              console.log("Error", { error });
              return { error };
            } else {
              toast("Member created successfully");
              return { doc };
            }
          },
          (error) => {
            toast("Create member api call rejected");
            return { error };
          }
        );
      };

      const detuctShares = async () => {
        // toast("share transaction initiated");
        return axios
          .post("/api/promoter/addpromoterShares", {
            transactionID: generateTimestampOrderedStrings("TRN-PTM-"),
            promoterName: payment.promoter,
            membershipNumber: formData.membershipNumber,
            sharesLeft: p[payment.promoter] - payment.numberOfShares,
            sharesSold: payment.numberOfShares,
          })
          .then(
            ({ data: { error, doc } }) => {
              if (doc) {
                // toast("Share transaction successful");
                return { doc };
              } else {
                // toast("Rejected by api");
                return { error };
              }
            },
            () => {
              // toast("add promoter share api error");
              return { error: "Unable to sell shares at this moment" };
            }
          );
      };

      const newSharesLeft = p[payment.promoter] - payment.numberOfShares;
      if (newSharesLeft < 0) {
        toast.error("Cannot debit more shares than available");
        return;
      }

      createMember().then(({ error, doc }) => {
        if (doc) {
          toast("Initiating share transaction");
          detuctShares().then(({ error, doc: d }) => {
            if (error) {
              toast("share transaction failed, rolling back member creation");
              axios
                .post("/api/member/deleteMember", { _id: doc._id })
                .then(({ data: { success, error } }) => {
                  if (success) {
                    toast("Member deleted successfully");
                  } else {
                    toast("Unable to delete member");
                    console.log({ error });
                  }
                });
            } else {
              toast("Share debited successfully, adding to member");
              axios
                .post("/api/membership/addMembership", {
                  membershipCharge: payment.membershipCharge,
                  membershipNumber: formData.membershipNumber,
                  numberofShares: payment.numberOfShares,
                  shareValue: payment.sharePurchaseAmount,
                })
                .then(
                  ({ data: { error, doc } }) => {
                    if (doc) {
                      toast("Shares credited successfully");
                      return;
                    } else {
                      toast(
                        "Unable to credit shares at this moment, wait for some time"
                      );
                      return;
                    }
                  },
                  () => {}
                );
            }
          });
        } else {
        }
      });

      /*   const recordTransaction = async () => {
        if (getpaymode.paymode === "cash") {

        } else {

        }
      }; */

      /*  await axios.post("/api/member/createMember", formData).then(async () => {
        if (getpaymode.paymode === "cash") {
          try {
            await axios.post("/api/cash/addNewMemberCash", cash);
          } catch (err) {
            console.log(err);
          }
        } else {
          await axios.post("/api/chequeOrOnline/addNewMemberCheque", payment);
        }
      }); */
      // toast.success("Account Created Successfully");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankAccounts = await axios.get("/api/bankAccount/getBankAccount");
        setBanks(bankAccounts.data);
        const membershipNumberData = await axios.get(
          "/api/membership/getMembershipNumber"
        );
        const membershipNumber = membershipNumberData.data.membershipNumber;
        console.log(membershipNumber);
        setFormData((prevData) => ({
          ...prevData,
          membershipNumber: membershipNumber + 1,
        }));
        const promoters = await axios.get("/api/promoter/getPromoterShares");
        console.log(promoters.data);
        setP(promoters.data);
        const arr = [];
        for (let key in promoters.data) {
          arr.push({ name: key, value: promoters.data[key] });
        }
        console.log(arr);
        // console.log();
        setPromoters(() => {
          return arr;
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
        <div className="text-5xl pt-28 mb-8 font-medium text-slate-800 ml-16">
          MEMBER DETAILS
        </div>
        <Line />
        <form className="flex flex-col gap-y-8" onSubmit={submitHandler}>
          <div className="flex flex-row w-11/12 mx-auto">
            <p className="text-xl font-bold text-gray-900 w-1/3 text-left">
              FormData Details
            </p>
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700 whitespace-nowrap">
                    Membership No. <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.membershipNumber}
                    name="membershipNumber"
                    disabled
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                </div>

                <div className="flex  w-2/5">
                  <label
                    className="font-bold text-lg whitespace-nowrap text-gray-700"
                    value={formData.title}
                    onChange={handleInputChange}
                  >
                    Title <span className="text-red-600">*</span>
                  </label>

                  <input
                    onChange={handleInputChange}
                    value="mr"
                    type="radio"
                    name="title"
                    className="translate-y-2 mx-1 ml-3 scale-90"
                    //required
                  />
                  <label className="text-xl font-bold text-gray-700">Mr.</label>
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    name="title"
                    className="translate-y-2 mx-1 ml-3 scale-90"
                    value="ms"
                    required
                  />
                  <label className="text-xl font-bold text-gray-700">Ms.</label>
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    First Name <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    type="text"
                    name="firstName"
                    // pattern="[a-zA-Z]{2}"
                    required
                    value={formData.firstName}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error text-red-600">{getError.name}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Middle Name
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error text-red-600">{getError.IFSC}</span>
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Last Name <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    //onBlur={(e) => handleError(e)}
                    required
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error text-red-600">{getError.IFSC}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    {" "}
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    type="date"
                    name="birth"
                    required
                    value={formData.birth}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 text-gray-700 cursor-pointer font-semibold"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Fathers Name <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    // pattern="^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$"
                    type="text"
                    name="father"
                    required
                    value={formData.father}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error text-red-600">{getError.father}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Mothers Name <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    // pattern="^([a-zA-Zà-úÀ-Ú]{2,})+\s+([a-zA-Zà-úÀ-Ú\s]{2,})+$"
                    type="text"
                    name="mother"
                    required
                    value={formData.mother}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error text-red-600">{getError.mother}</span>
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex  w-2/5">
                  <label
                    className="font-bold text-lg whitespace-nowrap text-gray-700"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    Gender <span className="text-red-600">*</span>
                  </label>

                  <input
                    onChange={handleInputChange}
                    type="radio"
                    name="gender"
                    value="Male"
                    required
                    className="translate-y-2 mx-1 ml-3 scale-90"
                  />
                  <label className="text-xl font-bold text-gray-700">
                    Male
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    name="gender"
                    value="Female"
                    required
                    className="translate-y-2 mx-1 ml-3 scale-90"
                  />
                  <label className="text-xl font-bold text-gray-700">
                    Female
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    name="gender"
                    value="Transgender"
                    required
                    className="translate-y-2 mx-1 ml-3 scale-90"
                  />
                  <label className="text-xl font-bold text-gray-700">
                    Trans
                  </label>
                </div>
                <div className="flex  w-2/5">
                  <label
                    className="font-bold text-lg whitespace-nowrap text-gray-700"
                    value={formData.martial}
                    onChange={handleInputChange}
                  >
                    Marital Status <span className="text-red-600">*</span>
                  </label>

                  <input
                    onChange={handleInputChange}
                    type="radio"
                    name="martial"
                    value="married"
                    className="translate-y-2 mx-1 ml-3 scale-90"
                  />
                  <label className="text-xl font-bold text-gray-700">
                    Married
                  </label>
                  <input
                    defaultChecked
                    onChange={handleInputChange}
                    type="radio"
                    name="martial"
                    value="unmarried"
                    className="translate-y-2 mx-1 ml-3 scale-90"
                  />
                  <label className="text-xl font-bold text-gray-700">
                    Unmarried
                  </label>
                </div>
              </div>
              {formData.martial === "married" ? (
                <>
                  <div className="font-bold text-lg text-gray-700">
                    Spouse Name
                  </div>
                  <div className="">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      name="spouse"
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
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
                  <label className="font-bold text-lg text-gray-700">
                    Email <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.email}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Mobile Number <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    // pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.phone}</span>
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Aadhar Number <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    // pattern="^[1-9]{1}\d{3}\d{4}\d{4}$"
                    type="number"
                    name="aadhar"
                    required
                    value={formData.aadhar}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.aadhar}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    PAN Number <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    // pattern="^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$"
                    type="text"
                    name="pan"
                    required
                    value={formData.pan}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.pan}</span>
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Voter ID Number <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    // pattern="^([a-zA-Z]){3}([0-9]){7}?$"
                    type="text"
                    name="voter"
                    id=""
                    required
                    value={formData.voter}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.voter}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Ration Card Number <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    pattern="^([a-zA-Z0-9]){8,12}\s*$"
                    type="Number"
                    name="ration"
                    required
                    value={formData.ration}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
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
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Area Locality <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    type="text"
                    name="area"
                    required
                    value={formData.area}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.areal}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Landmark (if any){" "}
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Post <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    type="text"
                    name="post"
                    required
                    value={formData.post}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.post}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    District <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    type="text"
                    name="dist"
                    required
                    value={formData.dist}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.dist}</span>
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    State <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.state}</span>
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Pin Code <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handleInputChange}
                    // pattern="^[1-9]{1}\d{2}\s?\d{3}$"
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  <span className="error">{getError.pincode}</span>
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
                <input
                  onClick={() => nominee1()}
                  className="rounded-md h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold py-2.5 border border-black"
                  type="button"
                  name="nominee1"
                  value="Add Nominee 1"
                />
              </div>

              {Nominee1 === true ? (
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Name:
                      </label>
                      <input
                        onChange={handleInputChange}
                        type="text"
                        name="name1"
                        value={formData.name1}
                        placeholder="Enter Name for Nominee 1"
                        className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Relation:
                      </label>
                      <input
                        onChange={handleInputChange}
                        className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        type="text"
                        value={formData.relation1}
                        name="relation1"
                        placeholder="Enter Relation"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Email
                      </label>
                      <input
                        onChange={handleInputChange}
                        type="email"
                        name="email1"
                        value={formData.email1}
                        placeholder="Enter Email of Nominee 1"
                        className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Mobile Number
                      </label>
                      <input
                        className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="tel"
                        name="phone1"
                        value={formData.phone1}
                        placeholder="Enter Mobile Number of Nominee 1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Aadhar Number
                      </label>
                      <input
                        onChange={handleInputChange}
                        type="number"
                        name="aadhar1"
                        value={formData.aadhar1}
                        placeholder="Enter Aadhar Number of Nominee 1"
                        className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Pan Number
                      </label>
                      <input
                        className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="pan1"
                        value={formData.pan1}
                        placeholder="Enter Pan Number of Nominee 1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-24">
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Ration Card Number
                      </label>
                      <input
                        onChange={handleInputChange}
                        type="text"
                        value={formData.ration1}
                        name="ration1"
                        placeholder="Enter Ration Card Number of Nominee 1"
                        className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="font-bold text-lg text-gray-700">
                        Voter ID
                      </label>
                      <input
                        className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        onChange={handleInputChange}
                        type="text"
                        name="voter1"
                        value={formData.voter1}
                        placeholder="Enter Voter ID of Nominee 1"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="w-[89%]">
                <input
                  onClick={() => nominee2()}
                  className="rounded-md h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold py-2.5 border border-black"
                  type="button"
                  name="nominee2"
                  value="Add Nominee 2"
                />

                {Nominee1 === true && Nominee2 === true ? (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Name
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          name="name2"
                          placeholder="Enter Name for Nominee 2"
                          value={formData.name2}
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Relation
                        </label>
                        <input
                          onChange={handleInputChange}
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          type="text"
                          name="relation2"
                          value={formData.relation2}
                          placeholder="Enter Relation"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Email
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="email"
                          name="email2"
                          value={formData.email2}
                          placeholder="Enter Email of Nominee 2"
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Mobile Number
                        </label>
                        <input
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          onChange={handleInputChange}
                          type="tel"
                          name="phone2"
                          value={formData.phone2}
                          placeholder="Enter Mobile Number of Nominee 2"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Aadhar Number
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="number"
                          name="aadhar2"
                          value={formData.aadhar2}
                          placeholder="Enter Aadhar Number of Nominee 2"
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Pan Number
                        </label>
                        <input
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          onChange={handleInputChange}
                          type="text"
                          name="pan2"
                          value={formData.pan2}
                          placeholder="Enter Pan Number of Nominee 2"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Ration Card Number
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          name="ration2"
                          value={formData.ration2}
                          placeholder="Enter Ration Card Number of Nominee 2"
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Voter ID
                        </label>
                        <input
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          onChange={handleInputChange}
                          type="text"
                          name="voter2"
                          value={formData.voter2}
                          placeholder="Enter Voter ID of Nominee 2"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="w-[89%]">
                <input
                  onClick={() => nominee3()}
                  className="rounded-md h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold py-2.5 border border-black"
                  type="button"
                  name="nominee3"
                  value="Add Nominee 3"
                />

                {Nominee1 === true && Nominee2 === true && Nominee3 === true ? (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Name
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          name="name3"
                          value={formData.name3}
                          placeholder="Enter Name for Nominee 3"
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Relation
                        </label>
                        <input
                          onChange={handleInputChange}
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          type="text"
                          name="relation3"
                          value={formData.relation3}
                          placeholder="Enter Relation"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Email
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="email"
                          name="email3"
                          value={formData.email3}
                          placeholder="Enter Email of Nominee 3"
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Mobile Number
                        </label>
                        <input
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          onChange={handleInputChange}
                          type="tel"
                          name="phone3"
                          value={formData.phone3}
                          placeholder="Enter Mobile Number of Nominee 3"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Aadhar Number
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="number"
                          name="aadhar3"
                          value={formData.aadhar3}
                          placeholder="Enter Aadhar Number of Nominee 3"
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Pan Number
                        </label>
                        <input
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          onChange={handleInputChange}
                          type="text"
                          name="pan3"
                          value={formData.pan3}
                          placeholder="Enter Pan Number of Nominee 3"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-24">
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Ration Card Number
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          name="ration3"
                          value={formData.ration3}
                          placeholder="Enter Ration Card Number of Nominee 3"
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                        />
                      </div>
                      <div className="flex flex-col w-2/5">
                        <label className="font-bold text-lg text-gray-700">
                          Voter ID
                        </label>
                        <input
                          className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                          onChange={handleInputChange}
                          type="text"
                          name="voter3"
                          value={formData.voter3}
                          placeholder="Enter Voter ID of Nominee 3"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Repeat similar structure for nominee2 and nominee3 */}
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
                  <label className="font-bold text-lg text-gray-700">
                    Share Purchase Amount{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handlePayChange}
                    type="number"
                    name="sharePurchaseAmount"
                    required
                    value={payment.sharePurchaseAmount}
                    placeholder="Enter Share Purchase Amount"
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  {/* <span className="error">{getError.areal}</span> */}
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Number of Shares <span className="text-red-600">*</span>
                  </label>
                  <input
                    onChange={handlePayChange}
                    type="number"
                    name="numberOfShares"
                    value={payment.numberOfShares}
                    placeholder="Enter Number of Shares"
                    required
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Membership Charge <span className="text-red-600">*</span>{" "}
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={handlePayChange}
                    type="number"
                    name="membershipCharge"
                    required
                    value={payment.membershipCharge}
                    placeholder="Enter Membership Charge"
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  {/* <span className="error">{getError.post}</span> */}
                </div>
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Promoter <span className="text-red-600">*</span>{" "}
                  </label>
                  <select
                    //onBlur={(e) => handleError(e)}
                    onChange={handlePayChange}
                    type="text"
                    name="promoter"
                    required
                    value={payment.promoter}
                    placeholder="Enter Promoter Name"
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  >
                    <option value="">Select a Name</option>
                    {promoters.map((p) => (
                      <option key={p.name} value={p.name}>
                        {`${p.name}: ${p.value}`}
                      </option>
                    ))}
                  </select>
                  {/* <span className="error">{getError.dist}</span> */}
                </div>
              </div>

              <div className="flex flex-col gap-y-4 w-full">
                <div className="flex flex-row gap-24">
                  <div className="flex flex-col w-2/5">
                    <label className="font-bold text-lg text-gray-700">
                      Pay Mode <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        onChange={(e) => {
                          handlePayChange(e);
                          handleCashChange(e);
                        }}
                        type="radio"
                        name="paymode"
                        value="cash"
                        defaultChecked
                      />
                      <span className="mr-3">Cash</span>
                      <input
                        onChange={(e) => {
                          handlePayChange(e);
                          handleCashChange(e);
                        }}
                        type="radio"
                        name="paymode"
                        value="cheque"
                      />
                      <span className="mr-3">Cheque</span>
                      <input
                        onChange={(e) => {
                          handlePayChange(e);
                          handleCashChange(e);
                        }}
                        type="radio"
                        name="paymode"
                        value="onlineTransaction"
                      />
                      <span>Online</span>
                    </div>
                  </div>

                  {getpaymode.paymode === "cash" ||
                  getpaymode.paymode === "cheque" ? (
                    <></>
                  ) : (
                    // <div className="mt-4">
                    //   <label className="font-bold text-lg text-gray-700">
                    //     Bank Name
                    //   </label>
                    //   <select
                    //     onChange={handleCashChange}
                    //     name="bankname"
                    //     value={cash.bankname}
                    //     className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                    //   >
                    //     <option value="" disabled>
                    //       Select a bank
                    //     </option>
                    //     {banks.map((bank) => (
                    //       <option key={bank._id} value={bank.bankname}>
                    //         {bank.bankname}
                    //       </option>
                    //     ))}
                    //   </select>
                    // </div>
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
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-24">
                <div className="flex flex-col w-2/5">
                  <label className="font-bold text-lg text-gray-700">
                    Total Amount Payable <span className="text-red-600">*</span>
                  </label>
                  <input
                    //onBlur={(e) => handleError(e)}
                    onChange={(e) => {
                      handlePayChange(e);
                      handleCashChange(e);
                    }}
                    type="number"
                    name="total"
                    required
                    value={
                      (payment.total = cash.amount =
                        parseInt(
                          payment.sharePurchaseAmount * payment.numberOfShares
                        ) + parseInt(payment.membershipCharge))
                    }
                    placeholder="Enter Share Purchase Amount"
                    className="rounded-md border border-black px-2 h-10  bg-slate-300 w-full text-gray-700 cursor-pointer font-semibold"
                  />
                  {/* <span className="error">{getError.areal}</span> */}
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
            <button
              type="submit"
              className="bg-red-600 cursor-pointer tracking-wider font-bold w-fit justify-end self-end items-end rounded-lg shadow-xl text-gray-50 px-6 py-1.5 text-xl"
            >
              CREATE
            </button>
          </div>
        </form>
      </>
    </div>
  );
};
export default Member;
