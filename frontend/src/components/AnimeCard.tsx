import Image from 'next/image';
import Link from 'next/link'
import { AspectRatio } from './ui/aspect-ratio';
import BookmarkButton from './BookmarkButton';
import { Button } from './ui/button';



export default function AnimeCard({anime}: any) {
    return (
        <Link href={`/anime/${anime.idMal}`} passHref legacyBehavior>
            <div className='overflow-hidden w-44 cursor-pointer'>
                <div className='group space-y-1 p-2 w-full h-[320px] hover:scale-105 overflow-hidden transition-all'>
                    <AspectRatio ratio={3 / 4} className='bg-primary'>
                        <Image
                            src={anime.coverImage.large}
                            alt={anime.title.english ?? anime.title.romaji}
                            fill={true}
                            sizes='(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw'
                            className='group-hover:brightness-[0.25] group-hover:scale-[1.5] group-hover:translate-y-[48px]'
                        ></Image>

                        <div className='h-[310px] w-full scale-105 opacity-0 p-2 py-6 group-hover:opacity-100 gap-y-2 flex flex-col'>
                            <p className='text-white text-sm font-medium vertical-text-ellipsis'>
                                {anime.title.english ?? anime.title.romaji}
                            </p>
                            <p className='text-white text-xs font-light vertical-desc-ellipsis mt-2'>
                                {anime.description.replace(/<[^>]+>/g, '')}
                            </p>
                            <div className='flex grow'></div>
                            <BookmarkButton></BookmarkButton>
                        </div>
                    </AspectRatio>
                    <div className=''>
                        <p className='text-sm font-medium vertical-text-ellipsis h-16 m-1'>
                            {anime.title.english ?? anime.title.romaji}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}