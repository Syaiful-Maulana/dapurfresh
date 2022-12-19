import { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/userSlice";
import profilePic from "../../assets/profile.jpg";
import Input from "../../components/Input";
import NavHeader from "../../components/Header/NavHeader";
import Button from "../../components/Button";
import SweetAlert from "../../components/SweetAlert";
import Profile from "../../services/api/Profile";
import ReactLoading from "react-loading";

const EditProfile = () => {
  const user = useSelector((state) => state.user.user);
  const { register, handleSubmit, reset, setValue, formState: { errors }, } = useForm();
  const [image, setImage] = useState(user.thumbnail);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const onSubmit = async ({ name, phone_number, address, thumbnail }, e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await Profile.setUser(name, phone_number, address, thumbnail );
      dispatch(setUser(response.data.data))
      setLoading(false);
      await SweetAlert({ title: "Akun Berhasil Diubah", icon: "success" });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (ev) => {
    setImage(URL.createObjectURL(ev.target.files[0]));
    setValue("thumbnail", ev.target.files[0]);
  };

  useEffect(() => {
    reset(user);
  }, [reset]);

  return (
    <main>
      <NavHeader title="Edit Profil" />
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <ReactLoading type="spin" color="#6AA434" height={36} width={36} />
        </div>
      ) : (
        <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="img"
            className="h-[170px] flex justify-center items-center relative"
          >
            <input
              className="hidden"
              id="img"
              type="file"
              accept="image/*"
              name="thumbnail"
              onChange={handleChange}
            />
            <img
              src={image ? image : profilePic}
              className="h-[120px] w-[120px] rounded-full absolute z-0 hover:opacity-25"
              alt="image"
            />
            <div className="flex justify-center items-center opacity-0 w-[120px] h-[120px] rounded-full hover:bg-black hover:bg-opacity-25 hover:opacity-100 duration-300 absolute z-10">
              <FiCamera size={40} />
            </div>
          </label>
          <Input
            type="text"
            placeholder="Nama"
            name="name"
            register={register}
            validation={{ required: "Nama tidak boleh kosong" }}
            isError={errors.name?.type}
          ></Input>
          {errors.name && (
            <span className="mt-2 text-center text-xs text-red-400">
              {errors.name?.message}
            </span>
          )}
          <Input
            type="text"
            placeholder="Telepon"
            name="phone_number"
            register={register}
            validation={{ required: "Nomor Telepon tidak boleh kosong" }}
            isError={errors.phone_number?.type}
          ></Input>
          {errors.phone_number && (
            <span className="mt-2 text-center text-xs text-red-400">
              {errors.phone_number?.message}
            </span>
          )}
          <Input
            type="text"
            placeholder="Alamat"
            name="address"
            register={register}
            validation={{ required: "Alamat tidak boleh kosong" }}
            isError={errors.address?.type}
          ></Input>
          {errors.address && (
            <span className="mt-2 text-center text-xs text-red-400">
              {errors.address?.message}
            </span>
          )}
          <Button type="submit" text="Simpan" customClass="mt-12" />
        </form>
      )}
    </main>
  );
};

export default EditProfile;
