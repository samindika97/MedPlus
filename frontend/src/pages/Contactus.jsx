import {useFormik } from "formik" ;
import { contactusSchema } from "../schemas/contactus_schema";
import axios from 'axios';

import BASE_URL from "../config/ApiConfig";

const onSubmit = async(values) =>{
    const form_data = JSON.stringify(values, null, 2);
    const config = {
        headers: {"content-type": "application/json"}
    }
    axios.post(`${BASE_URL}message`,form_data,config);
    console.log('submitted');
};

const ContactUs = () => {

    const {values, handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
        initialValues:{
            name : "",
            email : "",
            message:"",
        },
        validationSchema:contactusSchema,
        onSubmit,
    });

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className={errors.name && touched.name ? "shadow appearance-none border border-redDefault-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    {errors.name && touched.name && <p className="text-redDefault-500 text-xs italic">{errors.name}</p>}

                    
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={errors.email && touched.email ? "shadow appearance-none border border-redDefault-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    {errors.email && touched.email && <p className="text-redDefault-500 text-xs italic">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        className={errors.message && touched.message ? "shadow appearance-none border border-redDefault-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                        value={values.message}
                        onBlur={handleBlur} 
                        onChange={handleChange}
                    ></textarea>
                    {errors.message && touched.message && <p className="text-redDefault-500 text-xs italic">{errors.message}</p>}
                </div>

                <input type="submit" className="bg-blueDefault-500 hover:bg-blueDefault-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Submit" />
            </form>
        </div>
    );
};

export default ContactUs;