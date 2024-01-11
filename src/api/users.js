const PAGE_SIZE = 6;
const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1"
export const fetchUsers = async (pageParam) => {
  const page = pageParam?.page ?? 1;
  const response = await fetch(`${BASE_URL}/users?page=${page}&count=${PAGE_SIZE}`)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}