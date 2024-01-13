const PAGE_SIZE = 6;
const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1"

const getToken = async () => {
  const response = await fetch(`${BASE_URL}/token`)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
export const fetchUsers = async (pageParam) => {
  const page = pageParam?.page ?? 1;
  const response = await fetch(`${BASE_URL}/users?page=${page}&count=${PAGE_SIZE}`)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const createUser = async ({name, email, phone, position, picture}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("position_id", Number(position));
  formData.append("photo", picture);

  const response = await getToken();

  return fetch(`${BASE_URL}/users`, {
    body: formData,
    method: "POST",
    headers: {
      "Token": response.token,
    }
  }).then(response => response.json())
}