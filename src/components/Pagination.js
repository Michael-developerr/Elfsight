import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const pageClickHandler = useCallback(
    (index) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePage(index + 1);
      setApiURL(pages[index].toString());
    },
    [setActivePage, setApiURL, pages]
  );

  const handleFirstClick = useCallback(() => pageClickHandler(0), [
    pageClickHandler
  ]);
  const handlePrevClick = useCallback(() => pageClickHandler(activePage - 2), [
    pageClickHandler,
    activePage
  ]);
  const handleNextClick = useCallback(() => pageClickHandler(activePage), [
    pageClickHandler,
    activePage
  ]);
  const handleLastClick = useCallback(
    () => pageClickHandler(pages.length - 1),
    [pageClickHandler, pages.length]
  );

  useEffect(() => {
    if (!info.pages) return;

    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);
      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info, apiURL]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {activePage > 1 && (
        <>
          <Page onClick={handleFirstClick}>« First</Page>
          <Ellipsis>...</Ellipsis>
          <Page onClick={handlePrevClick}>{activePage - 1}</Page>
        </>
      )}

      <Page active>{activePage}</Page>

      {activePage < pages.length && (
        <>
          <Page onClick={handleNextClick}>{activePage + 1}</Page>
          <Ellipsis>...</Ellipsis>
          <Page onClick={handleLastClick}>Last »</Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
