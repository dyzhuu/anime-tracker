'use client';
import { useContext, useState } from 'react';
import AnimeCard from '@/components/AnimeCard';
import { Button } from '@/components/ui/button';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      className="absolute z-20 left-0 top-[125px] -translate-y-1/2 -translate-x disabled:hidden bg-zinc-800 hover:bg-zinc-700 fill-white w-10 p-0 -sm:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1.8em"
        viewBox="0 0 448 512"
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
    </Button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Button
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      className="absolute right-0 top-[125px] -translate-y-1/2 translate-x disabled:hidden bg-zinc-800 hover:bg-zinc-700 fill-white w-10 p-0 -sm:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1.8em"
        viewBox="0 0 448 512"
      >
        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
      </svg>
    </Button>
  );
}

export function AnimeBar({ animeList, size }: {animeList: any, size: string}) {
  const [selected, setSelected] = useState([]);

  const isItemSelected = (id: ConcatArray<never>) =>
    !!selected.find((el) => el === id);

  const handleClick = (id: ConcatArray<never>) => () => {
    const itemSelected = isItemSelected(id);

    setSelected((currentSelected) =>
      itemSelected
        ? currentSelected.filter((el) => el !== id)
        : currentSelected.concat(id)
    );
  };

  return (
    <div className="relative md:px-8 hide-scrollbar">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {animeList.map((anime: any, index: ConcatArray<never>) => (
          <AnimeCard
            anime={anime}
            key={index as unknown as number}
            size={size}
            onClick={handleClick(index)}
            selected={isItemSelected(index)}
          ></AnimeCard>
        ))}
      </ScrollMenu>
    </div>
  );
}
