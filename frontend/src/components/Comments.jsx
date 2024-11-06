import React from "react";

const Comments = () => {
  return (
    <div>
      <div className="container ">
        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="image"
            className="h-[50px] w-[50px] rounded-full"
          />
          <div>
            <div className="flex flex-row gap-3">
              <p className="text-md font-bold">John Doe</p>
              <span className="text-normal">10 days ago</span>
              <button className="ml-[160px] text-white bg-red-500 p-1 px-2 rounded-lg mr-2">
                delete
              </button>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium quaerat atque iusto sit cumque minima itaque?
              Recusandae nobis unde quam?
            </p>

            <button className="text-white bg-blue-500 p-1 px-2 mt-3 rounded-lg">
              Reply
            </button>
          </div>
        </div>
        <div className="ml-[70px] mt-7 flex flex-row gap">
          <img
            src="https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="image"
            className="h-[40px] w-[40px] rounded-full"
          />
          <div>
            <textarea
              id="message"
              className="hidden w-full border border-gray-300 rounded-lg px-5 ml-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Message"
              rows="3"
            />
            <div className="px-9">
              <button className="text-white bg-red-500 p-1 px-2 mt-3 rounded-lg mr-2">
                Cancel
              </button>
              <button className="text-white bg-blue-500 p-1 px-2 mt-3 rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="ml-[50px] mt-5 text-xl font-bold">
          Give your comments here
        </p>
        <textarea
          id="message"
          className=" w-full border border-gray-300 rounded-lg px-5 ml-9 mt-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Message"
          rows="5"
        />
        <button className="text-white bg-blue-500 p-1 px-2 mt-3 ml-9 rounded-lg">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Comments;
