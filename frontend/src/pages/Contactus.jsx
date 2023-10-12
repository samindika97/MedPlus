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
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className={errors.name && touched.name ? "input-error" : ""}
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    {errors.name && touched.name && <p className="error">{errors.name}</p>}

                    
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={errors.email && touched.email ? "input-error" : ""}
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    {errors.email && touched.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        className={errors.message && touched.message ? "input-error" : ""}
                        value={values.message}
                        onBlur={handleBlur} 
                        onChange={handleChange}
                    ></textarea>
                    {errors.message && touched.message && <p className="error">{errors.message}</p>}
                </div>

                <input type="submit" className="bg-primary" value="Submit" />
            </form>
        </div>
    );
};

export default ContactUs;