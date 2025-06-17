import { useUser,useAuth } from "@clerk/clerk-react"
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import axios from "axios";
import Upload from "../components/Upload";
import { useEffect } from "react";
export default function WritePage(){
    const { isLoaded, isSignedIn } = useUser();
    const [value, setValue] = useState('');
    const [cover,setCover] = useState({});
    const [img,setImg] = useState('');
    const [video,setVideo] = useState('');
    const [progress, setProgress] = useState(0);
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            if (!token) {
                throw new Error('User is not authenticated');
            }
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: (res) => {
            toast.success('Post created successfully!');
            navigate(`/${res.data.slug}`);
        },
        onError: (error) => {
            console.error('Error creating post:', error);
            toast.error('Failed to create post. Please try again.');
        },
    });
    useEffect(()=>{
        img && setValue(prev=>prev + `<img src="${img.url}" alt="Image" />`);
    },[img]);
     useEffect(()=>{
        video && setValue(prev=>prev + `<p><iframe src="${video.url}" frameborder="0" allowfullscreen></iframe></p>`);
    },[video]);
    if(!isLoaded){
        return <div className="">Loading...</div>
    }
    if(isLoaded && !isSignedIn){
        return <div className="">You should login!</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            img:cover.filePath||'',
            title: formData.get('title'),
            category: formData.get('category'),
            desc: formData.get('desc'),
            content: value,
        };
        mutation.mutate(data);
    };

    return <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
       <h1 className="text-cl font-light">Create A New Post</h1>
       <form onSubmit={handleSubmit} className="flex flex-col gap-6  flex-1 mb-6">
            <Upload type="image" setProgress={setProgress} setData={setCover}>
                <button  type='button' className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">Add a cover image</button>
            </Upload>
            <input name='title' className="text-4xl font-semibold bg-transparent outline-none" type="text" placeholder="My Awesome Story" />
            <div className="flex items-center gap-4">
                <label className="text-sm" htmlFor="">Choose a category:</label>
                <select name='category' className="p-2 rounded-xl bg-white shadow-md">
                    <option value="general">General</option>
                    <option value="web-design">Web Design</option>
                    <option value="development">Development</option>
                    <option value="databases">Databases</option>
                    <option value="seo">Search Engines</option>
                    <option value="marketing">Marketing</option>
                </select>
            </div>
            <textarea name="desc" className="p-4 rounded-xl bg-white shadow-md" placeholder="A Short Description"  />
            <div className="flex">
                <div className="flex flex-col gap-2 mr-2"> 
                    <Upload setProgress={setProgress} type="image" setData={setImg}>
                        <div className="cursor-pointer">🌧️</div>
                    </Upload>
                    <Upload setProgress={setProgress} type="video" setData={setVideo}>
                        <div className="cursor-pointer">🔥</div>
                    </Upload>
                </div>
                <ReactQuill readOnly={progress>0&&progress<100} value={value} onChange={setValue} className="flex-1 rounded-xl bg-white shadow-md"  theme="snow"/>
            </div>
            <button disabled={mutation.isLoading||(progress>0 && progress<100)} className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed">  
                {mutation.isLoading ? 'Publishing...' : 'Send'}
            </button>
            {"Progress: " + progress + "%"}
            {mutation.isError && (
                <span>
                    Error: {mutation.error.message}
                </span>
            )}
       </form>
    </div>
}