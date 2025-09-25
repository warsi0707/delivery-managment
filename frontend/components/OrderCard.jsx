import Link from "next/link";
import { memo } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";

function OrderCard({item}) {
  return (
    <Link href={`/order/${item._id}`} className={`${item?.status ==="PENDING"? "border-b-yellow-600": "border-b-blue-500"} ${item?.status === 'DELIVERED' && "border-b-green-600" } bg-white border-gray-400 border h-full  border-b-8 shadow-xl flex flex-col gap-5 w-72  p-5 rounded-2xl`}>
      <p className={`${item?.status ==="PENDING"? "bg-yellow-600": "bg-blue-500"} ${item?.status ==="DELIVERED" && "bg-green-600"} text-black w-32 text-center py-1 rounded-md`}>{item.status}</p>
      <h1 className="text-2xl">{item.title}</h1>
      <div className="space-y-2">
        <div className="flex justify-between items-center  py-2">
          <p>{item.pickupLocation} </p>
          <p>{item.dropLocation}</p>
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
          <p className="bg-blue-600 rounded-full p-2 text-xl px-4">{item.assignBy.username.split('')[0].toUpperCase()}</p>
          <div>
            <p className="text-xl">{item.assignBy.username}</p>
            <p>{item.assignTo.username}</p>
          </div>
        </div>
        <button className="text-2xl cursor-pointer">
          <GrDocumentUpdate />
        </button>
      </div>
      <p></p>
    </Link>
  );
}

export default memo(OrderCard);
