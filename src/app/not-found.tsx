import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">SIGNAL NOT FOUND / 404</span>
      <h1>Outside the flight path.</h1>
      <p>This page is not part of the mission archive.</p>
      <Link className="outline-link" href="/">
        RETURN TO ORBIT
      </Link>
    </main>
  );
}
