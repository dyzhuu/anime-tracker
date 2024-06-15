interface Anime {
  id: string;
  startDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  title: {
    romaji: string;
    english: string;
    native?: string;
  };
  coverImage: {
    extraLarge?: string;
    medium: string;
  };
  description?: string;
}

interface Bookmark {
  userId: string;
  animeId: string;
  title: string;
  imageURL: string;
  description: string;
  rating: number;
  status: number;
}
