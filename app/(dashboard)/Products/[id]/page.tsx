'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ItemSmallImg from "@/app/components/ItemSmallImg";
type Item = {
    _id: string;
    name: string;
    image: string;
    cost: number;
    type: string;
};

export default function ProductDetails() {
    const { id } = useParams() as { id: string };
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [rating,setRating] =useState(0);
    const [shrink,setShrink]=useState(false);
    useEffect(() => {
        if (!id) return;
        
        fetch(`/api/Items/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setItem(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching item:", error);
                setLoading(false);
            });
    }, [id]);
    const addToCart = async () => {
        await fetch('/api/cart', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ itemId: item?._id })
        });
      }

      useEffect(() => {
        const handleScroll = () => {
          setShrink(window.scrollY > 200) 
        }
    
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [])
      
      useEffect(() => {
        if (!item?._id) return;
      console.log('this is itemid in the frontend,',item._id)
        fetch(`/api/rating/${item._id}`)
          .then((res) => res.json())
          .then((res) => setRating(res))
          .catch((error) => {
            console.error("Error getting the rating", error);
          });
      }, [item]);
      

    if (loading) return <p>Loading...</p>;
    if (!item) return <p>Item not found</p>;

    return (
        <div className="flex mt-26 mx-auto w-[1100px] ">
            <div className="flex sticky top-25 h-[540px]">
           <div className="flex flex-col w-25 items-center">
           {Array.from({length:2}).map(()=>
           <ItemSmallImg id={item._id}></ItemSmallImg>
            )}
           </div>
           <div> 
           <div className=" flex flex-col w-[440px] rounded-xl h-[468px] border border-gray-300">
            <img className=" py-4 w-full h-full" src={item.image} alt="" />
            
           </div>
           <div className="flex relative justify-between mt-4 items-center   ">
           <span className={ ` absolute ${shrink?'opacity-100':'opacity-0'} text-3xl transition-opacity duration-300 ease-in-out font-bold inline-block w-[60px]`}>
              ${item.cost}
            </span>
            
           <button className={` text-white transition-all ease-in-out duration-300 ml-auto bg-pink-700 rounded-md h-[45px] block ${shrink?'w-[50%]':'w-full'}`} onClick={addToCart}>
            <span className="text-lg font-semibold">Add to Cart</span>
          </button>
          </div>
           </div>
           </div>
           <div className="ml-6">
           <div className="flex flex-col  border border-gray-300 w-[510px] rounded-lg pt-4 pl-4 h-[180px]">
             <h1 className="font-bold">{item.name}</h1>
             <div className="flex mt-4">
                <h2 className="text-gray-500 text-sm mr-2">Net Qty:1Kg</h2>
                <span className="inline-block justify-around  flex w-13 text-white text-center bg-green-800 rounded-md h-6">
                <svg className="inline-block h-4 w-4 mb-2" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                   <span className="inline-block w-4 h-3 mb-3"> {rating}</span>
                    </span>
             </div>
             <h2 className="flex items-center mt-4">
                <span className="mr-3 inline-block text-gray-500 text-xl">MRP</span>
                <span className="mr-3 text-4xl font-semibold inline-block ">${item.cost}</span>
                <span className="inline-block text-xl text-gray-500">(incl. of all taxes)</span>
             </h2>
             </div>
             <div className="border border-gray-300 rounded-lg mt-6">
                <h2 className="mb-4 pl-4 pt-4">Highlights</h2>
                <div className="px-4 leading-[3.75]  flex  ">
                    <div className="flex flex-col mr-36 text-gray-500">
                        <span>Brand</span>
                        <span>Product Type</span>
                    </div>
                    <div className="flex flex-col"> 
                        <span>Unbranded</span>
                        <span>{item.type}</span>
                    </div>
                </div>
             </div>
             <div className="border border-gray-300 rounded-lg mt-6">
                <h2 className="mb-4 pl-4 pt-4">Information</h2>
                <div className="flex mt-6">
                    <span className="inline-block mr-36 text-gray-500">Disclaimer</span>
                    <p>
                    All images are for representational purposes only. It is advised that you read the batch and manufacturing details, directions for use, allergen information, health and nutritional claims (wherever applicable), and other details mentioned on the label before consuming the product. For combo items, individual prices can be viewed on the page.</p>
                </div>
                <div className="flex mt-8">
                    <span className="inline-block mr-36 text-gray-500">Customer Care Details</span>
                    <p>
                    In case of any issue, contact us E-mail address: support@grubnest   .com</p>
                </div>
                <div className="flex mt-8">
                    <span className="inline-block mr-36 text-gray-500">Country Of Origin</span>
                    <p>India</p>
                </div>
                <div className="flex mt-8
                ">
                    <span className="inline-block mr-36 text-gray-500">Shelf Life</span>
                    <p>4 daysd</p>
                </div>
             </div>
           </div>
        </div>
    );
}