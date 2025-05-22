export default function Limited({name,description,img,bg,heading}:{name:string,description:string,img:string,bg:string,heading:string}){
    return(
        <div className=" flex justify-around h-[400px] w-[600px]">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="flex flex-col">
                <span>{heading}</span>
                <h1>{name}</h1>
                <p>{description}</p>
                coundown
                <div className="flex">
                    <button>Shop now</button>
                    <span className="inline-flex">See the policy</span>
                </div>
            </div>
        </div>
    )
}