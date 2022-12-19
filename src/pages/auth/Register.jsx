import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import bg from "../../assets/blob.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ReactLoading from "react-loading";
import Auth from "../../services/api/Auth";
import SweetAlert from "../../components/SweetAlert";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onRegis = async ({ username, password, ref_code }, e) => {
    setLoading(true);
    try {
      e.preventDefault()
      await Auth.register(username, password, ref_code)
      await SweetAlert({title: 'Akun Berhasil Dibuat', icon: 'success'})
      setLoading(false)
      navigate("/login")
    } catch (error) {
      setLoading(false)
      console.log(error)
      await SweetAlert({title: 'Akun Gagal Dibuat', icon: 'error'})
    }
  };

  return (
    <>
      {loading === true ? (
        <div className="flex justify-center items-center h-screen">
          <ReactLoading type="spin" color="#6AA434" height={36} width={36} />
        </div>
      ) : (
        <>
          <div
            className="h-[228px] bg-cover bg-no-repeat px-[30px] pt-[39px] text-white md:h-[218.8px] -mx-[15px] -mt-5"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <h1 className="text-xl font-semibold">Selamat datang di</h1>
            <h1 className="text-[22px] font-bold">dapurfresh.ID</h1>
          </div>
          <div className="bg-white text-center mx-2.5 mt-10 py-5 px-3 rounded-lg shadow-[0_0_2px_0px_rgba(0,0,0,0.2)] text-secondary">
            <h2 className="text-xl font-semibold mb-5">Daftar</h2>
            <form onSubmit={handleSubmit(onRegis)}>
              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  location="auth"
                  register={register}
                  validation={{
                    required: "Username tidak boleh kosong",
                  }}
                  isError={errors.username?.type}
                />
                {errors.username && (
                  <span className="mt-2 text-center text-xs text-red-400">
                    {errors.username?.message}
                  </span>
                )}
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  location="auth"
                  register={register}
                  validation={{
                    required: "Password tidak boleh kosong",
                    pattern: {
                      value : /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
                      message : "Password tidak valid"
                    }
                  }}
                  isError={errors.password?.type}
                />
                {errors.password && (
                  <span className="mt-2 text-center text-xs text-red-400">
                    {errors.password?.message}
                  </span>
                )}
                <Input
                  type="text"
                  placeholder="Kode Referral"
                  name="referral"
                  location="auth"
                  register={register}
                  isError={errors.referral?.type}
                />
                {errors.referral && (
                  <span className="mt-2 text-center text-xs text-red-400">
                    {errors.referral?.message}
                  </span>
                )}
                <ul className="text-left text-[10px] text-gray-400 list-disc ml-5 mt-4">
                  <li>Panjang Password minimal 6 karakter</li>
                  <li>Harus terdiri dari huruf kapital, angka dan simbol</li>
                </ul>
              </div>
              <Button
                type="submit"
                text="Daftar"
                customClass="mt-5 rounded-full"
              />
            </form>
            <p className="mt-3 text-xs text-gray-400">
              Sudah punya akun? Login{" "}
              <Link className="text-red-400" to="/login">
                Di sini
              </Link>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
