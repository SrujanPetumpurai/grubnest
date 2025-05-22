import OfferCard from "./OfferCard"
export default function Offers(){
    return(
        <div className="flex justify-around">
            <OfferCard Offer='30% OFF' txtColor='#33d43e' type='PURE FRUITS' btnTxtColor='black' bgColor='#fff4ec' btnColor='#fcb474' image={'/What is Protein_.jpg'} ></OfferCard>
            <OfferCard Offer='30% OFF' txtColor='#d46333' type='PURE FRUITS' btnTxtColor='white' bgColor='#f8f4f4' btnColor='#301c34' image={'/What is Protein_.jpg'} ></OfferCard>
            <OfferCard Offer='30% OFF' txtColor='#33d43e' type='PURE FRUITS' btnTxtColor='white' bgColor='#e0e4f4' btnColor='#68cc84' image={'/What is Protein_.jpg'} ></OfferCard>
            {/* <OfferCard Offer='30% OFF' txtColor='#d46333' type='PURE FRUITS' btnTxtColor='black' bgColor='#fff4ec' btnColor='#68cc84' image={'/What is Protein_.jpg'} ></OfferCard> */}
        </div>
    )
}