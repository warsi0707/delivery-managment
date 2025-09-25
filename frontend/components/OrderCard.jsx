import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
function OrderCard() {
  return (
    <div className="bg-white border-gray-400 border h-full border-b-red-600 border-b-8 shadow-xl flex flex-col gap-5 w-72  p-5 rounded-2xl">
      <p className="text-gray-400">status</p>
      <h1 className="text-2xl">Title</h1>
      <div className="space-y-2">
        <div className="flex justify-between items-center  py-2">
          <p>From </p>
          <p>to</p>
        </div>
        <div className="flex justify-between -mt-3">
          <p className="text-2xl rounded-full ">
            <FaArrowCircleRight />
          </p>
          <p className="text-2xl rounded-full ">
            <FaArrowCircleLeft />
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <p className="bg-blue-600 rounded-full p-2 text-xl px-4">S</p>
          <div>
            <p className="text-xl">Samir warsi</p>
            <p>admin</p>
          </div>
        </div>
        <button className="text-2xl cursor-pointer">
          <GrDocumentUpdate />
        </button>
      </div>
      <p></p>
    </div>
  );
}

export default OrderCard;
