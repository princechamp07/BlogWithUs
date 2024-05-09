import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { selectUserName, selectUserPhoto } from "@/app/userSlice";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const username = useSelector(selectUserName); // Selector to check if user is logged in

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("https://github.com/princechamp07/BlogWithUs/blob/main/src/data/db.json");
      setPosts(response.data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/posts/${postId}`);
      if (response.status === 200) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleDeleteClick = (e, postId) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent element
    handleDelete(postId);
  };

  const shortenContent = (content) => {
    return content.length > 50 ? `${content.substring(0, 50)}...` : content;
  };

  return (
    <>
      <div className="grid grid-cols-[310px_minmax(900px,_1fr)_100px]">
        {/* Sidebar */}
        <Sidebar />
        {/* Main */}
        <div className="container mx-auto py-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
              onClick={() => handlePostClick(post.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center mb-4">
                <img
                  className="rounded-full w-12 h-12 object-cover mr-4"
                  src={post.photo}
                  alt={`Photo of ${post.author}`}
                />
                <div>
                  <Label className="text-gray-600 font-semibold">Author</Label>
                  <div className="font-bold">{post.author}</div>
                </div>
              </div>
              <Label className="block text-gray-600 font-semibold">Title:</Label>
              <div className="mb-2">{post.title}</div>
              <Label className="block text-gray-600 font-semibold">Content:</Label>
              <div className="mb-2">
                {shortenContent(post.content)}
                {post.content.length > 50 && (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handlePostClick(post.id)}
                  >
                    Read More
                  </button>
                )}
              </div>
              {username || post.author==="Guest" && ( // Conditionally render the delete button based on user authentication
                <button
                  onClick={(e) => handleDeleteClick(e, post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
