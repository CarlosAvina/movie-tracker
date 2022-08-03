import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("/search");
};

export default function Index() {
  return <h1>Movie tracker</h1>;
}
