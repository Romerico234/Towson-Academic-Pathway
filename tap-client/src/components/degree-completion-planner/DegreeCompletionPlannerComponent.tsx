// import { useState, useEffect } from 'react';
// import { useAuth } from '../auth/AuthComponent';
// import UserService from '../../shared/services/user.service';

// export default function DegreeCompletionPlannerComponent() {
//     const { token, refreshAccessToken } = useAuth();
//     const [degreePlans, setDegreePlans] = useState([]);
//     const userService = new UserService();

//     useEffect(() => {
//         const fetchDegreePlans = async () => {
//             try {
//                 const plans = await userService.getDegreePlan();
//                 setDegreePlans(plans);
//             } catch (error) {
//                 // If token is expired, try to refresh
//                 if (error.response && error.response.status === 401) {
//                     await refreshAccessToken();
//                     // Retry fetching after token refresh
//                     const plans = await userService.getDegreePlan();
//                     setDegreePlans(plans);
//                 }
//             }
//         };

//         if (token) {
//             fetchDegreePlans();
//         }
//     }, [token]);

//     // Rest of your component logic...
// }

export default function DegreeCompletionPlannerComponent() {
    return (
        <div>
            <h1>Degree Completion Planner</h1>
            <p>Coming soon...</p>
        </div>
    );
}