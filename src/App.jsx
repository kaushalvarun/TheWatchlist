import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from './LoginPage.jsx';
import SearchPage from './SearchPage.jsx';
import WatchlistPage from './WatchListPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import ProfilePage from "./ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/search-and-results',
    element: <SearchPage/>,
  },
  {
    path: '/my-watchlist',
    element: <WatchlistPage/>,
  },
  {
    path: '/profile',
    element: <ProfilePage/>,
  },
],{ basename: import.meta.env.DEV ? '/' : '/TheWatchlist/' });


function App() {
  return (
    <RouterProvider router = {router}/>
  )
}

export default App;
