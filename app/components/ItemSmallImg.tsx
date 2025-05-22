import { useEffect, useState } from "react";

export default function ItemSmallImg({id}:{id:string}) {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        fetch(`/api/Items/${id}`) 
            .then((res) => res.json())
            .then((data) => setImgSrc(data.image))
            .catch((err) => console.error("Error fetching item image:", err));
    }, []);

    return (
        <div className="mb-4 border rounded-lg border-black w-[48px] h-[48px]">
            {imgSrc && <img src={imgSrc} alt="Item" className=" w-full h-full rounded-lg object-cover" />}
        </div>
    );
}