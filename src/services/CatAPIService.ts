
export async function requestCatData(endpoint: string) {
  const catAPIToken = import.meta.env.VITE_CAT_API_TOKEN
  const catAPIHeaders = {
    'x-api-key': catAPIToken
  };
  const apiEntryPoint = "https://api.thecatapi.com/v1";

  const controller = new AbortController()

  try{
    const request = await fetch(`${apiEntryPoint}${endpoint}`, {
      signal: controller.signal,
      headers: catAPIHeaders
    });
    return request.json()
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      throw error
    }
  }
  return null;
}
