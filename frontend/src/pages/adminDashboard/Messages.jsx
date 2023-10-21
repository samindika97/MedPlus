import React,{useEffect, useState} from "react";
import axios from "axios";

import BASE_URL from "../../config/ApiConfig";

const Messages = ()=>{
    const [data,setData] = useState([]);

    const fetchInfo = ()=>{
        return axios.get(`${BASE_URL}message`)
        .then((response)=>{
            setData(response.data)})
        .catch((err)=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        fetchInfo();
    },[]);

    return (
        <div className="Messages border-solid border-2 rounded-lg w-3/5">
          <h1 className="text-2xl my-4" >Messsages Recived </h1>
          {data.map((dataObj,index)=>{
            const date = new Date(dataObj.createdAt);
            return(
                <div className="border-solid border-2 border-teal p-4 m-2 rounded-2xl flex flex-row gap-6 bg-mintGreen" key={index}>
                    <div className="basis-3/4">
                        <p className="text-sm font-bold">{dataObj.name}</p>
                        <p className="text-base">{dataObj.message}</p>
                    </div>
                    <div className="basis-1/4">
                        <p className="text-right text-xs text-gray-900">{dataObj.email}</p>
                        <p className="text-right text-xs text-gray-600">{date.toLocaleTimeString()}</p>
                        <p className="text-right text-xs text-gray-600">{date.toLocaleDateString()}</p>
                    </div>
                </div>
            );
          })}
        </div>
      );

};


export default Messages;