import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}`);
        setPostDetails(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
      setLoading(false);
    };

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return (
    <div className=" h-screen p-6 bg-white shadow-lg">
      {postDetails ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">{postDetails.title}</h2>
          <p className="text-gray-600 flex items-center mb-2">By <img
              className="rounded-full w-10 h-10 object-cover mx-2"
              src={postDetails.photo}
              alt={`Photo of ${postDetails.author}`}
            /> {postDetails.author}</p>
          <p className="text-gray-600 mb-4">{postDetails.date}</p>
          <p className="leading-relaxed">{postDetails.content}</p>
          
        </div>
      ) : (
        <p>No details found for this ID.</p>
      )}
    </div>
  );
};

export default PostDetails;
