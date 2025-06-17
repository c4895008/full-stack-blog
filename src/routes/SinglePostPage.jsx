import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {format} from 'timeago.js';
const fetchPost = async (slug) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return response.data;
}

export default function SinglePostPage(){
    const { slug } = useParams();
    const { isPending,error,data } = useQuery({
        queryKey: ['post', slug],
        queryFn: ()=>fetchPost(slug)
    });
    if (isPending) {
        return <div>loading...</div>;
    }
    if (error) {
        return <div>Something went wrong: {error.message}</div>;
    }
    if (!data) {
        return <div>Post not found!</div>;
    }

    return (
         <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <div className="lg:w-3/5 flex flex-col gap-8">
                    <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{data.title} </h1>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>Written by</span>
                        <Link className="text-blue-800">{data.user?.username || 'system'}</Link>
                        <span>on</span>
                        <Link className="text-blue-800">{data.category}</Link>
                        <span>{format(data.createdAt)}</span>
                    </div>
                    <p className="text-gray-500 font-medium">
                        {data.desc || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                    </p>
                </div>
                {
                    data.img && <div className="hidden lg:block w-2/5">
                    <Image src={data.img} w={600} />
                </div>
                }
            </div>
            <div className="flex flex-col md:flex-row gap-12">
                <div className="lg:text-lg flex flex-col gap-6 text-justify">
                    <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit,Lorem ipsum dolor sit, amet consectetur adipisicing elit.,Quis voluptas quee quidem,fugiat qusa vlaumen
                    next.js is very popular javascript framework for building web apps.the react is very popular javascript library for building user interfaces.so we can build web application
                    using react and next.js.router is very popular for building single page application using next.js.now we are going to build a blog application using next.js.yup，unfortunately,
                    next.js is not very popular for building web application.</p>
                    <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit,Lorem ipsum dolor sit, amet consectetur adipisicing elit.,Quis voluptas quee quidem,fugiat qusa vlaumen
                    next.js is very popular javascript framework for building web apps.the react is very popular javascript library for building user interfaces.so we can build web application
                    using react and next.js.router is very popular for building single page application using next.js.now we are going to build a blog application using next.js.yup，unfortunately,
                    next.js is not very popular for building web application.</p>
                   
                   
                </div>
                <div className="px-4 h-max sticky top-8">
                    <h1 className="mb-4 text-sm font-medium">Author</h1>
                    <div className="flex flex-col gap-4">
                        <div  className="flex items-center gap-8">
                            {data.user && data.user.img && <Image src={data.user.img} w={64} h={64} className="rounded-full object-cover" />}
                            <Link className="text-blue-800">{data.user && data.user.username || 'system'}</Link>
                        </div>
                        <p className="text-sm text-gray-500"> Lorem ipsum dolor sit amet consectetur</p>
                        <div className="flex gap-2">
                            <Link>
                                <Image  src={'/blog/facebook.svg'} w={24} h={24}  />
                            </Link>
                            <Link>
                                <Image  src={'/blog/instagram.svg'} w={24} h={24} />
                            </Link>
                        </div>
                    </div>
                    <PostMenuActions post={data}/>
                    <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link className="underline">All</Link>
                        <Link className="underline">Web Design</Link>
                        <Link className="underline">Development</Link>
                        <Link className="underline">Database</Link>
                        <Link className="underline">Search Engines</Link>
                        <Link className="underline">Marketing</Link>
                    </div>
                    <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
                    <Search/>
                </div>
            </div>
            <Comments postId={data._id}/>
        </div>
    )
}