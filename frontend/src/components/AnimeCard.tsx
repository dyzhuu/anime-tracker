import Image from 'next/image';
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio';
import BookmarkButton from '@/components/BookmarkButton';
import { Button } from '@/components/ui/button';



export default function AnimeCard({anime}: any) {
    return (
        <Link href={`/anime/${anime.idMal}`} passHref legacyBehavior>
            <div className="overflow-hidden cursor-pointer">
                <div className="group space-y-1 p-2 w-full h-full hover:scale-105 overflow-hidden transition-all">
                    <AspectRatio ratio={3 / 4} className="bg-primary-background">
                        <Image
                            src={anime.coverImage.extraLarge}
                            alt={anime.title.english ?? anime.title.romaji}
                            fill={true}
                            className="group-hover:brightness-[0.25] group-hover:scale-[1.5] group-hover:translate-y-[48px]"
                            priority={true}

                        ></Image>
                        <div className="h-[calc(100%+64px)] w-full scale-105 opacity-0 p-4 py-6 pb-4 group-hover:opacity-100 gap-y-2 flex flex-col">
                            <p className="text-white text-sm font-medium vertical-text-ellipsis select-none">
                                {anime.title.english ?? anime.title.romaji}
                            </p>
                            <p className="text-white text-xs font-light vertical-desc-ellipsis mt-2 select-none">
                                {anime.description.replace(/<[^>]+>/g, '')}
                            </p>
                            <div className="flex grow"></div>
                            <BookmarkButton></BookmarkButton>
                        </div>
                    </AspectRatio>
                    <div className="">
                        <p className="text-sm font-medium vertical-text-ellipsis h-16 m-1">
                            {anime.title.english ?? anime.title.romaji}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}