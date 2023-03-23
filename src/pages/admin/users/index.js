import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "components/Pagination";
import Loader from "components/Loader";
import serviceUsers from "services/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    serviceUsers.getPage(
      searchParams.get("role"),
      searchParams.get("page"),
      searchParams.get("page_size")
    ).then(
      data => {
        setUsers(data.items);
        setPage(data.page);
        setPageCount(data.page_count);
      }
    ).finally(
      () => setIsLoading(false)
    );
  }, [searchParams])

  const handleChangePage = page => {
    console.log(page)
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <h3>{searchParams.get("presentation")}</h3>
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
