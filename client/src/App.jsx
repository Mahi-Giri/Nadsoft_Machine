import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Student_Listing from "./pages/Student_Listing";
import PrivateRoute from "./component/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/student-listing" element={<Student_Listing />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
