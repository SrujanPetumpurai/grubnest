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
            <div className="py-16 w-full flex items-center justify-center bg-gray-50">
             <div className="w-[400px] rounded-xl border bg-gray-50 shadow-md">
                <h1 className="text-2xl font-semibold text-center py-4 border-b">
                Sign Up
                </h1>

                <form
                className="flex flex-col gap-3 px-6 py-4"
                onSubmit={makeAccount}
                >
                {err && (
                    <div className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
                    {err}
                    </div>
                )}

                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border  hover:bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border  hover:bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label className="text-sm font-medium" htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                    className="border  hover:bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <label className="text-sm font-medium" htmlFor="surname">Surname</label>
                <input
                    id="surname"
                    type="text"
                    placeholder="surname"
                    onChange={(e) => setSurname(e.target.value)}
                    className="border  hover:bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button
                    type="submit"
                    className="mt-4 bg-black text-white py-2 rounded hover:-translate-y-1/10 hover:bg-black  duration-200 transition"
                >Create Account
                </button>
                </form>
            </div>
        </div>
        )
    }