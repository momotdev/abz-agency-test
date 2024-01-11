const PAGE_SIZE = 6;
export const fetchUsers = async (pageParam) => {
  const page = pageParam?.page ?? 1;
  const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${PAGE_SIZE}`)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}