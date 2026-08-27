import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { T } from "@/components/providers/LanguageProvider";
export default function NotFound() { return <main className="not-found"><p><T>404 / Not found</T></p><h1><T>This page drifted out of orbit.</T></h1><p><T>The page you&apos;re looking for doesn&apos;t exist or may have moved.</T></p><Link className="button" href="/"><ArrowLeft size={18} /> <T>Back home</T></Link></main>; }
