'use client'
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

export default function BookmarkButton({className}: any) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant='icon'
                        className={`fill-white group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 ${className}`}
                        aria-label='Bookmark'
                        onClick={(e) => {
                            alert('clicked');
                            e.stopPropagation();
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='1.5em'
                            viewBox='0 0 384 512'
                            className='group-hover/button:scale-110'
                        >
                            <path d='M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z' />
                        </svg>
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="w-30 p-1">
                    <p className="text-xs">Add to Bookmarks</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}