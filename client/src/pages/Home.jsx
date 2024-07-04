import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="pb-20 flex items-center justify-center">
            <div className="max-w-2xl mx-auto p-3 text-center">
                <div>
                    <h1 className="text-3xl font-semibold text-center my-7">
                        Building a Robust Teacher Portal with React.js and Node.js
                    </h1>
                    <div className="text-md text-gray-500 flex flex-col gap-6 italic">
                        <p>
                            If you want to access Teacher Portal please <Link to={"/sign-in"} className="text-blue-500">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
