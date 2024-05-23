import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { backendURL } from "./constant";

function App() {
    const [data, setData] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        email: "",
        age: "",
        marks: null,
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(`${backendURL}/student/getStudents`, {
                    method: "GET",
                });

                const data = await response.json();

                if (response.ok) {
                    setData(data);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error.message);
        }
    }, [formData]);

    const handleClick = () => {
        setFormVisible(!isFormVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormVisible(false);

        try {
            const response = await fetch(`${backendURL}/student/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({
                    id: null,
                    name: "",
                    email: "",
                    age: "",
                    marks: null,
                });
            } else {
                console.log(error.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleDelete = async (id) => {
        setSelectedStudentId(id);
        setModalVisible(true);
    };

    const confirmDelete = async () => {
        setModalVisible(false);
        try {
            const response = await fetch(`${backendURL}/student/delete/${selectedStudentId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const updatedData = data.filter((item) => item._id !== selectedStudentId);
                setData(updatedData);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const cancelDelete = () => {
        setModalVisible(false);
        setSelectedStudentId(null);
    };

    return (
        <div className="p-3 flex flex-col justify-center">
            <table className="border-collapse border border-gray-500">
                <thead>
                    <tr className="border border-gray-500">
                        <th className="border border-gray-500 p-2">ID</th>
                        <th className="border border-gray-500 p-2">Name</th>
                        <th className="border border-gray-500 p-2">Email</th>
                        <th className="border border-gray-500 p-2">Age</th>
                        <th className="border border-gray-500 p-2">Marks</th>
                        <th className="border border-gray-500 p-2">Delete</th>
                    </tr>
                </thead>
                {data.map((item) => (
                    <tbody className="m-auto" key={item._id}>
                        <tr className="border border-gray-500">
                            <td className="border border-gray-500">{item.id}</td>
                            <td className="border border-gray-500">{item.name}</td>
                            <td className="border border-gray-500">{item.email}</td>
                            <td className="border border-gray-500">{item.age}</td>
                            <td className="border border-gray-500">{item.marks}</td>
                            <td className="border border-gray-500">
                                <button className="btn btn-danger text-red-600" onClick={() => handleDelete(item._id)}>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <button className="uppercase p-2 bg-green-600 mt-2 rounded-lg text-white" onClick={handleClick}>
                add new member
            </button>

            {isFormVisible && (
                <div>
                    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md mt-4">
                        <h2 className="text-xl mb-4">Add New Member</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" htmlFor="name">
                                member Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" htmlFor="email">
                                member Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" htmlFor="email">
                                member Age
                            </label>
                            <input
                                type="number"
                                id="age"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" htmlFor="email">
                                member Marks
                            </label>
                            <input
                                type="number"
                                id="marks"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 uppercase" htmlFor="email">
                                Member parent ID
                            </label>
                            <input
                                type="number"
                                id="id"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Student
                        </button>
                    </form>
                </div>
            )}

            {isModalVisible && (
                <div className="modal fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-lg z-50">
                        <h2 className="text-xl mb-4">Are you sure you want to delete this student?</h2>
                        <div className="flex justify-end">
                            <button
                                className="btn btn-secondary mr-2 px-4 py-2 bg-gray-300 text-black rounded"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger px-4 py-2 bg-red-600 text-white rounded"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop fixed inset-0 bg-black opacity-50"></div>
                </div>
            )}
        </div>
    );
}

export default App;
