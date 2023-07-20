'use client';

import { Input } from '@/components/ui/input';
import { Icons } from '@/lib/icons';
import { useState } from 'react';
import AnimeSearchCard from './AnimeSearchCard';

export function SearchBar({ className, icon, imageSize }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [animeResults, setAnimeResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  async function onSearch(search: string) {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchQuery(search);
    }

    const newSearchTimeout = setTimeout(() => {
      fetchAnimeResults(search);
    }, 150);

    setSearchTimeout(newSearchTimeout);
  }

  async function fetchAnimeResults(search: string) {
    const query = `query {
  Page(perPage: 15) {
    media(search: "${search}", isAdult: false, sort: [POPULARITY_DESC, SEARCH_MATCH], type: ANIME) {
      idMal
      title {
        romaji
        english
        native
      }
      coverImage {
        medium
      }
    }
  }
}`;
    setSearchQuery(search);
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    const data = (await res.json()).data.Page.media;
    const filteredResults = data.filter((anime: any) => anime?.idMal);
    setAnimeResults(filteredResults);
  }

  return (
    <div className="relative transition-all">
      <Icons.search
        className={
          'absolute top-[50%] -translate-y-[50%] pointer-events-none ' + icon
        }
      ></Icons.search>
      <Input
        type="search"
        placeholder="Search..."
        autoComplete="false"
        autoCorrect="false"
        spellCheck="false"
        className={`peer ${className}`}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div
        className={`absolute w-full bg-background shadow-lg rounded-bl rounded-br z-10 ${
          searchQuery.length === 0 && 'hidden'
        }`}
      >
        {animeResults.map((anime: any, index: number) => {
          return (
            <div key={index}>
              <AnimeSearchCard
                anime={anime}
                index={index}
                imageSize={imageSize}
              ></AnimeSearchCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
