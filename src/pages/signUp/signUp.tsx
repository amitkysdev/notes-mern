import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { EyeSlashFilledIcon } from "@/pages/login";
import { EyeFilledIcon } from "@/pages/login";
import axiosInstance from "@/utils/axiosInstance";

export default function SignUpUI() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // Extract form data
    const fullName = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axiosInstance.post("/create-user", {
        fullName,
        email,
        password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.clear();
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
        toast.success("Account created!");
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error(error.response.data.message);
      }
      toast.error("Unexpected error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl  font-bold text-center text-primary ">Signup</h1>
      <Form
        className="w-full max-w-md flex items-center justify-center flex-col gap-4  p-8 rounded-3xl"
        validationBehavior="native"
        onSubmit={handleForm}
      >
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
          type="text"
        />

        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          errorMessage="Password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter password"
          type={isVisible ? "text" : "password"}
        />
        <div className="flex gap-2">
          <Button
            type="reset"
            variant="flat"
            onClick={() => toast.success("Reset done")}
          >
            Reset
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
