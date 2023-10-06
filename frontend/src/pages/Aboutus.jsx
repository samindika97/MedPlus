import React from "react";
import headerimage from "../assets/about_us_header_image.png";

import People from "../components/people";
import peopleimage1  from "../assets/people/person1.png";
import peopleimage2  from "../assets/people/person2.png";
import peopleimage3  from "../assets/people/person3.png";
import peopleimage4  from "../assets/people/person4.png";
import Footer from "../components/Footer";

const AboutUs = () => {
    return (
        <div>
        <div className="intro bg-gray-100 p-4">
            <div className="flex flex-row">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold mb-4 flex">
                        <h1>Med</h1><h1 className="text-teal ">Plus</h1>
                    </div>
                    <p>Mauris lectus justo, tincidunt non ante nec, bibendum lobortis odio. Maecenas iaculis auctor neque eget elementum. Proin pulvinar ex est, eget convallis mi malesuada ac.</p>
                </div>
                <div className="flex-1">
                    <img src={headerimage} alt="about us header" />
                </div>
            </div>
        </div>
        <div className="team">
            <div className="flex flex-col items-center justify-center">
                <div className="text-xl text-teal">
                    <h2>Meet our Team</h2>
                </div>
                <div className="text-2xl font-bold">
                    <p>Meet everyone who made this possible.</p>

                </div>
                <div >
                    <div className="flex flex-row w-full">
                        <People personimage={peopleimage1} name={"Samindika Dalanindu"}/>
                        <People personimage={peopleimage2} name={"Holin Ariyawansha"}/>
                        <People personimage={peopleimage3} name={"Rashmi Senevirathna"}/>
                        <People personimage={peopleimage4} name={"Dinuka Lusena"}/>
                    </div>
                </div>
                <div className="w-full">
                    <Footer />
                </div>
            </div>
        </div>
        </div>
    );
};

export default AboutUs;