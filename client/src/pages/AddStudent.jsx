import { useState } from "react";
import { backendURL } from "../constant";

const AddStudent = ({ setIsPopupOpen, getAllStudent }) => {
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        mark: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/student/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsPopupOpen(false);
                setFormData({
                    name: "",
                    subject: "",
                    mark: "",
                });
                getAllStudent();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg w-1/2">
                <h2 className="text-xl mb-4">Add Student</h2>
                <form onSubmit={handleAddStudent}>
                    <div className="mb-2">
                        <label className="block mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1" htmlFor="subject">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="mark">
                            Mark
                        </label>
                        <input
                            type="number"
                            id="mark"
                            name="mark"
                            value={formData.mark}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsPopupOpen(false)}
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
