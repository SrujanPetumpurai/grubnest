import { StaticImageData } from "next/image";

export default function CategoryCard({name,img,bgColor}:{bgColor:string,name:string,img:string | StaticImageData}){
return(
      <div className="w-[210px] h-[220px] flex flex-col items-center rounded-3xl relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('/bg_category.jpg')] bg-no-repeat bg-center bg-cover" />
      <div style={{background:bgColor}} className="absolute inset-0 opacity-[0.9]" />

      <div className="relative z-10 p-5 text-white">
        <h3 className="text-lg text-center font-semibold leading-none">{name}</h3>
        <p className="text-sm text-white/80 mt-1">Local Market</p>
      </div>

      <img
        src={`${img}`}
        alt=""
        className="self-center px-4 w-full h-3/4 z-2 "
      />
    </div>
)
}


