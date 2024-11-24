import { useEffect, useState } from "react";
import CoreService from "../shared/services/core.service";

export default function CoreTestComponent() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const coreService = new CoreService();

    useEffect(() => {
        const fetchCores = async () => {
            try {
                const cores = await coreService.getAllCores();
                setData(cores);
            } catch (error) {
                console.error("Error fetching cores:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCores();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Core Test Component</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
