import axios from "axios";
import { useEffect, useState } from "react";
import { selectUserPhoto } from "../app/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LeftSection(props) {
  const userphoto = useSelector(selectUserPhoto)
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      
      setLoading(true);
      const response = await axios.get("http://localhost:8000/posts");
    setPosts(response.data);
      setLoading(false);
    };
    loadPost();
  }, []);

  return (
    <div>
      <div>Your blog tasks</div>
      <div className="bg-[#e2e1e1] mt-4  box-content">
        <div className="py-4 text-sm px-4">Manage 2 active</div>
        {
          loading ? (
            <div className="text-center py-4">Loading Posts...</div>
          ):(
            <>
            
            {posts.slice(0,3).map((post) => {
               return  (
              <div className="px-4 text-sm py-2 " key={post.id} >
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 flex items-center" >
                      <img
                        className="rounded-full"
                        src={userphoto}
                        alt=""
                      />
                    </div>
                    <div className="items-center w-48 flex">{post.title}</div>
                    <div className="flex items-center mr-4 w-64 ">
                
                      {post.description}
                    </div>
                  </div>
                  <div className="items-center flex">
                    <div className="flex items-center font-light"> Active </div>
                  </div>
                </div>
              </div>
              
            )})}
        <div className="mx-auto justify-center flex">
          <button className="text-sm bg-white px-4 py-2 border border-black my-4">
           <Link to="/Posts">
           View all posts
           </Link> 
          </button>
        </div>
            </>

          )
        }
      </div>
    </div>
  );
}

export default LeftSection;
