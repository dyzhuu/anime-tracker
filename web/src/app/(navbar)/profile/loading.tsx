import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/lib/icons";

export default function ProfileLoadingPage() {
  return (
    <div className="flex justify-center py-10 md:px-10">
      <Card className="w-full py-5 -md:border-hidden -md:shadow-none -md:w-[100dvw] max-w-4xl -md:bg-background">
        <CardContent className="p-2 h-full animate-pulse">
          <div className="flex justify-center h-full">
            <Icons.spinner className="animate-spin w-[50px] h-[50px]"></Icons.spinner>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}