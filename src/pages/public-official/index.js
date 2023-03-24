import { Routes, Route, Navigate, Link } from "react-router-dom";
import Polls from "pages/public-official/polls";
import s from "./index.module.scss";

const PublicOfficial = () => (
  <div>
    <nav className="navbar navbar-light bg-light" style={{padding: 8}}>
      <div className={s["header__left"]}>
        <span className="navbar-brand mb-0 h1">Rural Senses (Public Official)</span>
        <Link className="nav-link" to="/public-official/polls?page=1&page_size=10">
          <button type="button" className="btn btn-light">Review statistics</button>
        </Link>
      </div>
      <div>
        <Link className="nav-link" to="/sign-out">Sign Out</Link>
      </div>
    </nav>

    <section>
      <Routes>
        <Route path="/polls" element={<Polls />} />
        <Route path="*" element={<Navigate to="/public-official/polls?page=1&page_size=10" />} />
      </Routes>
    </section>
  </div>
);

export default PublicOfficial;
