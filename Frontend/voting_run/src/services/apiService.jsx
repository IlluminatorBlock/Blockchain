import axiosInstance from '../axiosInstance';

export const fetchCandidates = async () => {
  const response = await axiosInstance.get('get_candidates/');
  return response.data;
};

export const fetchTotalVotes = async () => {
  const response = await axiosInstance.get('get_total_votes/');
  return response.data;
};

export const fetchVoteCount = async (candidateId) => {
  const response = await axiosInstance.get(`get_vote_count/${candidateId}/`);
  return response.data;
};