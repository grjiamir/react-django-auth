import { Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/components/RequireAuth";
import Home from "./example/Home";
import Layout from "./example/Layout";
import Login from "./example/Login";
import Private from "./example/Private";
import Unauthorized from "./example/Unauthorized";


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth permissins={["add_group", "view_group"]} />}>
          <Route path="private" element={<Private />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
