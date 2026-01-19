import './page.css'
import Hero from '@/app/components/Hero'
import Carousel from '@/app/components/Carousel'
import Offer from '@/app/components/Offer'
import DeliveryBanner from '@/app/components/DeliveryBanner'
import FeaturedProducts from '@/app/components/FeaturedProducts'
import AboutProduct from '@/app/components/AboutProductSection'
export default function Home(){
    return(
        <div className=''>
            <Hero></Hero>
            <Carousel></Carousel>
            <div className='flex flex-col md:flex-row mx-auto items-center w-[1200px] max-w-[95vw] justify-between gap-6'>
                <Offer btnBgColor='orange' bgImg={'/vegi_banner_bg.jpg'} bgColor='#FFE0B2' text='Everyday fresh & clean with our products' img={'/offer1.png'} ></Offer>
                <img className='w-[40%] sm:w-[25%] md:w-[16%] rounded-full transition-all delay-700 duration-1000 ease-in-out hover:-translate-y-200 h-auto mx-auto my-2' src="/logo_better.png" alt="" />
                <Offer btnBgColor='teal' bgImg={'/breakfast_bg.jpg'} bgColor='#D1FAE5' text='Make your breakfast healthy and easy' img={'/offer2.png'}></Offer>
            </div>
            <FeaturedProducts></FeaturedProducts>
            <DeliveryBanner></DeliveryBanner>
            <AboutProduct></AboutProduct>
        </div>
    )
}
