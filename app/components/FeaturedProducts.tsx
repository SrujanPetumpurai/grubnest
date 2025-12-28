import ItemCard from "./ItemCard"

// {image,name,category,rating,cost,discount}
const featuredArray = [
  {
    image: '/capsicum.png',
    name: 'Red capsicum',
    category: 'vegetable',
    rating: 4.5,
    cost: 50,
    discount: '10%',
    measurement: '250g',
    id: '69109ec7eddacb1c2af9fb5a'
  },
  {
    image: '/fish.jpg',
    name: 'Fish',
    category: 'seafood',
    rating: 4.5,
    cost: 50,
    discount: '10%',
    measurement: '500g',
    id: '69109ec7eddacb1c2af9fb5b'
  },
  {
    image: '/orange.png',
    name: 'Orange',
    category: 'fresh fruit',
    rating: 4.5,
    cost: 50,
    discount: '10%',
    measurement: '1kg',
    id: '69109ec7eddacb1c2af9fb5c'
  },
  {
    image: '/eclair.png',
    name: 'Eclair',
    category: 'baking',
    rating: 4.5,
    cost: 50,
    discount: '10%',
    measurement: '6 pcs',
    id: '69109ec7eddacb1c2af9fb5d'
  },
  {
    image: '/raw minced meat.png',
    name: 'Raw minced meat',
    category: 'meat',
    rating: 4.5,
    cost: 50,
    discount: '10%',
    measurement: '500g',
    id: '69109ec7eddacb1c2af9fb5e'
  }
];

export default function FeaturedProducts(){

    return(
      <div className="mt-8 w-[1200px] mx-auto  flex flex-col">
        <h1 className="text-2xl font-bold">Farm Fresh products</h1>
        <div className="mt-8 mx-auto flex flex-wrap">
            {featuredArray.map((item,idx)=>(
                <ItemCard key={item.id} measurement={item.measurement} id={item.id} image={item.image} rating={item.rating} name={item.name} cost={item.cost} discount={item.discount} category={item.category}></ItemCard>
            ))} 
        </div>
      </div>
    )
}