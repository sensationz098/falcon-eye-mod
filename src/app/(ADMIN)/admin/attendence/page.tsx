"use client";

import { Button } from "@/components/ui/button";

// import axios from "axios";
// import { useEffect, useState } from "react";

const Page = () => {
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get(
  //         "https://api.etimeoffice.com/api/DownloadPunchData?Empcode=0001&FromDate=01/01/2025_09:00&ToDate=31/01/2025_23:59",
  //         {
  //           auth: {
  //             username: "Sensationz:Sensationz:SENSATIONZ@123:true",
  //             password: "",
  //           },
  //         },
  //       );

  //       setData(res.data);
  //     } catch (err: Error | unknown) {
  //       if (err instanceof Error) return console.log("error", err.message);
  //       console.log("Internal server error");
  //     }
  //   }

  //   fetchData();
  // }, []);

  // console.log(data);
  return (
    <div>
      <Button>Fetch data</Button>

      {/* {data?.PunchData?.map((i) => <h1 key={i.PunchDate}>{i.PunchDate}</h1>)} */}
    </div>
  );
};

export default Page;
