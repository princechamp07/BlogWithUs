import Sidebar from "./Sidebar";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { selectUserPhoto } from "../app/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto';
import { useEffect, useRef } from "react";

function Home(props) {
  
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Replace with actual days of the week
          datasets: [
            {
              label: "Daily Views",
              data: [200, 300, 400, 350, 500, 600, 550], // Replace with actual daily views/visits data
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-[310px_minmax(900px,_1fr)_100px]">
      {
        //SideBar
      }
      <Sidebar />
      {
        //Main
      }
      <div className="w-full">
       
        <div className="ml-6 mt-4 text-2xl font-mono text-slate-800 font-semibold ">
          Welcome to BlogWithUs
          <div className="text-sm font-normal text-slate-600">
            Discover new blogs and connect with fellow bloggers
          </div>
          <div className="mt-8">
          <Link to="/create" className="font-normal text-sm border border-black px-8 py-3 ">
          Create Post
          </Link>
          </div>
         
        </div>
        <div className="grid grid-cols-2 ml-6">
          {
            //Left
          }
          <div className="flex gap-4">
            <div className="bg-[#e2e1e1] px-4 py-4 my-6">
              <div>Plan your next blog</div>
              <div className="text-sm text-slate-600">Current weeks tasks</div>
              <div className="flex flex-row">
                <div className="w-full flex">
                  <img
                    className="w-7 rounded-full"
                    src="./images/user.svg"
                    alt=""
                  />
                  <img
                    className="w-7 relative right-3 rounded-full"
                    src="./images/user.svg"
                    alt=""
                  />
                  <img
                    className="w-7 relative right-7 rounded-full"
                    src="./images/user.svg"
                    alt=""
                  />
                </div>
                <div className="text-sm items-center flex ">Collaborate</div>
              </div>
            </div>
            <div>
              <div className="bg-[#e2e1e1] px-4 pt-4 pb-7 my-6">
                <div>Upcoming blog</div>
                <div className="text-sm text-slate-600">
                  Tasks for this week
                </div>
                <div className="flex flex-row">
                  <div className="w-full flex">
                    <img
                      className="w-7 rounded-full"
                      src="./images/user.svg"
                      alt=""
                    />
                    <img
                      className="w-7 relative right-3 rounded-full"
                      src="./images/user.svg"
                      alt=""
                    />
                    <img
                      className="w-7 relative right-7 rounded-full"
                      src="./images/user.svg"
                      alt=""
                    />
                  </div>
                  <div className="text-sm items-center flex">Content</div>
                </div>
              </div>
            </div>
          </div>
          {
            //Right
          }
          <div className="flex gap-4 mx-6 mb-">
            <div className="bg-[yellow] w-40 flex flex-col">
              <div className="bg-white px-6 py-5 mx-auto my-5 items-center flex justify-center rounded-full">
                82
              </div>
              <div className="px-4 mx-auto text-center text-sm items-center flex justify-center ">
                Track your daily blog progress
              </div>
            </div>
            <div className="bg-[yellow] w-40 flex flex-col">
              <div className="my-4 items-center justify-center rounded-full">
                <img
                  className="w-6 relative left-[88px]"
                  src="./images/icons8-planet-50.png"
                  alt=""
                />
                <img
                  className="w-6 relative left-[48px]"
                  src="./images/icons8-ink-48.png"
                  alt=""
                />
                <img
                  className="w-6 relative left-[88px]"
                  src="./images/icons8-bulb-48.png"
                  alt=""
                />
              </div>
              <div className="px-4 mx-auto text-center text-sm items-center flex justify-center ">
                Engage with the blogging
              </div>
            </div>
            <div className="bg-[yellow] w-40 flex flex-col">
              <div className="my-4 items-center justify-center rounded-full">
                <img
                  className="w-6 relative left-[88px]"
                  src="./images/book.svg"
                  alt=""
                />
                <img
                  className="w-6 relative left-[48px]"
                  src="./images/promotion.png"
                  alt=""
                />
                <img
                  className="w-6 relative left-[88px]"
                  src="./images/calendar.png"
                  alt=""
                />
              </div>
              <div className="px-4 mx-auto text-center text-sm items-center flex justify-center ">
                Find answers to common queries
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 ml-6">
          <LeftSection />
         <RightSection/>
         
        </div>
      </div>
    </div>
  );
}

export default Home;
