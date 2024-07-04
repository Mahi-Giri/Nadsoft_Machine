import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { signinFailure, signinSuccess } from "../redux/userSlice";

const Signin = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, error } = useSelector((store) => store.user);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/user/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(signinSuccess(data));
            } else {
                dispatch(signinFailure(data.message));
            }
        } catch (error) {
            dispatch(signinFailure(error.message));
        }
    };

    useEffect(() => {
        if (currentUser) {
            navigate("/student-listing");
        }
    }, [currentUser, navigate]);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    className="bg-slate-100 p-3 rounded-lg"
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    className="bg-slate-100 p-3 rounded-lg"
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Sign In
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don't have an account? </p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign up</span>
                </Link>
            </div>
            {error && <p className="mt-5 text-red-500">{error}</p>}
        </div>
    );
};

export default Signin;
