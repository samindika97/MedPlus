import { useFormik } from "formik";
import { contactusSchema } from "../schemas/contactus_schema";
import axios from 'axios';

import Footer from "../components/Footer";
import contactUsImage from "../assets/contactUsImage.jpg";

import BASE_URL from "../config/ApiConfig";

const onSubmit = async (values) => {
    const form_data = JSON.stringify(values, null, 2);
    const config = {
        headers: { "content-type": "application/json" }
    }
    axios.post(`${BASE_URL}message`, form_data, config);
    console.log('submitted');
};

const ContactUs = () => {

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema: contactusSchema,
        onSubmit,
    });

    return (
        <div>
            <div className="flex flex-row">
            <div className="w-2/5 flex flex-col bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 basis-1/2">
                <h2 className="text-4xl text-center font-extrabold m-10">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="py-4">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className={errors.name && touched.name ? "shadow appearance-none border border-redDefault-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.name && touched.name && <p className="text-redDefault-500 text-xs italic">{errors.name}</p>}
                    </div>
                    <div className="py=4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className={errors.email && touched.email ? "shadow appearance-none border border-redDefault-500 rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.email && touched.email && <p className="text-redDefault-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="py=4">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            className={errors.message && touched.message ? "shadow appearance-none border border-redDefault-500 rounded w-full py-6 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                            value={values.message}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        ></textarea>
                        {errors.message && touched.message && <p className="text-redDefault-500 text-xs italic">{errors.message}</p>}
                    </div>

                    <input type="submit" className="bg-blueDefault-500 hover:bg-blueDefault-700 text-white font-bold py-2 px-4 my-8 rounded focus:outline-none focus:shadow-outline" value="Contact Us" />
                </form>
            </div>
            <div className="basis-1/2">
                <img src={contactUsImage} alt="contact_us_image" />
            </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
        
    );
};

export default ContactUs;