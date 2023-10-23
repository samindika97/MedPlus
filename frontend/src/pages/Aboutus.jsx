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
    <div>
      <div className="my-10 flex flex-row gap-10">
        <div className="flex flex-1 flex-col items-start justify-center">
          <img src={medPlusLogo} alt="MedPlus logo" className="mb-10 h-8" />
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            placerat, risus eu lacinia convallis, dolor risus dignissim felis,
            quis convallis felis dui quis nulla. Nullam scelerisque a sapien ut
            cursus. Proin volutpat est ut eros tempus, in posuere velit
            convallis. Nam ut ligula id dolor rutrum ornare. Nullam sed bibendum
            quam, a porttitor sem. Mauris et dui vulputate, mollis nisi commodo,
            commodo nunc. Integer vel erat hendrerit, finibus arcu vitae,
            tincidunt lorem. Cras finibus at augue quis dignissim. Aenean
            accumsan at dui non convallis. Donec et mi sit amet erat sodales
            blandit ac a ex.
          </p>
        </div>
        <img src={headerimage} alt="about us header" className="flex-1" />
      </div>
      <div className="my-10 flex flex-col items-center justify-center">
        <h2 className="mt-4 text-4xl font-bold text-blue">Meet our Team</h2>
        <div className="mt-2 text-lg font-semibold">
          <p>Meet everyone who made this possible.</p>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-10 my-5">
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
