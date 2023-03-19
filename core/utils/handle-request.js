export async function handleRequest(request) {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
