import { Span } from "next/dist/trace";
import AddCart from "./AddCart";
import RupeeSymbol from "./RupeeSymbol";

export default function ItemCard({
  id,
  image,
  name,
  category,
  rating,
  cost,
  discount,
  measurement
}: {
  id: string;
  discount?: string;
  image: string;
  name: string;
  category: string;
  rating: number;
  cost: number;
  measurement:string
}) {
  var price
  if(discount){
    price = cost - (((parseFloat(discount.replace('%','')))*cost)/100)
  }
  return (
    <div className="relative flex-col bg-[var(--itemcolor)] border rounded-xl mb-4 mr-6 
                      w-[160px] h-[260px]
                      sm:w-[200px] sm:h-[300px]
                      md:w-[230px] md:h-[350px]
                      lg:w-[270px] lg:h-[400px]">
      {discount && (
        <div className="absolute font-semibold  bg-green-700 text-white text-[10px] font-semibold px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )}

      <img className="w-[90%] mt-3 mx-3
       rounded-md h-[40%] border rounded-lg" src={image} alt={name} />
        <div className="hidden md:flex w-[90%] mx-3 mt-2  justify-between items-center">
          <span className="inline-block  text-sm text-gray-400">
            {category}
          </span>
          <span className="inline-block  ">
          <Rating rating={rating} />
        </span>
       </div>
      <span className="w-[90%] mx-3 mt-1 md:mt-4 inline-block  text-teal-800 text-sm md:text-lg font-semibold">
        {name}
      </span>
      <span className=" inline-block mt-1 text-sm md:text-lg w-[90%] mx-3 border border-gray-200 pl-3 rounded-md bg-gray-100/50">{measurement}</span>
      <span className="  inline-flex mt-1 md:mt-8 text-sm md:text-lg w-[90%] mx-3 font-semibold">
        <RupeeSymbol />
        {discount?<div>
          <span className="text-sm md:text-lg mr-2 font-semibold">{price}</span>
          <span className="line-through text-sm  text-gray-500">{cost}</span>
        </div> :<span>{cost}</span> }
      </span>

      <div className="flex items-center justify-between mt-5 w-[90%] mx-3">
        <span className="inline-block">
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" opacity="0" />
            <path d="M6.09 21.06a1 1 0 0 1-1-1L4.94 5.4a2.26 2.26 0 0 1 2.18-2.35L16.71 3a2.27 2.27 0 0 1 2.23 2.31l.14 14.66a1 1 0 0 1-.49.87 1 1 0 0 1-1 0l-5.7-3.16-5.29 3.23a1.2 1.2 0 0 1-.51.15zm5.76-5.55a1.11 1.11 0 0 1 .5.12l4.71 2.61-.12-12.95c0-.2-.13-.34-.21-.33l-9.6.09c-.08 0-.19.13-.19.33l.12 12.9 4.28-2.63a1.06 1.06 0 0 1 .51-.14z" />
          </svg>
        </span>
        <AddCart cl="white" bg="#7BF1A8" id={id} Inquantity={0} />
      </div>
    </div>
  );
}

export function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center bg-green-300/50 pl-[3px ] rounded-lg  w-[37px]">
      <svg
        className="w-3 h-3 text-yellow-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
      </svg>
      <p className="text-xs font-bold text-heading">{rating}</p>
    </div>
  );
}
