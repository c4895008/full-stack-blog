import Image from "./Image";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
const fetchPost = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return response.data;
};
const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchPost,
  });
  if (isPending) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">Error loading posts</div>;
  }
  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No featured posts available
      </div>
    );
  }
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* Frist  Post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <Image
          src="/blog/featured1.jpeg"
          className="rounded-3xl object-cover"
          w="895"
        />
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg">{posts[0]?.category}</Link>
          <span className="text-gray-500">{format(posts[0]?.createdAt)}</span>
        </div>
        <Link
          to={posts[0].slug}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
         {posts[0]?.title}
        </Link>
      </div>
      {/* Others  Post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="lg:h-1/3 flex just-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="/blog/featured2.jpeg"
              className="rounded-3xl object-cover  w-full h-full"
              w="298"
            />
          </div>
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-blue-800">{posts[1]?.category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[1]?.createdAt)}</span>
            </div>
            <Link
              to={posts[1]?.slug}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {posts[1]?.title}
            </Link>
          </div>
        </div>
        <div className="lg:h-1/3 flex just-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="/blog/featured3.jpeg"
              className="rounded-3xl object-cover  w-full h-full"
              w="298"
            />
          </div>
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-blue-800">{posts[2]?.category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[2]?.createdAt)}</span>
            </div>
            <Link
              to={posts[2]?.slug}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {posts[2]?.title}
            </Link>
          </div>
        </div>
        <div className="lg:h-1/3 flex just-between gap-4">
          <div className="w-1/3 aspect-video">
            <Image
              src="/blog/featured4.jpeg"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          <div className="w-2/3">
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-blue-800">{posts[3]?.category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[3]?.createdAt)}</span>
            </div>
            <Link
              to="/test"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
               {posts[3]?.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedPosts;
