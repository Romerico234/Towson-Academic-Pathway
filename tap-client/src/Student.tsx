import React, { useState, useEffect } from "react";
import StudentService from "./shared/services/student.service";

export default function StudentServiceTestComponent() {
    const [studentData, setStudentData] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");

    const studentService = new StudentService();
    const email = "test@gmail.com"; // Replace with the actual email

    // Fetch student data on component mount
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const data = await studentService.getStudentByEmail(email);
                setStudentData(data);
            } catch (err) {
                setError("Failed to fetch student data");
            }
        };

        const fetchFavorites = async () => {
            try {
                const favs = await studentService.getFavoritesByEmail(email);
                setFavorites(favs);
            } catch (err) {
                setError("Failed to fetch favorites");
            }
        };

        fetchStudentData();
        fetchFavorites();
    }, [email]);

    return (
        <div>
            <h1>Student Service Test</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h2>Student Data</h2>
            <pre>{JSON.stringify(studentData, null, 2)}</pre>

            {/* Uncomment and update the following sections if you want to test adding/removing favorites */}
            {/* <h2>Favorites</h2>
            <ul>
                {favorites.map((fav, index) => (
                    <li key={index}>
                        {fav.name}
                        <button onClick={() => handleRemoveFavorite(fav.name)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddFavorite}>Add Favorite</button> */}
        </div>
    );
}
