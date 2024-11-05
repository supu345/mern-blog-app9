import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty, SuccessToast } from "../Helper/ValidationHelper";
import UserStore from "../store/UserStore";

const Subscribe = () => {
  let navigate = useNavigate();

  const { CreateSubscribeRequest, subscribeFormData, subscribeFormOnChange } =
    UserStore();

  const SaveData = async () => {
    if (IsEmpty(subscribeFormData.email)) {
      ErrorToast("email is required");
    } else {
      const result = await CreateSubscribeRequest(subscribeFormData);
      console.log(result);

      if (result.message === "subscribe form submitted successfully") {
        SuccessToast("Data saved successfully");
        navigate("/");
      } else {
        ErrorToast("Request failed, please try again");
      }
    }
  };

  return (
    <div className="dark:bg-black dark:text-white">
      <div className="container flex justify-center pt-[70px] ">
        <div className="text-center w-full max-w-md">
          <div className="flex flex-col gap-2 py-[20px] items-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Subscribe to the newsletter
            </h1>
            <p className="text-xl text-black dark:text-white">
              Don't miss anything. Get all the latest posts delivered straight
              to your inbox!
            </p>
            <form className="w-full">
              <div className="py-5">
                <div className="relative">
                  <input
                    value={subscribeFormData.email}
                    onChange={(e) =>
                      subscribeFormOnChange("email", e.target.value)
                    }
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pr-24 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-0 top-0 mt-1.5 mr-2 px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
