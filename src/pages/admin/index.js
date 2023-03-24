import { Routes, Route, Navigate, Link } from "react-router-dom";
import Users from "pages/admin/users";
import UsersCreate from "pages/admin/users/create";
import s from "./index.module.scss";

const Admin = () => (
  <div>
    <nav className="navbar navbar-light bg-light" style={{padding: 8}}>
      <div className={s["header__left"]}>
        <span className="navbar-brand mb-0 h1">Rural Senses (Admin)</span>
        <Link className="nav-link" to="/admin/users?role=community_social_worker&page=1&page_size=10&presentation=Community social workers">
          <button type="button" className="btn btn-light">Community social workers</button>
        </Link>
        <Link className="nav-link" to="/admin/users?role=public_official&page=1&page_size=10&presentation=Public officials">
          <button type="button" className="btn btn-light">Public officials</button>
        </Link>
        <Link className="nav-link" to="/admin/users/create">
          <button type="button" className="btn btn-light">Create user</button>
        </Link>
      </div>
      <div>
        <Link className="nav-link" to="/sign-out">Sign Out</Link>
      </div>
    </nav>

    <section>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<UsersCreate />} />
        <Route path="*" element={<Navigate to="/admin/users?role=community_social_worker&page=1&page_size=10&presentation=Community social workers" />} />
      </Routes>
    </section>
  </div>
);

export default Admin;
