import { Metadata } from 'next';
import { ProfilePage } from './ProfilePage';

export const metadata: Metadata = {
  title: 'AniTrack / Profile'
};

export default function ProfilePageMetadata() {
  return <ProfilePage></ProfilePage>;
}
