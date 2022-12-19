import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getUser } from "../../features/userSlice";
import bg from "../../assets/blob.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Auth from "../../services/api/Auth";
import ReactLoading from "react-loading";
import SweetAlert from "../../components/SweetAlert";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors },} = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onLogin = async ({ username, password }, e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await Auth.login(username, password);
      await SweetAlert({
        title: "Selamat Anda Berhasil Log In",
        icon: "success",
      });
      setLoading(false);
      navigate("/");
      dispatch(getUser(response.data.data.user));
    } catch (error) {
      setLoading(false);
      await SweetAlert({
        title: "Username atau Password Salah",
        icon: "error",
      });
    }
  };

  return (
    <>
      {loading === true ? (
        <div className="flex justify-center items-center h-screen">
          <ReactLoading type="spin" color="#6AA434" height={36} width={36} />
        </div>
      ) : (
        <div>
          <div
            className="h-[228px] bg-cover bg-no-repeat px-[30px] pt-[39px] text-white md:h-[218.8px] -mx-[15px] -mt-5"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <h1 className="text-xl font-semibold">Selamat datang di</h1>
            <h1 className="text-[22px] font-bold">dapurfresh.ID</h1>
          </div>
          <div className="bg-white text-center mx-2.5 mt-10 py-5 px-3 rounded-lg shadow-[0_0_2px_0px_rgba(0,0,0,0.2)] text-secondary">
            <h2 className="text-xl font-semibold mb-5">Masuk</h2>
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="flex flex-col">
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  location="auth"
                  register={register}
                  validation={{ required: "Username tidak boleh kosong" }}
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
                  validation={{ required: "Username tidak boleh kosong" }}
                  isError={errors.username?.type}
                />
                {errors.password && (
                  <span className="mt-2 text-center text-xs text-red-400">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                text="Masuk"
                customClass="mt-5 rounded-full"
              />
            </form>
            <p className="mt-3 text-xs text-gray-400">
              Belum punya akun? Daftar{" "}
              <Link className="text-red-400" to="/register">
                Di sini
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
