import { Navigate, Route, Routes } from 'react-router';
import { App, Auth } from '@src/features';
import { Dashboard, Settings } from '@src/features/app/pages';
import {
    Username,
    FirstName,
    LastName,
    Organization,
    Password,
    PhoneNumber,
    SignIn,
    SignUp,
} from '@src/features/auth/pages';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path={'auth'} element={<Auth />}>
                <Route index element={<Navigate to="sign-in" />} />
                <Route path={'sign-in'} element={<SignIn />} />
                <Route path={'sign-up'} element={<SignUp />}>
                    <Route index element={<Navigate to="username" />} />
                    <Route path={'username'} element={<Username />} />
                    <Route path={'first-name'} element={<FirstName />} />
                    <Route path={'last-name'} element={<LastName />} />
                    <Route path={'phone-number'} element={<PhoneNumber />} />
                    <Route path={'organization'} element={<Organization />} />
                    <Route path={'password'} element={<Password />} />
                </Route>
            </Route>

            {/* Protected routes */}
            <Route path={'app'} element={<App />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path={'dashboard'} element={<Dashboard />} />
                <Route path={'settings'} element={<Settings />} />
            </Route>

            {/* Fallback route for unknown routes */}
            <Route path={'*'} element={<Navigate to="/auth/sign-in" />} />
        </Routes>
    );
};

export default AppRoutes;
