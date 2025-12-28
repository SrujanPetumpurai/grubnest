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
            <div className='flex mx-auto w-[1200px] justify-between '>
                <Offer btnBgColor='orange' bgColor='#ffd9a1'text='Everyday fresh & clean with our products' img={'/offer1.png'} ></Offer>
                <Offer btnBgColor='teal' bgColor='#caf3cc'text='Make your breakfast healthy and easy'img={'/offer2.png'}></Offer>
            </div>
            <FeaturedProducts></FeaturedProducts>
            <DeliveryBanner></DeliveryBanner>
            <AboutProduct></AboutProduct>
        </div>
    )
}
