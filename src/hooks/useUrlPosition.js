import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // useSearchParams is a React Router hook that returns an array of query string values attached to current URL
  const [searchParams] = useSearchParams();
  // to retrieve values from searchParams use get method to pull specific query string value.
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
