import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main className="not-found"><p>404 / Not found</p><h1>This page drifted out of orbit.</h1><p>The page you&apos;re looking for doesn&apos;t exist or may have moved.</p><Link className="button" href="/"><ArrowLeft size={18} /> Back home</Link></main>; }
