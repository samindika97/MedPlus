import React from "react";


const people = (props)=>{
    const personimage = props.personimage ;
    return(
        <div className="individual">
            <div className="flex flex-col items-center " >
                <img src={personimage} alt="person_image" className="h-64 w-64 p-8"/>
                <p>{props.name}</p>
            </div>
        </div>
    );  
};

export default people;