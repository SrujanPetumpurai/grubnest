export default function Btn({text,bgColor,svgColor,textColor}:{svgColor:string,text:string,bgColor:string,textColor:string}){
    return(
        <button style={{backgroundColor:bgColor}} className={`z-20 transition duration-200 ease hover:-translate-y-1 relative items-center text-xs md:text-sm w-[80px]  h-[30px] md:w-[130px] md:h-[40px]  border rounded-xl px-2 py-2 flex `}>
            <svg className="size-4 w-[20%]"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <g id="handbag">
      <path
        d="M3.41 7.23H20.59v12a3.23 3.23 0 0 1-3.23 3.23H6.64a3.23 3.23 0 0 1-3.23-3.23v-12Z"
        stroke={`${svgColor}`}
        strokeWidth="2.21"
        strokeMiterlimit="10"
        fill="none"
      />
      <path
        d="M8.18 10.09V5.32A3.82 3.82 0 0 1 12 1.5a3.82 3.82 0 0 1 3.82 3.82v4.77"
        stroke={`${svgColor}`}
        strokeWidth="1.91"
        strokeMiterlimit="10"
        fill="none"
      />
    </g>
  </svg>
           <span className="w-[80%] font-bold"  style={{color:textColor}}>{text}</span>
        </button>
    )
}