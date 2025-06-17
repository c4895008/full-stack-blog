import { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut,  useAuth, UserButton } from '@clerk/clerk-react';
import { useEffect } from "react";
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {getToken}=useAuth();
    useEffect(() => {
        getToken().then(token => {
            if (token) {
                //console.log("User is authenticated");
            } else {
                //console.log("User is not authenticated");
            }
        }).catch(error => {
            console.error("Error fetching token:", error);
        });
    }, [getToken]);
    
    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            <Link to='/' className="flex items-center gap-2 text-2xl font-bold">
                <Image src={'/blog/logo.png'} w={32} h={32} alt="" />
                <span>lamalog</span>
            </Link>
            <div className="md:hidden">
                <div className="cursor-pointer text-4xl" onClick={() => {
                    setOpen(prev => !prev)
                }}>{open ? 'X' : "☰"}</div>
                <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16  transition-all ease-in-out ${open ? '-right-0':'-right-[100%]'}`}>
                    <Link to="/">Home</Link>
                    <Link to="/">Trending</Link>
                    <Link to="/">Most Popular</Link>
                    <Link to="/">About</Link>
                    <Link to="/" className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                        <button>Login 👏</button>
                    </Link>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <Link to="/">Home</Link>
                <Link to="/">Trending</Link>
                <Link to="/">Most Popular</Link>
                <Link to="/">About</Link>
                
                 <SignedOut>
                    <Link to="/login" className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                        <button>Login 👏</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}
export default Navbar;