'use client';

import useUserProfile from '@/app/hooks/useUserProfile';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

export default function ProfileLayout() {
  const { data: profile } = useUserProfile();

  return (
    <div className="space-y-7.5 flex-1 overflow-y-scroll custom-scrollbar">
      <ProfileHeader profile={profile} />
      <ProfileContent profile={profile} />
    </div>
  );
}
