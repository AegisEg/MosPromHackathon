import React, { ReactNode, useEffect, useState } from 'react';
import './style.scss';

interface RenderWithPaginationProps {
  list: ReactNode[];
}

function RenderWithPagination({ list }: RenderWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const countElements = 5;

  useEffect(() => {
    setTotalPages(Math.ceil(list.length / countElements));
  }, [list]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="render_with_pagination">
      {list.slice((currentPage - 1) * countElements, currentPage * countElements).map((element, index) => (
        <div key={index}>{element}</div>
      ))}
      <div className="render_with_pagination__buttons">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default RenderWithPagination;
