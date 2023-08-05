export enum query {
  trending = 'sort: TRENDING_DESC',
  top = 'sort: POPULARITY_DESC',
  new = 'sort: [START_DATE_DESC, TRENDING_DESC], status_in: [RELEASING, FINISHED]'
}

export async function getAnime(sort: string, page: number = 1) {
  const gqlQuery = `
  query {
    Page(perPage: 24, page: ${page}
      ) {
        media(${sort}, isAdult: false, type: ANIME) {
        id
        title {
          romaji
          english
        }
        startDate {
          year
          month
          day
        }
        coverImage {
          extraLarge
          medium
        }
        description
      }
    }
  }
`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: gqlQuery
    }),
    next: { revalidate: 3600 }
  });

  const data = await res.json().then((res) => res.data.Page.media);
  let filteredResults = data.filter((anime: Anime) => anime.id);
  if (sort === query.new) {
    filteredResults = filteredResults.filter(
      (anime: Anime) => anime.startDate?.year
    );
  }
  return filteredResults;
}

export async function getAnimeFromId(id: number[]) {
  const query = `
  query {
  Page {
    media(id_in: [${id}], isAdult: false, type: ANIME) {
      id
      startDate {
        year
        month
        day
      }
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        medium
      }
      description
    }
  }
}
  `;

  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query
    }),
    next: { revalidate: 3600 }
  });
  if (res.ok) {
    const data = await res.json();
    const anime = data?.data?.Page?.media;
    if (anime && anime.length !== 0) {
      return anime[0];
    }
  }
}
