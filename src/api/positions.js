const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1"
export const fetchPositions = async () => {
  const response = await fetch(`${BASE_URL}/positions`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}