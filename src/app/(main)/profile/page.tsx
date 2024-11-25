import ProfileContent from "@/components/profile/ProfileContent";
import ProfileHeader from "@/components/profile/ProfileHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Meetmax",
  description: "Profile page of Meetmax",
};

const ProfilePage = () => {
  return (
    <div className="space-y-7.5 flex-1 overflow-y-scroll custom-scrollbar">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
};

export default ProfilePage;
