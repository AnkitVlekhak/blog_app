import "./App.css"
// import store from "./store/ReduxStore";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowBlog from "./components/ShowBlog/ShowBlog";
import Auth from "./components/Auth/Auth";
import ReadBlog from "./components/ReadBlog/ReadBlog";
import AddBlog from "./components/AddBlog/AddBlog";
function App() {
  const user = useSelector(state => state.authReducer.authData);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
  }
  return (
    <div className="App">
      {/* <div className="blur" style={{ top: '-18%', right: '0' }}></div> */}
      {/* <div className="blur" style={{ top: '36%', left: '-8rem' }}></div> */}
      <div className="nav">
        <Link style={{ textDecoration: "none" }} to={`/home`}>
          All Blogs
        </Link>
        <Link style={{ textDecoration: "none" }} to={`/user-blogs`}>
          My Blogs
        </Link>
        <Link style={{ textDecoration: "none" }} to={`/create-blog`}>
          Create a Blog
        </Link>
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>Log Out</button>
      </div>
      <div className="rest">
        <Routes>
          <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
          <Route path="/home" element={user ? <ShowBlog page={0} /> : <Navigate to="../auth" />} />
          <Route path="/user-blogs" element={user ? <ShowBlog page={1} /> : <Navigate to="../auth" />} />
          <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
          <Route path="/blogs/:id" element={user ? <ReadBlog /> : <Navigate to="../auth" />} />
          <Route path="/create-blog" element={user ? <AddBlog /> : <Navigate to="../auth" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
