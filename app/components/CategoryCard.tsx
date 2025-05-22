import { StaticImageData } from "next/image";

export default function CategoryCard({name,img}:{name:string,img:string | StaticImageData}){
return(
      <div className="flex flex-col justify-center items-center w-[90px] h-[70px]">
        <div className="h-[70%]">
        <img className="w-full h-[100%] mb-[5px] object-cover object-center" src={typeof img === 'string' ? img : img.src} alt="" />
        </div>
           <div className="w-full font-bold ">{name}</div>
        </div>
     
    
)
}