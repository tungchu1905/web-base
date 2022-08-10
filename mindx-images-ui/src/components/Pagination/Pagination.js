import React from 'react';
import { Pagination as BPagination } from 'react-bootstrap'

function Pagination({
    activePage,
    handleChangePage
}) {
    const onChangePage = (newActivePage) => {
        handleChangePage(newActivePage);
    }
    
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <BPagination.Item 
            key={number} 
            active={number === activePage}
            onClick={()=> onChangePage(number)}>
                {number}
            </BPagination.Item>
        );
    }

    return (
        <div className="Pagination">
            <BPagination>{items}</BPagination>
        </div>
    )
}

export default Pagination