"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const { push } = useRouter();
  const [formState, formAction] = useFormState(loginAction, {
    message: null,
    success: false,
  });

  const handleSubmit = () => {
    setLoading(true);
  };

  useEffect(() => {
    // console.log(formState);
    setLoading(false);
    if (formState?.success) {
      toast.success("Login successful");
      // TODO: redirect to another page
      //   push("/member");
    } else {
      // if (formState?.message) {
      toast.error(formState?.message);
      // }
    }
  }, [formState]);

  return (
    <div className="bg-slate-200 h-screen w-screen overflow-hidden">
      <div className="text-center mt-20">
        <h1 className="text-5xl font-semibold">Betiyan Nidhi Limited</h1>
        <p className="text-xl text-gray-600">Login to your account</p>
      </div>
      <form
        className="w-1/4 bg-white rounded-lg shadow-md p-8 mt-10 mx-auto"
        autoComplete="off"
        autoFocus
        onSubmit={handleSubmit}
        action={formAction}
      >
        {loading ? (
          <div className="text-center py-4">
            {/* <span className="loader"></span> */}
            <p className="text-black">
              Loggin in <br />
              Please wait.
            </p>
          </div>
        ) : (
          <>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              labelPlacement={"outside"}
              isInvalid={formState?.error?.email}
              errorMessage={formState?.error?.email}
              className="my-12"
              defaultValue={formState?.email}
              isRequired
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              labelPlacement={"outside"}
              isInvalid={formState?.error?.password}
              errorMessage={formState?.error?.password}
              className="mb-4"
              defaultValue={formState?.password}
              isRequired
            />
            <Checkbox
              className="mb-4"
              name="rememberme"
              classNames={{
                label: "text-sm",
              }}
              isSelected={isSelected}
              onValueChange={setIsSelected}
              value={true}
            >
              Remember me
            </Checkbox>
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg"
            >
              Login
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
