import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorPage";
import App from "../App";
import Home from "../screens/Home";

const MainRouter = createBrowserRouter([
    {
        element: (
            <>
                <App />
            </>

        ),
        errorElement: <ErrorPage />,
        //on declare les routes avec leurs vue
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])

export default MainRouter