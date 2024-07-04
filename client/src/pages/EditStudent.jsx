import { backendURL } from "../constant";

const EditStudent = ({ setIsEditPopupOpen, editFormData, setEditFormData, getAllStudent }) => {
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleEditStudent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/student/update/${editFormData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                setIsEditPopupOpen(false);
                setEditFormData({
                    _id: "",
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
                <h2 className="text-xl mb-4">Edit Student</h2>
                <form onSubmit={handleEditStudent}>
                    <div className="mb-2">
                        <label className="block mb-1" htmlFor="edit-name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="edit-name"
                            name="name"
                            value={editFormData.name}
                            onChange={handleEditInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1" htmlFor="edit-subject">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="edit-subject"
                            name="subject"
                            value={editFormData.subject}
                            onChange={handleEditInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="edit-mark">
                            Mark
                        </label>
                        <input
                            type="number"
                            id="edit-mark"
                            name="mark"
                            value={editFormData.mark}
                            onChange={handleEditInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsEditPopupOpen(false)}
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Edit Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStudent;
