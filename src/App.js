import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return <div>
		<AuthProvider>
			<Routes>
				<Route path="/sign-up" element={<SignUp></SignUp>}></Route>
				<Route path="/sign-in" element={<SignIn></SignIn>}></Route>
				<Route path="/" element={<Homepage></Homepage>}></Route>
				<Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
			</Routes>
		</AuthProvider>

	</div>;
}

export default App;
