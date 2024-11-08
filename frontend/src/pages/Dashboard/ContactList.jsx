import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DasboardLayout";
import UserStore from "../../store/UserStore";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { DeleteAlert } from "../../helper/DeleteAlert.js";
const ContactList = () => {
  const { ContactList, ContactListRequest } = UserStore();

  useEffect(() => {
    (async () => {
      await ContactListRequest();
    })();
    console.log(ContactList);
  }, [ContactListRequest]);

  const deleteBlog = async (id) => {
    const { DeleteContactRequest, ContactListRequest } = UserStore.getState();
    const result = await DeleteAlert(); // Confirm deletion with the user

    if (result.isConfirmed) {
      try {
        const response = await DeleteContactRequest(id);

        if (response.status === "success") {
          await Swal.fire("Deleted!", "Your blog has been deleted.", "success");
          console.log("Contact deleted successfully:", response.data);
          await ContactListRequest(); // Refresh the blog list
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
          Contact List
        </h5>
        <table className="min-w-full border border-gray-900 border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-3 border border-gray-900 text-left">Sl No</th>
              <th className="p-3 border border-gray-900 text-left">
                Full Name
              </th>
              <th className="p-3 border border-gray-900 text-left">Email</th>
              <th className="p-3 border border-gray-900 text-left">Subject</th>
              <th className="p-3 border border-gray-900 text-left">Message</th>
              <th className="p-3 border border-gray-900 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(ContactList) && ContactList.length > 0 ? (
              ContactList.map((contact, index) => (
                <tr key={contact.id || index} className="border-t">
                  <td className="p-3 border border-gray-900">{index + 1}</td>
                  <td className="p-3 border border-gray-900">
                    {contact.fullname}
                  </td>
                  <td className="p-3 border border-gray-900">
                    {contact.email}
                  </td>
                  <td className="p-3 border border-gray-900">
                    {contact.subject}
                  </td>
                  <td className="p-3 border border-gray-900">
                    {contact.message}
                  </td>
                  <td className="p-3 border border-gray-900 text-center">
                    <button
                      onClick={() => deleteBlog(contact._id)}
                      className="btn text-danger p-2 mb-0 btn-sm ml-2 hover:text-red-700"
                      // onClick={() => deleteBlog(blog._id)}
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

export default ContactList;
