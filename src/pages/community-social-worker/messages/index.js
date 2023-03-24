import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "components/Pagination";
import Loader from "components/Loader";
import serviceReviseRequests from "services/revise-requests";
import s from "./index.module.scss";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) > 0 ? parseInt(searchParams.get("page")) : 1;
  const pageSize = parseInt(searchParams.get("page_size")) > 0 ? parseInt(searchParams.get("page_size")) : 10;

  useEffect(() => {
    setMessages([]);
    setIsLoading(true);
    serviceReviseRequests.getPage(page, pageSize).then(
      data => {
        setMessages(data.items);
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
    <div className={s["messages"]}>
      <h3>Messages</h3>
      <ul>
        {
          messages.map(message => (
            <li>Please revise the data for community <b>{message.poll.community_name}</b></li>
          ))
        }
      </ul>
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

export default Messages;
