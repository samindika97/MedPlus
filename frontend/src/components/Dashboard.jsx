import React from "react";
import Dashboard_img from "../assets/Dash_img.png";

const Dashboard = () => {
  return (
    <section>
      <div className="my-10 flex flex-row gap-10">
        <div className="flex flex-1 flex-col items-start justify-center">
          <p className="pt-5 text-justify">
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
        <img
          src={Dashboard_img}
          alt="dash_image"
          className="hidden rounded-l-lg lg:block"
        />
      </div>
    </section>
  );
};

export default Dashboard;
