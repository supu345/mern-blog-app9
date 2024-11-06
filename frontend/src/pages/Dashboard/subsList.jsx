import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DasboardLayout";
import Swal from "sweetalert2";
import { DeleteAlert } from "../../helper/DeleteAlert.js";
import { AiOutlineDelete } from "react-icons/ai";
import UserStore from "../../store/UserStore.js";
const SubscribeList = () => {
  const { SubscribeList, SubscribeListRequest } = UserStore();

  useEffect(() => {
    (async () => {
      await SubscribeListRequest();
    })();
    //   console.log(ContactList);
  }, [SubscribeListRequest]);

  const deleteSubscribe = async (id) => {
    const { DeleteSubscribeRequest, SubscribeListRequest } =
      UserStore.getState();
    const result = await DeleteAlert(); // Confirm deletion with the user

    if (result.isConfirmed) {
      try {
        const response = await DeleteSubscribeRequest(id);

        if (response.status === "success") {
          await Swal.fire("Deleted!", "Your blog has been deleted.", "success");
          console.log("Subscribe deleted successfully:", response.data);
          await SubscribeListRequest();
        } else {
          await Swal.fire(
            "Failed!",
            "There was an issue deleting the blog.",
            "error"
          );
          console.log("Failed to delete blog:", response.data);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        await Swal.fire(
          "Error!",
          "A network error occurred. Please try again later.",
          "error"
        );
      }
    } else {
      console.log("Blog deletion was cancelled by the user.");
    }
  };
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4">
        <h5 className="text-2xl pb-2 font-semibold hover:text-orange-500 text-center">
          Subscribe List
        </h5>
        <table className="min-w-full border border-gray-900 border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-3 border border-gray-900 text-left">Sl No</th>

              <th className="p-3 border border-gray-900 text-left">Email</th>
              <th className="p-3 border border-gray-900 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(SubscribeList) && SubscribeList.length > 0 ? (
              SubscribeList.map((subscribe, index) => (
                <tr key={subscribe.id || index} className="border-t">
                  <td className="p-3 border border-gray-900">{index + 1}</td>

                  <td className="p-3 border border-gray-900">
                    {subscribe.email}
                  </td>

                  <td className="p-3 border border-gray-900 text-center">
                    <button
                      onClick={() => deleteSubscribe(subscribe._id)}
                      className="btn text-danger p-2 mb-0 btn-sm ml-2 hover:text-red-700"
                    >
                      <AiOutlineDelete size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No contacts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default SubscribeList;
