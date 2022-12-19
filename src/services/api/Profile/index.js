import axios from "axios";
import API_ENDPOINT from "../API_ENDPOINT";

const Profile = {
  async setUser(name, phone_number, address, thumbnail ) {
    let form = new FormData();
    form.append("name", name);
    form.append("address", address);
    form.append("phone_number", phone_number);
    form.append("image", thumbnail);
    const response = await axios(API_ENDPOINT.USER, {
      method: "put",
      headers: { "Content-Type": "multipart/form-data" },
      data : form,
    });
    return response;
  },
};

export default Profile;
