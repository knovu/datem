import { AuthLayout } from '@src/components';
import SignIn from '@src/features/auth/pages/sign-in/sign-in';
import SignUp from '@src/features/auth/pages/sign-up/sign-up';
import { Navigate, Route, Routes } from 'react-router';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'auth'} element={<AuthLayout />}>
                <Route path={'sign-in'} element={<SignIn />} />
                <Route path={'sign-up'} element={<SignUp />} />
            </Route>
            <Route path={'*'} element={<Navigate to="/auth/sign-in" />} />
        </Routes>
    );
};

export default AppRoutes;
