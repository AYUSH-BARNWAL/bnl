"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input, Button } from "@nextui-org/react";
import { signupAction } from "../actions";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [formState, formAction] = useFormState(signupAction, {
    message: null,
    success: false,
  });

  const handleSubmit = async (e) => {
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
    // console.log(formState)
    if (formState?.success) {
      toast.success("Signup successful");
      push("/login");
    } else {
      toast.error(formState?.message);
    }
  }, [formState]);

  return (
    <div className="bg-slate-200 h-screen w-screen overflow-hidden">
      <div className="text-center mt-20">
        <h1 className="text-5xl font-semibold">Betiyan Nidhi Limited</h1>
        <p className="text-xl">Signup your account</p>
      </div>

      <form
        className="w-1/4 bg-white rounded-lg shadow-md p-8 mt-10 mx-auto"
        action={formAction}
        onSubmit={handleSubmit}
      >
        {loading ? (
          <div className="text-center py-4">
            <p className="text-black">Signing up. . .</p>
          </div>
        ) : (
          <>
            <Input
              label="Name"
              placeholder="Enter your name"
              isRequired
              name="username"
              // labelPlacement="outside"
              description="Atleast 4 characters long"
              isInvalid={formState?.error?.username}
              errorMessage={formState?.error?.username}
              classNames={{
                // label: "block text-sm font-medium",
                // inputWrapper: "w-full border rounded-lg p-2",
              }}
              className="mb-4"
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              name="email"
              isRequired
              type="email"
              // labelPlacement="outside"
              isInvalid={formState?.error?.email}
              errorMessage={formState?.error?.email}
              classNames={{
                // label: "block font-medium text-sm",
                // inputWrapper: "border w-full rounded-lg p-2",
              }}
              className="mb-4"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              description="Must not be blank"
              //   placeholder="Create password"
              //   labelPlacement="outside"
              isInvalid={formState?.error?.password}
              errorMessage={formState?.error?.password}
              classNames={
                {
                  // label: "block font-medium text-sm",
                  // input: "border w-full rounded-lg p-2",
                  // helperWrapper: "text-xs",
                }
              }
              //   color={formState?.passErr ? "danger" : "success"}
              className="mb-4"
              isRequired
            />

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg"
            >
              Signup
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
