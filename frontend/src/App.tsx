import React, { Fragment } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Cookies from "js-cookie";

import Login from "./pages/Login";
import Main from "./pages/Main";

interface PrivateRouteProps {
	children: React.ReactNode;
	redirectTo: string;
	cookieName: string | undefined;
};
  
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, redirectTo, cookieName }) => {
	const isAuthenticated = !!(Cookies.get(cookieName ? cookieName : ""));
	return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />;
};

const App: React.FC = () => {
	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route 
						path="/" element={
						<PrivateRoute redirectTo="/login" cookieName={ process.env.REACT_APP_AUTH_COOKIE_NAME }> 
							<AuthProvider>
								<Main />
							</AuthProvider>
						</PrivateRoute>
						} 
					/>
					<Route path="/login" element={ <Login /> } />
					<Route path="*" element={ <Navigate to="/login" /> } />
				</Routes>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;