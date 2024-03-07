import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import App from "../App";
import Home from "../screens/OnlineScreens/Home";
import Search from "../screens/OnlineScreens/Search";
import Library from "../screens/OnlineScreens/Library";
import Whishlist from "../screens/OnlineScreens/Whishlist";
import Playlist from "../screens/OnlineScreens/Playlist";

const OnlineRouter = createBrowserRouter([
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

export default OnlineRouter