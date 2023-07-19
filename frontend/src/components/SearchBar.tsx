import { Input } from "@/components/ui/input";

export function SearchBar({className}: any) {
  return (
      <Input
        type="search"
        placeholder="Search..."
        className={className}
      />
  );
}
