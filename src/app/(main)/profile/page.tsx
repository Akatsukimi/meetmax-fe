import ProfileLayout from '@/components/profile/ProfileLayout';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Meetmax',
  description: 'Profile page of Meetmax',
};

const ProfilePage = () => {
  return <ProfileLayout />;
};

export default ProfilePage;
