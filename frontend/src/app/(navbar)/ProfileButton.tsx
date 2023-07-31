import { Button } from '@/components/ui/button';
import { Icons } from '@/lib/icons';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function ProfileButton({className}: {className?: string}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = pathname + '?' + searchParams.toString();
  return (
    <Button
      asChild
      variant="ghost"
      className={className}
    >
      <Link href={`/login?redirectTo=${url}`}>
        <Icons.profile className="h-8"></Icons.profile>
      </Link>
    </Button>
  );
}
