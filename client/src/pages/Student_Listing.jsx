import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../constant";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/userSlice";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";

const StudentListing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [editFormData, setEditFormData] = useState({
        _id: "",
        name: "",
        subject: "",
        mark: "",
    });

    const getAllStudent = async () => {
        const response = await fetch(`${backendURL}/student/getStudents`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
            setStudents(data);
        }
    };

    useEffect(() => {
        getAllStudent();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${backendURL}/user/signout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(signOutSuccess(null));
                localStorage.removeItem("user");
                navigate("/");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDropdownToggle = (studentId) => {
        setDropdownOpen((prev) => (prev === studentId ? null : studentId));
    };

    const handleEditClick = (student) => {
        setEditFormData(student);
        setIsEditPopupOpen(true);
    };

    const handleDelete = async (studentId) => {
        const response = await fetch(`${backendURL}/student/delete/${studentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            getAllStudent();
        }
    };

    return (
        <div className="">
            <div className="flex justify-between p-3 bg-gray-400">
                <p className="text-red-700">tailwebs.</p>
                <div className="flex gap-6 font-semibold">
                    <p className="hover:underline">Home</p>
                    <p className="hover:underline" onClick={handleLogout}>
                        Logout
                    </p>
                </div>
            </div>
            <table className="w-full text-center">
                <thead className="font-semibold">
                    <tr>
                        <td>Name</td>
                        <td>Subject</td>
                        <td>Mark</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <>
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.subject}</td>
                                <td>{student.mark}</td>
                                <td>
                                    <div className="relative inline-block text-left">
                                        <IoIosArrowDropdownCircle
                                            onClick={() => handleDropdownToggle(student._id)}
                                            className="w-6 h-6"
                                        />
                                        {dropdownOpen === student._id && (
                                            <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                <div
                                                    className="py-1"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="options-menu"
                                                >
                                                    <button
                                                        onClick={() => handleEditClick(student)}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(student._id)}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            {index < students.length - 1 && (
                                <tr key={`underline-${student._id}`}>
                                    <td colSpan="4" className="border-b border-gray-400"></td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
            <button className="bg-gray-600 text-white py-2 px-10 mt-10 ml-10" onClick={() => setIsPopupOpen(true)}>
                ADD
            </button>

            {isPopupOpen && <AddStudent setIsPopupOpen={setIsPopupOpen} getAllStudent={getAllStudent} />}

            {isEditPopupOpen && (
                <EditStudent
                    setIsEditPopupOpen={setIsEditPopupOpen}
                    editFormData={editFormData}
                    setEditFormData={setEditFormData}
                    getAllStudent={getAllStudent}
                />
            )}
        </div>
    );
};

export default StudentListing;
