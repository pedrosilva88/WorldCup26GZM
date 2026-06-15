import { Suspense } from "react";
import PalpitesClient from "./PalpitesClient";

export default function PalpitesPage() {
  return (
    <Suspense>
      <PalpitesClient />
    </Suspense>
  );
}
