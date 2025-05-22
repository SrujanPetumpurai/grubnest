import C_Card from "./CategoryCard"
import dairy from '@/public/dairy.png'
import fruits from '@/public/fruits.png'
import fish from '@/public/fish.jpg'
import honey from '@/public/honey.jpg'
export default function SelectCategory({handleClick}:{handleClick:(selection:string)=>void}){

    return(
    <div>
          <ul className='flex w-full justify-around '>
                        <li onClick={()=> handleClick("meat")} ><C_Card name='Meat' img='https://i.pinimg.com/736x/67/af/b6/67afb60fae1677778ebbee802b0b7923.jpg'/> </li>
                        <li onClick={()=> handleClick("dairy")}><C_Card  name='Dairy' img={dairy}/> </li>
                        <li onClick={()=> handleClick("fish")} ><C_Card name='Fish' img={fish}/> </li>
                        <li onClick={()=> handleClick("fruits")}><C_Card  name='Fruits' img={fruits}/> </li>
                        <li onClick={()=> handleClick("honey")}><C_Card  name='Honey' img={honey}/> </li>
                    </ul>
    </div>)

}