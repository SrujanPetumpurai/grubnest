    'use client'
    import { useState } from "react"
    import { useRouter } from "next/navigation"
    import { signIn } from "next-auth/react"
    export default function Signup(){
        const [email,setEmail]= useState<string>('')
        const [name,setName]=useState<string>('')
        const [password,setPassword] = useState<string>('')
        const [surname,setSurname] = useState<string>('');
        const [err,setErr] = useState('');
        const router = useRouter();
        const makeAccount = async (e:any)=>{
            e.preventDefault();
            try{
            const res = await fetch('/api/auth/signup',{
                method:'POST',
                body:JSON.stringify({email,name,password,surname}),
                headers:{
                    'Content-type':'application/json'
                }
            })
            const body = await res.json();
            if(!res.ok){
                console.log(body.error)
                console.log(body.message)
            }
            switch(body.message){
                case 'User created':
                    router.push('/home')
                    await signIn('credentials',{
                        password:password,
                        email:email,
                        redirect:false
                    })
                    break;
                case 'User already exists':
                    console.log('User already exists')
                    setErr('User already exists')
                    break;
                default:
                    setErr("No match")
                    console.log("no match")

            }
        }catch(e){
            console.log(e)
        }
        }
        
        return(
            <div className="w-full h-full flex justify-center items-center">
                <form className="w-[400px] h-[500px] flex flex-col px-4 py-2 mt-16 border rounded-xl " onSubmit={makeAccount}>
                    {err && <div className="bg-red-500 w-[320px] h-[20px] text-white ">
                        {err}
                    </div> }
                    <label className="font-semibold" htmlFor="email">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} placeholder="email" type="text" id="email" />
                    <label className="font-semibold" htmlFor="password" >Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} placeholder="password" type="text" id="password" />
                    <label className="font-semibold" htmlFor="name">Name</label>
                    <input onChange={(e)=>setName(e.target.value)} placeholder="name" type="text" id="name" />
                    <label className="font-semibold" htmlFor="surname">Surname</label>
                    <input onChange={(e)=>setSurname(e.target.value)} placeholder='surname'  id='surname' type="text"  />
                    <button type="submit">Create Account</button>
                </form>
            </div>
        )
    }