import { fetchBooks } from "../api/googleBooksFetcher";

export default async function requestHandler({
  setResponse,
  query,
  setLoading,
}) {
  try {
    setLoading(true);
    const res = await fetchBooks(query);

    if (!res) throw new Error("failed to fetch the Data!");

    return setResponse(res);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}
