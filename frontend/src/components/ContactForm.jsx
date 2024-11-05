import Subscribe from "./Subscribe ";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty, SuccessToast } from "../Helper/ValidationHelper";

import UserStore from "../store/UserStore";

const ContactForm = () => {
  let navigate = useNavigate();

  const { CreateContactRequest, contactFormData, contactFormOnChange } =
    UserStore();

  const SaveData = async () => {
    if (IsEmpty(contactFormData.fullname)) {
      ErrorToast("fullname is required");
    } else if (IsEmpty(contactFormData.email)) {
      ErrorToast("email is required");
    } else if (IsEmpty(contactFormData.subject)) {
      ErrorToast("subject is required");
    } else if (IsEmpty(contactFormData.message)) {
      ErrorToast("message is required");
    } else {
      const result = await CreateContactRequest(contactFormData);
      console.log(result); // Log the full response for debugging
      // Adjust the success check based on the response structure
      if (result.message === "Contact form submitted successfully") {
        SuccessToast("Data saved successfully");
        navigate("/");
      } else {
        ErrorToast("Request failed, please try again");
      }
    }
  };

  return (
    <div className="dark:bg-black dark:text-white">
      <div className="flex flex-row  px-8 pt-[110px] pb-[90px]">
        <div className="w-1/2 bg-slate-100 rounded-l-xl dark:bg-black dark:text-white">
          <p className="text-5xl font-bold pt-[60px] pl-[60px] mb-6">
            Contact us
          </p>

          <p className="text-normal pl-[60px] pr-12">
            Hello! Do you have any questions or suggestions about this site, or
            just want to say Hi? Send a message using the below form. I will get
            back to you as soon as possible.
          </p>
          <form className="pl-[60px] pr-12 ">
            {/* Full Name */}
            <div className="mb-9 mt-9">
              <input
                value={contactFormData.fullname}
                onChange={(e) =>
                  contactFormOnChange("fullname", e.target.value)
                }
                type="text"
                id="fullname"
                className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full name"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                value={contactFormData.email}
                onChange={(e) => contactFormOnChange("email", e.target.value)}
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>

            {/* Subject */}
            <div className="mb-9  mt-9">
              <input
                value={contactFormData.subject}
                onChange={(e) => contactFormOnChange("subject", e.target.value)}
                type="text"
                id="subject"
                className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <textarea
                value={contactFormData.message}
                onChange={(e) => contactFormOnChange("message", e.target.value)}
                id="message"
                className="w-full border border-gray-300 rounded-lg px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Message"
                rows="5"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={SaveData}
              className="w-full bg-blue-500 text-white rounded-full px-5 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-1/2">
          <img
            src="https://images.pexels.com/photos/590042/pexels-photo-590042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="h-[700px] w-[900px] object-cover rounded-r-xl"
          />
        </div>
      </div>

      <Subscribe />
    </div>
  );
};

export default ContactForm;
