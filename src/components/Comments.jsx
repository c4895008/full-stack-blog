import Comment from "./Comment";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react"
import axios from "axios";

const fetchComments = async (postId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
    return response.data;
}

export default function Comments({postId}){
    const { data } = useQuery({
        queryKey: ['comments', postId],
        queryFn: ()=>fetchComments(postId)
    });
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken();
            if (!token) {
                throw new Error('User is not authenticated');
            }
            return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: (res) => {
            // Optionally, you can refetch comments or update the UI
            console.log('Comment added successfully:', res.data);
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
        },
        onError: (error) => {
            console.error('Error adding comment:', error);
        },
    }); 
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const commentText = formData.get('desc');
        if (!commentText) {
            return;
        }
        // Here you would typically send the comment to the server
        const data = {
            desc: commentText,
        }
        e.target.reset(); // Reset the form after submission
        mutation.mutate(data);
    }

    return <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
        <h1 className="text-xl text-gray-500 underline">Comments</h1>
        <form onSubmit={handleSubmit} className="flex items-center justify-between gap-8 w-full">
            <textarea name='desc' className="w-full p-4 rounded-xl" placeholder="Write a comment..."  />
            <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">Send</button>
        </form>
       {
            data && data.map(comment => <Comment key={comment._id} comment={comment} postId={postId} />)
        }
    </div>
}