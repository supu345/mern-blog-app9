import React from "react";
import toast from "react-hot-toast";
import UserStore from "../store/UserStore";
import ValidationHelper from "../utility/ValidationHelper";
import { useNavigate } from "react-router-dom";
import UserSubmitButton from "../components/UserSubmitButton";
const LoginForm = () => {
  let navigate = useNavigate();
  let { LoginFormData, LoginFormOnChange, UserOTPRequest } = UserStore();

  const onFormSubmit = async () => {
    if (!ValidationHelper.IsEmail(LoginFormData.email)) {
      toast.error("Valid Email Address Required");
    } else {
      let res = await UserOTPRequest(LoginFormData.email);
      res ? navigate("/otp") : toast.error("Something went wrong");
    }
  };
  return (
    <div className="dark:bg-black dark:text-white">
      <div className="flex flex-row gap-5">
        <div className="w-1/2 text-center mt-[100px]">
          <p className="text-4xl font-bold mb-6">Blog App</p>
          <p className="text-3xl font-bold mb-6">Enter your Email</p>
          <p className="text-xl mb-6">
            A verification code will be sent to the email address you provide
          </p>

          <form className="w-full">
            <div className="py-5">
              <div className="px-[150px]">
                <input
                  value={LoginFormData.email}
                  onChange={(e) => {
                    LoginFormOnChange("email", e.target.value);
                  }}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className=" w-full px-6 py-3 pr-24 mb-6 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="ml-[150px]">
                <UserSubmitButton
                  onClick={onFormSubmit}
                  submit={false}
                  className="w-[330px] mb-6 right-0 top-0 mt-1.5 mr-2 ml-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-bold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  text="Next"
                />
              </div>

              <p className="text-xl mb-9">
                Don't have an account yet?
                <span className="hover:underline hover:text-blue-600">
                  {" "}
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <img
            src="https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="object-cover h-[540px] w-[610px]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
