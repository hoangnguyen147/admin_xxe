import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

// apis
import { getAllSharing } from 'apis/sharing.api';

// model
import { Sharings } from 'models/ISharingPostState';

async function fetchSharings(): Promise<any> {
  try {
    const res = await getAllSharing();
    return res?.data;
  } catch (error: any) {
    return Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'));
  }
}

export function useSharings() {
  return useQuery<Sharings[], AxiosError>('sharings', fetchSharings);
}
