import { redirect } from "next/navigation";

// Points at the live deployment of github.com/UnqKode/potfolio (confirmed via
// the repo's `homepage` field on GitHub's API before wiring this up).
export default function OldPortfolioRedirect() {
  redirect("https://www.itsdevmanas.xyz/");
}
