import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { env } from "process";

const IMDB_API_KEY = env.IMDB_API_KEY;

export const loader: LoaderFunction = async ({ params }) => {
  const movieId = params.id;
  const response = await fetch(
    `https://imdb-api.com/en/API/Title/${IMDB_API_KEY}/${movieId}`
  );
  const data = await response.json();
  console.log({ data });
  return data;
};

export default function MovieId() {
  const data = useLoaderData();
  return (
    <div>
      <h1>Movie title</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
