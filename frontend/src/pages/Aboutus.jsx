import React from "react";
import headerimage from "../assets/about_us_header_image.png";

import People from "../components/people";

import medPlusLogo from "../assets/MedPlusLogo.png";
import peopleimage1 from "../assets/people/person1.png";
import peopleimage2 from "../assets/people/person2.png";
import peopleimage3 from "../assets/people/person3.png";
import peopleimage4 from "../assets/people/person4.png";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="mt-10 flex flex-col gap-10">
      <div className="flex flex-row gap-10">
        <div className="flex flex-1 flex-col items-start justify-center">
          <img src={medPlusLogo} alt="MedPlus logo" className="mb-10 h-8" />
          <p className="text-justify">
            At MedPlus, our journey is driven by a shared passion for enhancing
            your health and well-being. Founded with the vision to provide
            accurate health information, facilitate easy access to healthcare
            resources, and empower individuals to make informed decisions about
            their health, we are committed to your betterment. Our dedicated
            team of professionals and experts is dedicated to creating a
            healthier and more informed world. Discover the story behind MedPlus
            and the people who strive to make a positive impact on your health
            journey.
          </p>
        </div>
        <img src={headerimage} alt="about us header" className="flex-1" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mt-4 text-4xl font-bold text-blue">Meet our Team</h2>
        <div className="mt-2 text-lg font-semibold">
          <p>Meet everyone who made this possible.</p>
        </div>
        <div>
          <div className="my-5 grid grid-cols-4 gap-10">
            <People personimage={peopleimage1} name="Samindika Dalanindu" />
            <People personimage={peopleimage2} name="Holin Ariyawansa" />
            <People personimage={peopleimage3} name="Rashmi Senevirathna" />
            <People personimage={peopleimage4} name="Dinuka Lusena" />
          </div>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
