interface Props {
    planData: any;
}

export default function DegreeCompletionPlannerComponent({ planData }: Props) {
    if (!planData) {
        return <div>No degree plan data available.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-20 px-6">
            <h1 className="text-2xl font-bold mb-4">Degree Plan</h1>
            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify(planData, null, 2)}
            </pre>
        </div>
    );
}
