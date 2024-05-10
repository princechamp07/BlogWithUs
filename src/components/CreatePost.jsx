import { useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserName, selectUserPhoto } from "@/app/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreatePost = () => {
  const username = useSelector(selectUserName);
  const userphoto = useSelector(selectUserPhoto);
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    content: "",
    author: username || "Guest", 
    photo: userphoto || "https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg",
    media:"",
  });

  if (!username) {
    toast.success('Create Post As a Guest.', {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId:'success1',
    });
    
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
      
    }));
  };

  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const currentDate = new Date().toLocaleString(); // Get the current date and time
      setPostData((prevData) => ({
        ...prevData,
        publishedDate: currentDate, // Store the publish date and time
      }));
  
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

  
      if (response.ok) {
        navigate("/Posts")
        toast.success('Post published successfully!', {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-[310px_minmax(900px,_1fr)_100px]">
      <div>
        <Sidebar />
      </div>
      <div className="ml-6 mt-4">
        <div className="text-4xl font-bold font-serif flex">
          <div>
            BlogWithUs -
            <div className="text-lg font-normal text-[#9e9a9a]">
              Explore our impact on bloggers well-being
            </div>
          </div>
          <div className="ml-48">
            <img src="./images/seeds.png" alt="" />
          </div>
        </div>
        <div className="font-bold">Create Post</div>
        <ToastContainer/>
        <div className="mt-12">
          <Form>
            <form onSubmit={handleFormSubmit}>
              <div className="flex gap-4">
                <div className="w-[90%]">
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={postData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Short Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={postData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" name="media" type="file" value={postData.media} onChange={handleInputChange} />
                </div>
                <div>
                  <Label>Publish Your Blog</Label>
                  <Button type="submit" >Publish</Button>
                </div>
              </div>
              <div className="my-4">
                <Label>Write Your Blog Here</Label>
                <Textarea 
                  className="h-[600px]"
                  name="content"
                  value={postData.content}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
