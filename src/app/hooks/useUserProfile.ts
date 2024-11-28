import { QueryKeyProfile } from '@/lib/enum';
import { getUserProfile } from '@/services/users';
import { useQuery } from '@tanstack/react-query';

export default function useUserProfile() {
  return useQuery({
    queryKey: [`detail-${QueryKeyProfile.Profile}`],
    queryFn: getUserProfile,
    staleTime: Infinity,
  });
}
