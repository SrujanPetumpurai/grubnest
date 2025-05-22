export default function Collection({offers,name,img,bg}:{offers:string,name:string,img:string,bg:string}){
    return(
        <div className="flex justify-between w-[300px] h-[200px]">
            <div className="w-[40%] h-full mt-10 mb-10 flex flex-col">
                <span className="text-xl text-gray-3pp">Upto {offers} OFF</span>
                <h2 className="text-2lx">Vegetables Collection</h2>
                <button className=" text-white bg-green-500 p-1">Open Now</button>
            </div>
            <div className="h-full w-[60%]">
              <img src="" alt="" />
            </div>
        </div>
    )
}