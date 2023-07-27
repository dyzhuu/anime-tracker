'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Icons } from "@/lib/icons";
import Image from "next/image";

export function BookmarkTable({ className }: { className?: string }) {
  return (
    <div className={'-md:hidden '+className}>
      <div className="py-2 bg-muted rounded-t-lg">
        <div className="h-5 items-center text-sm grid grid-cols-12 place-content-start font-semibold text-center">
          <span className="pl-2 border-r-[1px]">#</span>
          <span className="border-r-[1px]">Image</span>
          <span className="border-r-[1px] col-span-8">Title</span>
          <span className="border-r-[1px]">Rating</span>
          <span>Status</span>
        </div>
      </div>
      <div>
        <div className="w-full grid grid-cols-12 border border-t-0 group last:rounded-b-lg">
          <div className="w-full flex justify-center items-center border-l-8 group-last:rounded-b-md">
            1
          </div>
          <div className="p-1 flex items-center">
            <AspectRatio ratio={3 / 4}>
              <Image
                alt=""
                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-5fa4ZBbW4dqA.jpg"
                fill={true}
                objectFit="cover"
              ></Image>
            </AspectRatio>
          </div>
          <div className="w-full col-span-7 flex justify-center items-center pl-2 text-sm font-medium">
            aq23r uicfwaehfjsahjkfgsadfg saf hdsj sahfgjsad,fkj asfsadhfsf asdfhjkhj has afs,fsadfasfauf gasfsdafbkaf hksdfjkhahjkf hkjhjks dfsf hjkl hjlksf hjls hjkl fhjlkaf
          </div>
          <div className="w-full flex justify-center items-center">
            <Icons.edit className="w-5"></Icons.edit>
          </div>
          <div className="w-full flex justify-center items-center">10</div>
          <div className="w-full flex justify-center items-center text-center text-sm">
            plan to watch
          </div>
        </div>
      </div>
    </div>
  );
}
