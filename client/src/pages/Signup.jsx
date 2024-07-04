import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../constant";

const Signup = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${backendURL}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/sign-in");
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <input
                    className="bg-slate-100 p-3 rounded-lg"
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <input
                    className="bg-slate-100 p-3 rounded-lg"
                    type="email"
                    name=""
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    className="bg-slate-100 p-3 rounded-lg"
                    type="password"
                    name=""
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Sign Up
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account? </p>
                <Link to="/">
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
        </div>
    );
};

export default Signup;
