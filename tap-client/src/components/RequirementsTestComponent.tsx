import { useEffect, useState } from "react";
import RequirementsService from "../shared/services/requirements.service";

export default function RequirementsTestComponent() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const requirementsService = new RequirementsService();

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const requirements =
                    await requirementsService.getRequirements();
                setData(requirements);
            } catch (error) {
                console.error("Error fetching requirements:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequirements();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Requirements Test Component</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
