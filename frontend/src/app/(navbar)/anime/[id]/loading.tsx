import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";

export default function AnimeLoadingPage() {
  return (
    <div className="flex justify-center -md:bg-card p-3 md:p-10">
      <Card className="w-full p-5 max-w-6xl -md:border-none -md:min-h-[calc(100dvh-64px)]">
        <CardContent className="p-2 h-full animate-pulse">
          <div className="flex justify-center h-full">
            <Icons.spinner className="animate-spin w-[50px] h-[50px]"></Icons.spinner>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}