import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "components/Pagination";
import Loader from "components/Loader";
import servicePolls from "services/polls";
import s from "./index.module.scss";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) > 0 ? parseInt(searchParams.get("page")) : 1;
  const pageSize = parseInt(searchParams.get("page_size")) > 0 ? parseInt(searchParams.get("page_size")) : 10;

  useEffect(() => {
    setPolls([]);
    setIsLoading(true);
    servicePolls.getPage(page, pageSize).then(
      data => {
        setPolls(data.items);
        setPageCount(data.page_count);
      }
    ).finally(
      () => setIsLoading(false)
    );
  }, [page, pageSize]);

  const handleChangePage = page => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  return (
    <div className={s["polls"]}>
      <h3>Statistics</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Community name</th>
            <th>Community size</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {
            polls.map(poll => (
              <tr key={poll.id}>
                <th>{poll.id}</th>
                <td>{poll.community_name}</td>
                <td>{poll.community_size}</td>
                <td>
                  {
                    poll.summary.map(stats => (
                      <div className={s["polls__stats"]} key={stats.title}>
                        <p>Title: <b>{stats.title}</b></p>
                        <p>Count: <b>{stats.count}</b></p>
                        <p>Percentage: <b>{stats.percentage}%</b></p>
                      </div>
                    ))
                  }
                </td>
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

export default Polls;
