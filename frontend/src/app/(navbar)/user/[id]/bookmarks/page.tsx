import { UserBookmarksPage } from "./UserBookmarksPage";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const res = await fetch(
    `https://dzmsabackend.azurewebsites.net/api/user/${params.id}`
    // `http://localhost:5148/api/user/${params.id}`,
  )
  const user = await res.json()
  return {
    title: `${user?.name}'s bookmarks`
  };
}

export default function UserBookmarksPageMetadata({ params }: { params: { id: string } }) {
  return <UserBookmarksPage params={params}></UserBookmarksPage>;
}
