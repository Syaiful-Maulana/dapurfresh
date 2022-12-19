import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { IoMdBookmarks } from "react-icons/io";
import { MdOutlinePrivacyTip, MdOutlineInfo } from "react-icons/md";
import { useSelector } from "react-redux";
import profilePic from "../../assets/profile.jpg";
import LOCAL_STORAGE from "../../services/localStorage";

const Profile = () => {
  const user = useSelector((state) => state.user.user)
  let navigate = useNavigate()

  const onLogout = () => {
    LOCAL_STORAGE.clearLocalStorage();
    navigate("/login")
  };

  return (
    <main>
      {user ? (
        <div className="p-5 flex items-center text-secondary">
          <img
            className="h-[70px] w-[70px] rounded-full"
            src={user.thumbnail ? user.thumbnail : profilePic}
            alt="profile"
          />
          <div className="ml-4">
            <h4 className="text-lg font-bold">
              {user.name ? user.name : "No Name"}
            </h4>
            <Link to="/profile/edit" className="text-sm">
              Edit Profil <FiChevronRight className="inline" size={18} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="py-10 text-center">
          <h3 className="font-medium mb-3 text-secondary">Bergabunglah untuk kenikmatan yang lebih banyak</h3>
          <button className="bg-primary rounded-md py-2 px-4 mr-3 text-white font-medium text-sm" onClick={()=> navigate("/login")}>Masuk</button>
          <button className="bg-primary rounded-md py-2 px-4 text-white font-medium text-sm" onClick={()=> navigate("/register")}>Daftar</button>
        </div>
      )}
      <ul role="list" className="p-5 text-secondary">
        <li className="flex flex-row">
          <IoMdBookmarks size={24} />
          <div className="basis-11/12 ml-5 pb-4 border-b border-[#c4c4c4] flex justify-between">
            <p className="text-sm font-medium">Syarat Penggunaan</p>
            <FiChevronRight size={24} color="#888888" />
          </div>
        </li>
        <li className="flex flex-row items-center">
          <MdOutlinePrivacyTip size={24} />
          <div className="basis-11/12 ml-5 py-4 border-b border-[#c4c4c4] flex justify-between">
            <p className="text-sm font-medium">Kebijakan Privasi</p>
            <FiChevronRight size={24} color="#888888" />
          </div>
        </li>
        <li className="flex flex-row items-center">
          <MdOutlineInfo size={24} />
          <div className="basis-11/12 ml-5 py-4 border-b border-[#c4c4c4] flex justify-between">
            <p className="text-sm font-medium">Tentang Kami</p>
            <FiChevronRight size={24} color="#888888" />
          </div>
        </li>
      </ul>
      <div className="mx-5 mt-10">
        <button
          className={`${
            user
              ? "w-full py-3.5 border border-danger rounded-md text-danger text-sm font-semibold hover:bg-danger hover:text-white"
              : "hidden"
          }`}
          onClick={onLogout}
        >
          Log Out
        </button>
      </div>
    </main>
  );
};

export default Profile;
