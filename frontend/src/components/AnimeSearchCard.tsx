import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function AnimeSearchCard({
  anime,
  index,
  imageSize
}: {
  anime: Anime;
  index: number;
  imageSize: string;
}) {
  return (
    <Link href={`/anime/${anime.id}`} passHref legacyBehavior>
      <div
        className={`flex w-full cursor-pointer hover:bg-primary p-2 space-x-5 group z-50 ${
          imageSize as string
        } ${index % 2 == 1 && 'bg-muted'}`}
      >
        <div className="aspect-[3/4] flex items-center overflow-hidden">
          <AspectRatio ratio={3 / 4} className="bg-muted object-cover">
            <Image
              src={anime.coverImage.medium}
              alt={anime.title.english ?? anime.title.romaji}
              fill={true}
              sizes="(max-width: 600px) 150px, 250px"
              className="object-cover"
              priority={true}
            ></Image>
          </AspectRatio>
        </div>
        <div className="flex flex-col grow group-hover:text-primary-foreground truncate">
          <p className="text-sm  font-medium truncate">
            {anime.title.english ?? anime.title.romaji}
          </p>
          <p className="text-xs font-extralight italic truncate">
            {anime.title.english ? anime.title.romaji : ''}
          </p>
          <p className="text-xs font-light italic truncate">
            {anime.title.native}
          </p>
        </div>
      </div>
    </Link>
  );
}
