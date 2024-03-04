import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorPage";
import App from "../App";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Library from "../screens/Library";
import Whishlist from "../screens/Whishlist";
import Playlist from "../screens/Playlist";

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
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/library',
                element: <Library />
            },
            {
                path: '/add-playlist',
                element: <Playlist />
            },
            {
                path: '/whishlist',
                element: <Whishlist />
            },
        ]
    }
])

export default MainRouter