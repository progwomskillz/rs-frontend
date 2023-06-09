import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "components/Pagination";
import Loader from "components/Loader";
import serviceUsers from "services/users";
import s from "./index.module.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const role = searchParams.get("role") || "";
  const presentation = searchParams.get("presentation") || "";
  const page = parseInt(searchParams.get("page")) > 0 ? parseInt(searchParams.get("page")) : 1;
  const pageSize = parseInt(searchParams.get("page_size")) > 0 ? parseInt(searchParams.get("page_size")) : 10;

  useEffect(() => {
    setUsers([]);
    setIsLoading(true);
    serviceUsers.getPage(role, page, pageSize).then(
      data => {
        setUsers(data.items);
        setPageCount(data.page_count);
      }
    ).finally(
      () => setIsLoading(false)
    );
  }, [role, page, pageSize])

  const handleChangePage = page => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  return (
    <div className={s["users"]}>
      <h3>{presentation}</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.username}</td>
                <td>{user.profile.first_name}</td>
                <td>{user.profile.last_name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination
        page={page}
        pageCount={pageCount}
        isLoading={isLoading}
        onChangePage={handleChangePage}
      />
      <Loader isOpen={isLoading} />
    </div>
  )
};

export default Users;
