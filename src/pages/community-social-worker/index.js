import { Routes, Route, Navigate, Link } from "react-router-dom";
import PollsCreate from "pages/community-social-worker/polls/create";
import Polls from "pages/community-social-worker/polls";
import Messages from "pages/community-social-worker/messages";
import s from "./index.module.scss";

const CommunitySocialWorker = () => (
  <div>
    <nav className="navbar navbar-light bg-light" style={{padding: 8}}>
      <div className={s["header__left"]}>
        <span className="navbar-brand mb-0 h1">Rural Senses (Community Social Worker)</span>
        <Link className="nav-link" to="/community-social-worker/polls/create">
          <button type="button" className="btn btn-light">Upload data</button>
        </Link>
        <Link className="nav-link" to="/community-social-worker/polls?page=1&page_size=10">
          <button type="button" className="btn btn-light">Review statistics</button>
        </Link>
        <Link className="nav-link" to="/community-social-worker/messages?page=1&page_size=10">
          <button type="button" className="btn btn-light">Messages</button>
        </Link>
      </div>
      <div>
        <Link className="nav-link" to="/sign-out">Sign Out</Link>
      </div>
    </nav>

    <section>
      <Routes>
        <Route path="/polls/create" element={<PollsCreate />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<Navigate to="/community-social-worker/messages?page=1&page_size=10" />} />
      </Routes>
    </section>
  </div>
);

export default CommunitySocialWorker;
