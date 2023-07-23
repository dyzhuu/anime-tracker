'use client'
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { Icons } from '@/lib/icons';

export default function BookmarkButton({className}: any) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="icon"
              className={`fill-white group/button hover:bg-zinc-300/[0.4] active:bg-zinc-500/[0.3] active:scale-95 ${className}`}
              aria-label="Bookmark"
              onClick={(e) => {
                alert('clicked');
                e.stopPropagation();
              }}
            >
              <Icons.bookmarkHollow className="group-hover/button:scale-110"></Icons.bookmarkHollow>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="w-30 p-1">
            <p className="text-xs">Add to Bookmarks</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
}
