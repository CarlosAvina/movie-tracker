import type { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { env } from "process";

const IMDB_API_KEY = env.IMDB_API_KEY;

type Result = {
  id: string;
  resultType: string;
  image: string;
  title: string;
  description: string;
};

type ActionData = {
  formError?: string;
  results?: Array<Result>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchType = url.searchParams.getAll("type");
  const searchTerm = url.searchParams.getAll("search");

  if (!searchType.length || !searchTerm.length) {
    return { results: [] };
  }

  const searchUrl = `https://imdb-api.com/en/API/${searchType}/${IMDB_API_KEY}/${searchTerm}`;

  const response = await fetch(searchUrl);
  const data = await response.json();

  return { results: data.results };
};

export default function Index() {
  const data = useLoaderData<ActionData>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Movie Tracker</h1>
      <Form method="get">
        <fieldset>
          <label htmlFor="movie">
            <input
              name="type"
              type="radio"
              value="SearchMovie"
              defaultChecked
            />
            Movie
          </label>
          <label htmlFor="series">
            <input name="type" type="radio" value="SearchSeries" />
            Series
          </label>
        </fieldset>
        <input type="text" name="search" required />
        <button type="submit">Search</button>
      </Form>
      <h2>Results: {data?.results?.length}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div>
        {data?.results?.map((result: any) => (
          <Link key={result?.id} to={`/id/${result?.id}`}>
            <h3>{result.title}</h3>
            <b>{result.description}</b>
            <img src={result.image} style={{ height: 100 }} alt="poster" />
          </Link>
        ))}
      </div>
    </div>
  );
}
