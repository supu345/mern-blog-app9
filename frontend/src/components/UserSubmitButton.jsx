import React from "react";
import UserStore from "../store/UserStore";

const UserSubmitButton = (props) => {
  let { isFormSubmit } = UserStore();

  return (
    <button
      onClick={isFormSubmit === false ? props.onClick : null}
      type="submit"
      className={`${props.className} ${
        isFormSubmit ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
      } text-white font-semibold py-2 px-4 rounded flex items-center justify-center`}
      disabled={isFormSubmit}
    >
      {isFormSubmit ? (
        <>
          <div
            className="spinner-border spinner-border-sm border-t-transparent border-white border-2 border-solid rounded-full w-4 h-4 mr-2 animate-spin"
            role="status"
          ></div>
          Processing...
        </>
      ) : (
        props.text
      )}
    </button>
  );
};

export default UserSubmitButton;
