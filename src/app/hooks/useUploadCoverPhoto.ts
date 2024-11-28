import { QueryKeyProfile } from '@/lib/enum';
import { ErrorServerResponse } from '@/lib/types';
import { uploadCoverPhoto } from '@/services/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useUploadCoverPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file }: { file: File }) => uploadCoverPhoto(file),
    onSuccess: () => {
      toast.success('Cover photo updated successfully');
      queryClient.invalidateQueries({
        queryKey: [`detail-${QueryKeyProfile.Profile}`],
      });
    },
    onError: (error: ErrorServerResponse) => {
      toast.error(
        `Upload cover photo failed: ${error.response.data.message[0]}`,
      );
    },
  });
}
