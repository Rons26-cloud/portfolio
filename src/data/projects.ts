import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "niagantara", name: "NIAGANTARA", category: "Business Management Platform",
    description: "A multi-tenant business platform for dashboards, POS, inventory, finance, reporting, and connected operations.", image: "/assets/projects/niagantara/thumbnail.jpg", displayMode: "desktop",
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Node.js", "GitHub"], githubUrl: "https://github.com/Rons26-cloud/niagantara", liveUrl: "https://niagantara-web.pages.dev/",
    problem: "Multi-branch operations need a single source of truth and consistent workflows across every location.",
    solution: "A modular multi-tenant platform that connects company administration, cashier workflows, inventory, finance, reporting, and background automation through a shared backend.",
    features: ["Multi-company and branch management", "Point of sale and cashier shifts", "Product and inventory operations", "Finance and business reporting", "Role-based access and tenant isolation", "Realtime events and Google Sheets sync"],
    packageContents: [
      { title: "Business Dashboard", description: "Company administration for branches, teams, inventory, operations, finance, and reporting." },
      { title: "POS System", description: "Dedicated cashier application with shared transaction logic, sales processing, and shift management." },
      { title: "Master Control", description: "Platform-level administration for managing tenants, plans, access, and the wider NIAGANTARA system." },
      { title: "Backend Platform", description: "NestJS API, background worker, Supabase PostgreSQL, realtime events, RLS policies, audit logs, and shared packages." },
    ],
    offer: {
      title: "Available for Custom Deployment",
      description: "NIAGANTARA can be adapted for multi-branch businesses that need integrated operations, POS, inventory, and reporting. Contact me to discuss licensing, deployment, and custom modules.",
    },
    coverImage: "/assets/projects/niagantara/dashboard-overview.jpg",
    gallery: [
      { src: "/assets/projects/niagantara/dashboard-overview.jpg", alt: "NIAGANTARA dashboard overview", caption: "Dashboard Overview" },
      { src: "/assets/projects/niagantara/dashboard-operations.jpg", alt: "NIAGANTARA operational dashboard", caption: "Operational View" },
    ],
  },
  {
    slug: "dimsum-lumer", name: "Dimsum Lumer", category: "E-Commerce & Mobile App",
    description: "A complete commerce system with a customer storefront, Android app, operations dashboard, and connected backend.", image: "/assets/projects/dimsum-lumer/thumbnail.png", displayMode: "mobile",
    technologies: ["React", "Flutter", "Supabase", "PostgreSQL"], githubUrl: "https://github.com/Rons26-cloud/dimsum-lumer", liveUrl: "https://dimsum-lumerr.pages.dev/",
    problem: "The brand needed a consistent shopping experience across web and mobile devices.",
    solution: "A production-oriented full-stack commerce platform that connects the customer experience, Android ordering app, staff operations, and Supabase services in one system.",
    features: ["Product catalog and checkout", "Cross-device carts and orders", "Admin operations dashboard", "Realtime data and notifications", "Authentication and account management", "Payment proof and order tracking"],
    packageContents: [
      { title: "Web Storefront", description: "React storefront and installable PWA for browsing products, managing carts, and placing orders." },
      { title: "Android App", description: "Flutter customer app with ordering, account, location, support, and update-management flows." },
      { title: "Admin Dashboard", description: "React operations dashboard for catalog, order, payment, customer, and business management." },
      { title: "Backend System", description: "Supabase database, authentication, storage, realtime events, migrations, access policies, and security checks." },
    ],
    offer: {
      title: "Order a Custom-Branded App",
      description: "Want an application like Dimsum Lumer for your own business? Order a complete custom version with your brand name, logo, colors, product catalog, business workflow, web storefront, Android app, admin dashboard, and backend system.",
      ctaLabel: "Order Your Custom App",
    },
    coverImage: "/assets/projects/dimsum-lumer/screen-01.png",
    gallery: [
      { src: "/assets/projects/dimsum-lumer/screen-01.png", alt: "Dimsum Lumer screen 1", caption: "Home" },
      { src: "/assets/projects/dimsum-lumer/screen-02.png", alt: "Dimsum Lumer screen 2", caption: "Products" },
      { src: "/assets/projects/dimsum-lumer/screen-03.png", alt: "Dimsum Lumer screen 3", caption: "Menu" },
      { src: "/assets/projects/dimsum-lumer/screen-04.png", alt: "Dimsum Lumer screen 4", caption: "Checkout" },
      { src: "/assets/projects/dimsum-lumer/screen-05.png", alt: "Dimsum Lumer screen 5", caption: "Orders" },
      { src: "/assets/projects/dimsum-lumer/screen-06.png", alt: "Dimsum Lumer screen 6", caption: "Account" },
    ],
  },
  {
    slug: "breakbox", name: "BreakBox", category: "Business & Booking Experience",
    description: "A booking website that introduces the BreakBox concept, spaces, and customer experience.",
    image: "", displayMode: "desktop",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"], githubUrl: "", liveUrl: "",
    problem: "Customers needed a simple way to explore available spaces and make a reservation.",
    solution: "A focused website that combines discovery, room details, and booking in one clear flow.",
    features: ["Space information", "Booking flow", "Customer experience"],
    coverImage: "",
    gallery: [],
  },
  {
    slug: "petani-nusantara", name: "Petani Nusantara", category: "Farming Simulation Game",
    description: "An open-world palm-oil farming game built around a time-based crop cycle, a growing community, and a player-run economy.", image: "/assets/projects/petani-nusantara/thumbnail.png",
    displayMode: "desktop",
    technologies: ["Next.js", "TypeScript", "Phaser", "Unity", "C#", "Supabase", "PostgreSQL", "React"], githubUrl: "https://github.com/Rons26-cloud/Petani-Nusantara", liveUrl: "",
    problem: "A farming simulation spread across villages, crops, and online players needs a shared world and consistent state without a single giant map.",
    solution: "A layered world — region, province, village, and zone — where farming, community features, and the economy reinforce each other through one Supabase-backed data layer and a renderer-independent game client.",
    features: ["Time-based palm-oil crop cycle", "Layered village and zone world", "Persistent player characters and progression", "Account auth and RLS-secured saves", "Isometric rendering and in-browser controls", "Bilingual English and Indonesian copy"],
    packageContents: [
      { title: "Web Preview", description: "Next.js landing page and an in-browser Phaser game view with HUD, quest tracker, and player snapshot." },
      { title: "Game Client", description: "Renderer-independent Phaser world split from React, handling input, collision, camera, and interaction from layer data." },
      { title: "Shared Types", description: "Monorepo packages for protocol contracts and typed data shared across web and game client." },
      { title: "Supabase Backend", description: "Versioned migrations for profiles, world, characters, farming, inventory, vehicles, quests, economy, and RLS deny-by-default." },
    ],
    offer: {
      title: "Playable Web Prototype",
      description: "Petani Nusantara is an evolving farming game prototype. Follow the repository to watch the world expand from the Sumatera Utara village toward cooperative, marketplace, and multiplayer phases.",
    },
    coverImage: "/assets/projects/petani-nusantara/thumbnail.png",
    gallery: [
      { src: "/assets/projects/petani-nusantara/thumbnail.png", alt: "Petani Nusantara world view", caption: "World Overview" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
