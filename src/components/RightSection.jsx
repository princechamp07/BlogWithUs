import { Chart } from "chart.js";
import { useEffect, useRef } from "react";


const RightSection = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    
    const fetchDailyViewsData = () => {
      return [200, 300, 400, 350, 500, 600, 550]; 
    };

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 
          datasets: [
            {
              label: "Daily Views",
              data: fetchDailyViewsData(),
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
 
 return ( <div className="flex items-center">
      <canvas ref={chartRef}></canvas>
    </div> );
}
 
export default RightSection;