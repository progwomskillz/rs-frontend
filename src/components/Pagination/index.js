const Pagination = ({
  page = 1,
  pageCount = 1,
  isLoading = false,
  onChangePage = () => {}
}) => {
  const isFirst = page === 1;
  const isLast = page === pageCount;

  const handleClickFirst = () => {
    if (isLoading || isFirst) {
      return;
    }
    onChangePage(1);
  };

  const handleClickLast = () => {
    if (isLoading || isLast) {
      return;
    }
    onChangePage(pageCount);
  };

  return (
    <nav style={{margin: "auto", width: "fit-content"}}>
      <ul className="pagination">
        <li className="page-item"><p className="page-link" onClick={handleClickFirst}>First</p></li>
        {
          !isFirst && (
            <li className="page-item"><p className="page-link" onClick={() => onChangePage(page-1)}>{page-1}</p></li>
          )
        }
        <li className="page-item active"><p className="page-link">{page}</p></li>
        {
          !isLast && (
            <li className="page-item"><p className="page-link" onClick={() => onChangePage(page+1)}>{page+1}</p></li>
          )
        }
        <li className="page-item"><p className="page-link" onClick={handleClickLast}>Last</p></li>
      </ul>
    </nav>
  );
};

export default Pagination;
