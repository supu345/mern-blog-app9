import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DasboardLayout";
import UserStore from "../../store/UserStore";
import { AiOutlineDelete } from "react-icons/ai";

const ContactList = () => {
  const { ContactList, ContactListRequest } = UserStore();

  useEffect(() => {
    (async () => {
      await ContactListRequest();
    })();
    console.log(ContactList);
  }, [ContactListRequest]);

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
