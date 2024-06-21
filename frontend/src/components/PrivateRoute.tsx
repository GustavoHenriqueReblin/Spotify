import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PrivateLayout from "./PrivateLayout";
import { PlaylistProvider } from "../contexts/PlaylistContext";

interface PrivateRouteProps {
	children: React.ReactNode;
	redirectTo: string;
	cookieName: string | undefined;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, redirectTo, cookieName }) => {
	const isAuthenticated = Boolean(Cookies.get(cookieName ?? ""));
  
	return isAuthenticated ? (
		<AuthProvider>
			<PlaylistProvider>
				<PrivateLayout>
					{ children }
				</PrivateLayout>
			</PlaylistProvider>
		</AuthProvider>
	) : (
	  	<Navigate to={redirectTo} />
	);
};

export default PrivateRoute;
