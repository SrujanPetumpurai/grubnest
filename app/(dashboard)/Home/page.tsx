import './page.css'
import Link from 'next/link'
import Image from  'next/image'
import foodbasket from '@/public/foodbasket.png'
import Offers from '@/app/components/Offers'
import C_Card from '@/app/components/CategoryCard'
import dairy from '@/public/dairy.png'
import fruits from '@/public/fruits.png'
import foodHealth from '@/public/foodHealth.png'
import grocery from '@/public/grocerry.jpg'
import fish from '@/public/fish.jpg'
import honey from '@/public/honey.jpg'
import TopItems from '@/app/components/TopItems'
export default function Home(){
    return(
        <div className="h-full w-[1000px] mx-auto">
            <div className="Hero mt-16 w-full h-66 flex justify-between items-center mb-16">
                <div className="w-[35%] flex flex-col items-start ml-16 my-10 h-full">
                    <span className="text-sm pt-10">Fresh 100% Organic</span>
                    <div className='text-3xl font-bold'>Fresh &  Healthy Organic Food</div>
                    <span className='text-sm'>Eggsy — Freshness at Your Doorstep, Straight from the Farm!gi</span>
                    <button>Shop now</button>
                </div>
                <div className="w-[55%] mr-16 px-26 flex items-center justify-center  my-10 h-full">
                    <Image src={foodbasket}  className='size-62 object-cover' alt='Organic foods'></Image>
                </div>
            </div>
            <div className=''>
                <Offers></Offers>
            </div>
            <div className='product_categories mt-10'>
                <h1 className='ml-14 font-bold text-xl'>Product Categories</h1>
                <div className='mt-10'>
                    <ul className='flex w-full justify-around '>
                       <Link href='/Products/meat'> <li><C_Card name='Meat' img='https://i.pinimg.com/736x/67/af/b6/67afb60fae1677778ebbee802b0b7923.jpg'/> </li></Link> 
                       <Link href='/Products/dairy'> <li><C_Card name='Dairy' img={dairy}/> </li></Link> 
                                                            <li><C_Card name='Food Health' img={foodHealth}/> </li>
                       <Link href='/Products/fish'> <li><C_Card name='Fish' img={fish}/> </li></Link> 
                       <Link href='/Products/fruits'><li><C_Card name='Fruits' img={fruits}/> </li></Link> 
                                                           <li><C_Card name='Grocery' img={grocery}/> </li>
                       <Link href='/Products/honey'><li><C_Card name='Honey' img={honey}/> </li></Link> 
                    </ul>
                </div>
            </div>
            <div className=''>
                <TopItems></TopItems>
            </div>
            <div>

            </div>
        </div>
    )
}
//get request items from database
//create a card component  to showcase the item
// (get the items in a array and map the array to a card component)
//