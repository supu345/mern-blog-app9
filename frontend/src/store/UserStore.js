import { create } from "zustand";
import axios from "axios";
import { getEmail, setEmail, unauthorized } from "../utility/utility.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const UserStore = create((set) => ({
  isLogin: () => {
    const token = Cookies.get("token");
    console.log("Token:", token); // Debugging line
    return !!token;
  },

  getRole: () => {
    const token = Cookies.get("token");
    const decodeToken = jwtDecode(token);

    return decodeToken.role;
  },

  /////////////////
  // user: null,
  // isLogin: () => !!localStorage.getItem("token"), // Example logic for login status
  // getUserRole: () => localStorage.getItem("role"), // Example logic to get user role

  /////////////////
  LoginFormData: { email: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      LoginFormData: {
        ...state.LoginFormData,
        [name]: value,
      },
    }));
  },
  UserOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`/api/v1/UserOTP/${email}`);
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  UserLogoutRequest: async () => {
    set({ isFormSubmit: true });
    let res = await axios.get(`/api/v1/UserLogout`);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  OTPFormData: { otp: "" },
  OTPFormOnChange: (name, value) => {
    set((state) => ({
      OTPFormData: {
        ...state.OTPFormData,
        [name]: value,
      },
    }));
  },
  VerifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });
    let email = getEmail();
    let res = await axios.get(`/api/v1/VerifyLogin/${email}/${otp}`);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  isFormSubmit: false,

  ProfileForm: {
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_phone: "",
    cus_postcode: "",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_country: "",
    ship_name: "",
    ship_phone: "",
    ship_postcode: "",
    ship_state: "",
  },
  ProfileFormChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },

  ProfileDetails: null,
  ProfileDetailsRequest: async () => {
    try {
      let res = await axios.get(`/api/v1/ReadProfile`);
      if (res.data["data"].length > 0) {
        set({ ProfileDetails: res.data["data"][0] });
        set({ ProfileForm: res.data["data"][0] });
      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  ProfileSaveRequest: async (PostBody) => {
    try {
      set({ ProfileDetails: null });
      let res = await axios.post(`/api/v1/UpdateProfile`, PostBody);
      return res.data["status"] === "success";
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  contactFormData: {
    fullname: "",
    email: "",
    subject: "",
    message: "",
  },

  contactFormOnChange: (name, value) => {
    set((state) => ({
      contactFormData: {
        ...state.contactFormData,
        [name]: value, // Make sure to use blogFormData here
      },
    }));
  },

  CreateContactRequest: async (formData) => {
    try {
      let res = await axios.post(`/api/v1/createContact`, formData);
      return res.data; // Ensure the response is in the expected format
    } catch (error) {
      console.error("Error creating contact:", error);
      return { status: "fail", data: error.toString() };
    }
  },

  subscribeFormData: {
    email: "",
  },

  subscribeFormOnChange: (name, value) => {
    set((state) => ({
      subscribeFormData: {
        ...state.subscribeFormData,
        [name]: value,
      },
    }));
  },

  CreateSubscribeRequest: async (formData) => {
    try {
      let res = await axios.post(`/api/v1/createSubscribe`, formData);
      return res.data; // Ensure the response is in the expected format
    } catch (error) {
      console.error("Error creating Subscribe:", error);
      return { status: "fail", data: error.toString() };
    }
  },

  ContactList: null,
  ContactListRequest: async () => {
    try {
      const response = await axios.get("/api/v1/contactList"); // Adjust the endpoint as needed
      if (response.data.status === "success") {
        set({ ContactList: response.data.data });
      } else {
        console.error("Failed to fetch contact list");
      }
    } catch (error) {
      console.error("Error fetching contact list:", error);
    }
  },
}));

export default UserStore;
