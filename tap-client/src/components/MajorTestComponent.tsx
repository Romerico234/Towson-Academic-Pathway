import { useEffect, useState } from "react";
import MajorService from "../shared/services/major.service";

export default function MajorTestComponent() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const majorService = new MajorService();

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const majors = await majorService.getAllMajors();
                setData(majors);
            } catch (error) {
                console.error("Error fetching majors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMajors();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Major Test Component</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
