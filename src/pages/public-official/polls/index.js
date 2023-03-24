import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "components/Pagination";
import Loader from "components/Loader";
import servicePolls from "services/polls";
import serviceReviseRequests from "services/revise-requests";
import s from "./index.module.scss";

const Polls = () => {
  const [summary, setSummary] = useState([]);
  const [isShowSummary, setIsShowSummary] = useState(false);
  const [polls, setPolls] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) > 0 ? parseInt(searchParams.get("page")) : 1;
  const pageSize = parseInt(searchParams.get("page_size")) > 0 ? parseInt(searchParams.get("page_size")) : 10;

  useEffect(() => {
    const fetch = async () => {
      setSummary([]);
      setPolls([]);
      setIsLoading(true);
      const summary = await servicePolls.getSummary();
      setSummary(summary);
      const pollsPage = await servicePolls.getPage(page, pageSize);
      setPolls(pollsPage.items);
      setPageCount(pollsPage.page_count);
      setIsLoading(false);
    }
    fetch();
  }, [page, pageSize]);

  const toggleIsShowSummary = () => setIsShowSummary(isShowSummary => !isShowSummary);

  const handleClickReviseData = pollId => {
    setIsLoading(true);
    serviceReviseRequests.create(pollId).finally(() => setIsLoading(false));
  }

  const handleChangePage = page => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  return (
    <div className={s["polls"]}>
      <div className="card card-body">
        <button className="btn btn-primary" type="button" onClick={toggleIsShowSummary}>
          {isShowSummary ? "Hide" : "Show"} summary
        </button>
        <div className={`collapse ${isShowSummary ? "show" : ""} ${s["polls__collapse"]}`}>
          <div className="card card-body">
            {
              summary.map(stats => (
                <div className={s["polls__stats"]} key={stats.title}>
                  <p>Title: <b>{stats.title}</b></p>
                  <p>Count: <b>{stats.count}</b></p>
                  <p>Percentage: <b>{stats.percentage}%</b></p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <h3>Statistics</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Community name</th>
            <th>Community size</th>
            <th>Summary</th>
            <th>Actions</th>
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
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleClickReviseData(poll.id)}
                  >
                    Revise data
                  </button>
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
