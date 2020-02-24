import React, { FunctionComponent } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import {
  currentPageSelector, pageCountSelector, countSelector, limitSelector
} from 'selectors/products';

interface IPaginationProps {
  handlePageClick: (p: {selected: number}) => void;
}

const Pagination: FunctionComponent<IPaginationProps> = ({ handlePageClick }) => {
  const currentPage = useSelector(currentPageSelector);
  const pageCount = useSelector(pageCountSelector);
  const pageLimit = useSelector(limitSelector);
  const count = useSelector(countSelector);


  return count > pageLimit ? (
    <ReactPaginate
      previousLabel="previous"
      nextLabel="next"
      breakLabel="..."
      breakClassName="break-me"
      initialPage={currentPage}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName="react-paginate"
      activeClassName="active-pag"
    />
  ) : null;
};

export default Pagination;
