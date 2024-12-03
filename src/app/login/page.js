"use client";

import {
  TbExclamationCircle,
  TbLoader,
  TbLock,
  TbLockOpen,
  TbUser,
} from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ApiLogin } from "./auth";
import { notificationError } from "@/components/toastNotification";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Login() {
  useAuth("login");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (value) => {
    setIsLoading(true);
    try {
      const { data, status } = await ApiLogin(value);
      if (status == 200) {
        const user = {
          email: value.email,
          token: data.token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/")
      }

    } catch (error) {
      console.log(error);
      notificationError(error.response?.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ label, type, name, icon: Icon }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-bTextPrimary">{label}</label>
      <div
        className={`flex items-center border rounded-lg overflow-hidden ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      >
        <button
          type="button"
          onClick={type === "password" ? togglePasswordVisibility : null}
          className="p-2 bg-primary text-slate-200 rounded-l-md"
        >
          <Icon size={20} />
        </button>
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={`Enter your ${label}`}
          className="w-full bg-transparent py-2 px-3 text-bTextPrimary outline-none text-sm"
          {...register(name, { required: `${label} harap diisi` })}
        />
        {errors[name] && (
          <TbExclamationCircle size={15} color="red" className="mr-2" />
        )}
      </div>
      {errors[name] && (
        <span className="text-xs text-red-500">{errors[name].message}</span>
      )}
    </div>
  );

  const SubmitButton = ({ label, onClick }) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full md:w-1/2 mt-4 font-semibold py-2 px-4 flex justify-center bg-blue-600 text-slate-200 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isLoading ? <TbLoader size={24} className="animate-spin" /> : label}
    </button>
  );

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-full max-w-4xl">
        {/* Left Side - Logo */}
        <div className="flex items-center justify-center p-4">
          <div className="flex items-center gap-4">
            <img src="/images/logoPtXapiens.png" alt="Logo" className="h-40" />
            {/* <div>
              <h1 className="text-6xl font-bold text-bTextPrimary">SIGAP</h1>
              <p className="text-xl font-bold text-bTextPrimary">
                Sistem Informasi Gabungan Administrasi Protokol
              </p>
            </div> */}
          </div>
        </div>

        {/* Right Side - Login */}
        <div className="flex flex-col items-center justify-center p-4">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full space-y-4"
          >
            <InputField label="Email" type="text" name="email" icon={TbUser} />
            <InputField
              label="Password"
              type="password"
              name="password"
              icon={showPassword ? TbLockOpen : TbLock}
            />

            <div className="flex justify-between items-center text-bTextPrimary text-sm mt-2">
              {/* <Checkbox size="xs" label="Ingat Kata Sandi" /> */}
              <button type="button" className="hover:underline">
                Lupa Kata Sandi?
              </button>
            </div>
            <div className="flex flex-col  items-end ">
              <SubmitButton label="Login" />
              {/* <SubmitButtonQR
								label="Login dengan QR"
								onClick={() => {
									handleCreateQR();
									setLoginMethod("qr");
								}}
							/> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
