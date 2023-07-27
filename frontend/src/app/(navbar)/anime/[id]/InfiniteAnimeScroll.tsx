'use client'
import AnimeCard from "@/components/AnimeCard";
import { getAnime } from "@/lib/gql";
import { Icons } from "@/lib/icons";
import { useIntersection } from "@mantine/hooks";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function InfiniteAnimeScroll({ query, initial}: {query: string, initial: string}) {

  const fetchAnime = async ({ pageParam = 1}) => {
    return await getAnime(query, pageParam);
  }

  const initialAnime: InfiniteData<any> = {
    pages: [initial],
    pageParams: [1]
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [query],
      queryFn: fetchAnime,
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: initialAnime,
      staleTime: 60 * 60 * 1000,
    });

  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  })

  
  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry, fetchNextPage])
  
  const animeList = data?.pages.flatMap(p => p)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center -md:p-1 mb-10">
        {animeList?.map((anime: any, index: number) => {
          if (index === animeList.length - 1) {
            return (
              <div key={index} ref={ref}>
                <AnimeCard anime={anime} size="full"></AnimeCard>
              </div>
            );
          }
          return <AnimeCard anime={anime} key={index} size="full"></AnimeCard>;
        })}
      </div>
      <div className="flex justify-center">
        <div className="w-[40px]">
        {isFetchingNextPage && <Icons.spinner className="h-full w-full justify-center animate-spin" />}
        </div>
      </div>
    </>
  );
}