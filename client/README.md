# Yashraj Infrastructure — Website

Website for **Yashraj Infrastructure**, a Yashraj Group company. Built with Next.js, Firebase, and Tailwind CSS.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI:** React 19, [Tailwind CSS 4](https://tailwindcss.com), [Iconify](https://iconify.design)
- **Backend / Auth:** [Firebase](https://firebase.google.com) (Firestore, Auth, Storage)
- **Images:** [Cloudinary](https://cloudinary.com) (project and gallery uploads)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` in the project root. For **Cloudinary** (admin project image uploads):

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `CLOUDINARY_UPLOAD_FOLDER` | No | Default upload folder (default: `projects`) |

Firebase is configured in `lib/firebaseClient.ts`. For production, consider moving its config into environment variables.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses Turbopack in development.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
client/
├── app/                    # Next.js App Router
│   ├── about-us/           # About us
│   ├── admin/              # Admin (login, dashboard, projects CRUD)
│   ├── aggregates/         # Aggregates (RMC, bitumen, etc.)
│   ├── api/                # API routes (e.g. Cloudinary signature)
│   ├── blogs/              # Blog listing & [slug] detail
│   ├── contact/            # Contact
│   ├── projects/           # Public projects list & [projectId] detail
│   ├── services/           # Services
│   └── page.tsx            # Home
├── components/             # React components
│   ├── about-us/
│   ├── admin/
│   ├── aggregates/
│   ├── blogs/
│   ├── common/             # Header, Footer, modals, etc.
│   ├── home/
│   ├── projects/           # ProjectDetailsView, GalleryModal, filters, etc.
│   └── services/
├── contexts/               # React context (e.g. EnquiryModal)
├── data/                   # Static data (blogs, FAQs, services, etc.)
├── lib/                    # Firebase, Cloudinary, projectsRepository, utils
├── types/                  # TypeScript types (e.g. project)
└── public/                 # Static assets
```

## Main Features

- **Public:** Home, About us, Services, Projects (list + project detail with gallery), Aggregates, Blogs, Contact
- **Admin:** Login, dashboard, projects create/edit/delete with Firestore and Cloudinary uploads
- **Enquiry modal** (shared) and **project gallery modal** on the project detail page

## Deploy

The app can be deployed to [Vercel](https://vercel.com) or any Node-compatible host. Set the Cloudinary (and, if used, Firebase) environment variables in your deployment environment.

- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## Learn More

- [Next.js documentation](https://nextjs.org/docs)
- [Firebase documentation](https://firebase.google.com/docs)
- [Cloudinary documentation](https://cloudinary.com/documentation)
- [Tailwind CSS](https://tailwindcss.com/docs)
