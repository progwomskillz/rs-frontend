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
      <ul class="pagination">
        <li class="page-item"><p class="page-link" onClick={handleClickFirst}>First</p></li>
        {
          page !== 1 && (
            <li class="page-item"><p class="page-link" onClick={() => onChangePage(page-1)}>{page-1}</p></li>
          )
        }
        <li class="page-item active"><p class="page-link">{page}</p></li>
        {
          page !== pageCount && (
            <li class="page-item"><p class="page-link" onClick={() => onChangePage(page+1)}>{page+1}</p></li>
          )
        }
        <li class="page-item"><p class="page-link" onClick={handleClickLast}>Last</p></li>
      </ul>
    </nav>
  );
};

export default Pagination;
