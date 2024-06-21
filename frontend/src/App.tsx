import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";
import Playlist from "./pages/Playlist";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route 
					path="/" element={
						<PrivateRoute redirectTo="/login" cookieName={ process.env.REACT_APP_AUTH_COOKIE_NAME }> 
							<Main />
						</PrivateRoute>
					} 
				/>
				<Route 
					path="/playlist" element={
						<PrivateRoute redirectTo="/login" cookieName={ process.env.REACT_APP_AUTH_COOKIE_NAME }> 
							<Playlist />
						</PrivateRoute>
					} 
				/>
				<Route path="/login" element={ <Login /> } />
				<Route path="*" element={ <Navigate to="/login" /> } />
			</Routes>
		</BrowserRouter>
	);
}

export default App;