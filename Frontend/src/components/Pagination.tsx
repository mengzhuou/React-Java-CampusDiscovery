import PageLink from './PageLink';
import './Pagination.css';

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  maxLength, //maxLength need to keep in track of # of event instance
  setCurrentPage,
}: Props) {
  const pageNums = [1,2,3]; //need to extend the pageNum when event num is > 10

  return (
    // aira-label is an Assistant Technology to help people realize where they are in the webpage, optional here 
    <nav className="pagination" aria-label="Pagination">
      <PageLink
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => setCurrentPage(pageNum)}
        >
          {/* shows you the page number*/}
          {pageNum} 
        </PageLink>
      ))}
      <PageLink
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </PageLink>
    </nav>
  );
}