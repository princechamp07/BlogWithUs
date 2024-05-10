import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectUserEmail, selectUserName,selectUserPhoto ,setSignOutState,setUserLoginDetails } from "../app/userSlice";
import { useEffect, useState } from "react";


function Sidebar() {

    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const username = useSelector(selectUserName)
    const userphoto = useSelector(selectUserPhoto)
    const useremail = useSelector(selectUserEmail)
    const location = useLocation();

  const [activePage, setActivePage] = useState(""); // State to track active page

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

 const handleauth = (event) => {
    event.preventDefault()
        if(!username){
            signInWithPopup(auth,provider).then((result) =>{
          
            setUser(result.user)
          
        })
        .catch((e) => {
            alert(e.message)
        })}
        else if (username){
            auth.signOut().then(()=>{
                dispatch(setSignOutState)
                Navigate("/")
            })
            .catch((err => alert(err.message)))
        }
    }

const setUser = (user) => {
dispatch(
    setUserLoginDetails({
        name:user.displayName,
        email:user.email,
        photo:user.photoURL,
    })
)
}

    return (
        <div>
            <div className='bg-[#e2e1e1] h-screen w-full'>
                <div className='text-2xl font-bold font-serif px-4 py-2 flex '>
                    <img className='w-8 mx-2' src="./images/Feed-icon.png" alt="" />
                    <div>
                    Feed
                    </div>
                </div>
                
                    <div className='text-lg h-72 border-b border-solid border-slate-300 font-serif py-4 px-4 flex flex-col gap-2'>
                    {username ? (<div className={`flex gap-2 py-1 rounded-sm px-2 hover:bg-slate-300 cursor-pointer ${activePage === "/home" && "bg-white"}`}>
                        <img className='w-6' src="./images/community.svg" alt="" />
                        <Link to="BlogWithUs/home">
                            Dashboard
                        </Link>
                    </div>):(
                        <></>
                    )}
                    <div className={`flex gap-2 py-1 rounded-sm px-2 hover:bg-slate-300 cursor-pointer ${activePage === "/create" && "bg-white"}`}>
                         <img className='w-6' src="./images/community.svg" alt="" />
                        <Link to="BlogWithUs/create">
                            Create Post
                        </Link>
                    </div>
                    <div className={`flex gap-2 py-1 rounded-sm px-2 hover:bg-slate-300 cursor-pointer ${activePage === "/Posts" && "bg-white"}`}>
                         <img className='w-6' src="./images/community.svg" alt="" />
                        <Link to="BlogWithUs/Posts">
                            Veiw Posts
                        </Link>
                    </div>
                    
                </div>
                  
                <div className='text-lg font-serif py-4 px-4 flex flex-col gap-4'>
                    <div className='font-bold'>
                    Blogger Teams
                    </div>
                    <div className='flex flex-col gap-2'>

                    <div className='flex gap-2 py-1 px-2 hover:bg-slate-300 cursor-pointer'>
                        <img className='w-6 bg-white border border-solid border-black' src="./images/icons8-bulb.gif" alt="" />
                    <div>
                        Content Ideas
                    </div>
                    
                    </div>
                    <div className='flex gap-2 py-1 px-2 hover:bg-slate-300 cursor-pointer'>
                        <img className='w-6 bg-white border border-solid border-black' src="./images/roller.gif" alt="" />
                    <div>
                        Customize Design
                    </div>
                    </div>
                    <div className='flex gap-2 py-1 px-2 hover:bg-slate-300 cursor-pointer'>
                        <img className='w-6 bg-white border border-solid border-black' src="./images/key.png" alt="" />
                    <div>
                        Privacy
                    </div>
                    </div>
                    <div className='flex gap-2 py-1 px-2 hover:bg-slate-300 cursor-pointer'>
                        <img className='w-6 bg-white border border-solid border-black' src="./images/manage.png" alt="" />
                    <div>
                        Manage
                    </div>
                    </div>
                    
                    </div>
                </div>
                <div className='font-serif py-4 px-4 mt-32 flex flex-col'>
                
                   {!username ?(
                    <>
                        <div className='flex items-center bg-white py-2  rounded-md '>
                        <div className='mx-2 '>
                        <img className='rounded-full w-12' src="./images/user.svg" alt="" />
                        </div>
                        <div>
                        <div className='text-lg'>Guest</div>
                       </div>
                    </div>
                    <div className='mt-5 border-t border-slate-300 py-4     '>
                    
                    <div className='flex gap-2 py-1 px-2 hover:bg-slate-300 cursor-pointer' onClick={username && handleauth}>
                        <img className='w-6' src="./images/icons8-sign-out-50.png" alt="" />
                    {username ? (<div>
                        Sign out
                    </div>):(
                        <Link to ="/">
                            Sign out
                        </Link>
                    )}
                    </div>
                    </div>
                    </>
                    
                   ):(
                    <>
                        <div className='flex bg-white py-2 px-4 rounded-md '>
                        <div className='w-full mx-2 '>
                        <img className='rounded-full' src={userphoto} alt="" />
                        </div>
                        <div>
                        <div className='text-lg'>{username}</div>
                        <div className='text-sm'>{useremail}</div>
                        </div>
                    </div>
                    <div className='mt-5 border-t border-slate-300 py-4     '>
                    
                    <div className='flex gap-2 py-1 px-2 hover:bg-slate-300 cursor-pointer' onClick={handleauth}>
                        <img className='w-6' src="./images/icons8-sign-out-50.png" alt="" />
                    <div>
                        Sign out
                    </div>
                    </div>
                    </div>
                    </>
                   )
                    }
                </div>
            </div>
        </div>
    );
}

export default Sidebar;