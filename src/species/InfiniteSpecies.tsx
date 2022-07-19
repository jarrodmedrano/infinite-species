import React from 'react';
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

import Species from "./Species";


export function InfiniteSpecies() {
  // const {
  //   data,
  //   isLoading,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isError,
  //   error,
  // } = useInfiniteQuery(
  //   "sw-species",
  //   fetchUrl,
  //   {
  //     getNextPageParam: (lastPage) => lastPage.next || undefined,
  //   }
  // );


const initialUrl = "https://swapi.dev/api/species/";
  const fetchUrl = async ({ pageParam = initialUrl }) => {
    const response = await fetch(pageParam);
    console.log('respponse', response);
    return response.json();
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error
  } = useInfiniteQuery( "sw-species",
  fetchUrl, {
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetchingNextPage && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((species) => {
            return (
              <Species
                key={species.name}
                name={species.name}
                language={species.language}
                averageLifespan={species.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
