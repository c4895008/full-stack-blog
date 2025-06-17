import Image from "./Image";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "timeago.js";

export default function Comment({ comment, postId }) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const isAdmin =
    (user && user.publicMetadata && user.publicMetadata.role == "admin") ||
    false;
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success("Comment deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment!");
    },
  });
  const handleDelete = async () => {
    deleteMutation.mutate();
  };
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Image
            src={comment.user.img}
            w={64}
            h={64}
            className="rounded-full object-cover"
          />
        )}
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user && (user.username === comment.user.username || isAdmin) && (
          <span
            onClick={handleDelete}
            className="text-sm text-red-300 hover:text-red-500 cursor-pointer"
          >
            Delete
          </span>
        )}
        {deleteMutation.isPending && (
          <span className="text-sm text-gray-500">Deleting...</span>
        )}
      </div>
      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
}
