import OrderCard from "@/components/OrderCard";
export default function AdminDashboard() {
  
  return (
    <div className='min-h-screen w-full p-10 px-40 flex flex-wrap justify-between gap-5 '>
      <OrderCard/>
      <OrderCard/>
      <OrderCard/>
      <OrderCard/>
      <OrderCard/>
      <OrderCard/>
      <OrderCard/>
    </div>
  )
}
