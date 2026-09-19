# Vishesh Kumar — Portfolio

A production-quality, interactive personal portfolio for **Vishesh Kumar**, a
Senior Backend Engineer specializing in Golang, distributed systems,
event-driven architecture, AWS, Kafka, Redis and WebSockets.

Built as a **static site** (Next.js static export) that deploys to **AWS S3 +
CloudFront**. Every piece of content is data-driven — nothing factual is
hardcoded into UI components.

- **Stack:** Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS ·
  Framer Motion · Lucide React
- **Design:** dark-first professional aesthetic, subtle motion, interactive
  architecture diagrams, section reveals, animated counters
- **Output:** fully static (`output: export`) — deployable to any static host

---

## Table of contents

1. [Content & source of truth](#content--source-of-truth)
2. [Local development](#local-development)
3. [Production build](#production-build)
4. [Configuration & environment variables](#configuration--environment-variables)
5. [Data model](#data-model)
6. [AWS deployment](#aws-deployment)
   - [S3 setup](#1-s3-setup)
   - [CloudFront setup](#2-cloudfront-setup)
   - [CodePipeline + CodeBuild](#3-codepipeline--codebuild)
   - [IAM permissions](#4-iam-permissions)
7. [GitHub repository setup](#github-repository-setup)
8. [Project structure](#project-structure)

---

## Content & source of truth

All personal, professional, project, skill, education and certification content
comes from the resume and lives in `src/data/`. **No experience, company,
metric, certification or achievement is invented.**

- **Links that were not provided are left empty on purpose** (`githubUrl: ""`,
  `liveUrl: ""`, cert `url: ""`, and social links in `profile.ts`). The UI
  renders empty links as clearly-disabled buttons. Fill them in — never invent.
- **Resume PDF:** drop the file at `public/resume/vishesh_go.pdf`. The
  "Download Resume" buttons link to `/resume/vishesh_go.pdf`. The path is set in
  `src/data/profile.ts` (`profile.resumeUrl`).

---

## Local development

Requirements: **Node.js 20+** and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run lint        # ESLint (next/core-web-vitals)
npm run typecheck   # tsc --noEmit (strict mode)
npm run build       # production static export -> ./out
```

---

## Production build

```bash
npm run build
```

This produces a fully static site in **`./out`** (because `next.config.mjs`
sets `output: "export"`). You can preview it with any static server:

```bash
npx serve out
```

---

## Configuration & environment variables

Copy `.env.example` to `.env.local` for local development, or set these in
CodeBuild/CodePipeline for CI.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL used for SEO metadata, Open Graph tags and `sitemap.xml`. |
| `NEXT_PUBLIC_GITHUB_USERNAME` | optional | Reserved for optional GitHub enhancements. The site works fully without it — **no API access is required**. |

All variables are `NEXT_PUBLIC_*` and exposed to the browser, so **never** put
secrets here.

---

## Data model

Content is typed (`src/types/index.ts`) and edited in `src/data/`:

| File | Contents |
| --- | --- |
| `profile.ts` | Name, role, intro, hero badges, metrics, social links, resume path |
| `experience.ts` | Work history + optional inline architecture diagrams |
| `projects.ts` | Featured projects (**edit `githubUrl` / `liveUrl` here**) |
| `skills.ts` | Filterable skill categories |
| `systemDesign.ts` | System Design Playground scenarios |
| `certifications.ts` | Certifications (**edit `url` here**) |
| `education.ts` | Education timeline |
| `navigation.ts` | Nav links / section ids |

Each `Project` follows:

```ts
{
  name: "...",
  description: "...",
  technologies: [...],
  githubUrl: "",   // fill in — left empty, never invented
  liveUrl: "",     // fill in — left empty, never invented
  architecture: { title, nodes: [...] }
}
```

---

## AWS deployment

Target architecture:

```
GitHub → AWS CodePipeline → AWS CodeBuild → S3 → CloudFront
```

### 1. S3 setup

Create a bucket to hold the static files (this is a **private origin** behind
CloudFront — do not enable public website hosting when using OAC):

```bash
aws s3 mb s3://vishesh-portfolio-site --region ap-south-1
```

Recommended: keep **Block Public Access ON** and serve via CloudFront Origin
Access Control (OAC). The `buildspec.yml` uploads the contents of `./out`.

> If you prefer the simpler S3 static-website-hosting approach instead of OAC,
> enable "Static website hosting" on the bucket with index document
> `index.html` and error document `404.html` (Next export emits `404.html`).

### 2. CloudFront setup

Create a CloudFront distribution:

- **Origin:** the S3 bucket, using **Origin Access Control (OAC)** (recommended)
  so the bucket can stay private.
- **Default root object:** `index.html`
- **Viewer protocol policy:** Redirect HTTP → HTTPS
- **Compress objects automatically:** Yes
- **Default cache behavior:** cache based on the recommended `CachingOptimized`
  managed policy.
- Because the build uses `trailingSlash: true`, routes emit
  `/<route>/index.html`, which CloudFront + S3 resolve cleanly.

Optional custom error responses (nice-to-have for a single-page feel):

- 403 → `/index.html` (200)
- 404 → `/404.html` (404)

After the OAC is created, attach the generated bucket policy to the S3 bucket so
CloudFront can read objects.

### 3. CodePipeline + CodeBuild

**CodeBuild project**

- Environment: managed image, **Amazon Linux 2**, standard runtime, Node 20.
- Buildspec: use the repo's [`buildspec.yml`](./buildspec.yml).
- Environment variables:
  - `S3_BUCKET` = `vishesh-portfolio-site` (required)
  - `CLOUDFRONT_DISTRIBUTION_ID` = your distribution id (optional, enables cache
    invalidation)
  - `NEXT_PUBLIC_SITE_URL` = `https://your-domain`

**CodePipeline**

1. **Source stage:** GitHub (via CodeStar connection) → this repository, branch
   `main`.
2. **Build stage:** the CodeBuild project above. `buildspec.yml` runs
   `npm ci`, typecheck, lint, `npm run build`, then `aws s3 sync ./out` and an
   optional CloudFront invalidation.

The deploy is performed inside CodeBuild's `post_build` phase, so no separate
CodePipeline "Deploy" stage is strictly required. (You can add an S3 Deploy
action instead if you prefer to keep CodeBuild build-only.)

### 4. IAM permissions

**CodeBuild service role** needs to write to S3 and (optionally) invalidate
CloudFront. Minimal policy (scope resources to your bucket / distribution):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Deploy",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::vishesh-portfolio-site",
        "arn:aws:s3:::vishesh-portfolio-site/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidate",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
    },
    {
      "Sid": "Logs",
      "Effect": "Allow",
      "Action": ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": "*"
    }
  ]
}
```

**CodePipeline service role** needs the standard managed permissions for the
CodeStar connection, CodeBuild start, and the S3 artifact bucket.

**S3 bucket policy (with CloudFront OAC)** — grant read to the CloudFront
distribution only:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontRead",
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::vishesh-portfolio-site/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
        }
      }
    }
  ]
}
```

### Manual deploy (without a pipeline)

```bash
npm run build
aws s3 sync ./out s3://vishesh-portfolio-site --delete
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

---

## GitHub repository setup

```bash
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/<username>/vishesh-portfolio.git
git push -u origin main
```

Then connect the repository to CodePipeline using an AWS CodeStar GitHub
connection and point the Source stage at the `main` branch.

---

## Project structure

```
src/
  app/                 # App Router: layout, page, sitemap, robots, global css
  components/
    layout/            # Navbar, Footer, ScrollProgress, BackToTop
    sections/          # Hero, Metrics, About, Experience, Skills, Projects,
                       # SystemDesign, OpenSource, Certifications, Education, Contact
    projects/          # ProjectCard
    architecture/      # ArchitectureDiagram (interactive, clickable nodes)
    ui/                # Reveal, AnimatedCounter, Icon, SectionHeading, SocialLinks
    providers/         # ThemeProvider (dark/light)
  data/                # profile, experience, projects, skills, systemDesign,
                       # certifications, education, navigation  (source of truth)
  lib/                 # site config, utils, useActiveSection hook
  types/               # shared TypeScript types

public/
  resume/              # place vishesh_go.pdf here
  certificates/        # optional certificate files
  favicon.svg
  og-image.svg

buildspec.yml          # AWS CodeBuild -> S3 -> CloudFront
next.config.mjs        # output: export (static)
```

---

## Accessibility & performance notes

- Semantic landmarks, skip-to-content link, keyboard-focusable controls, visible
  focus rings, `aria-*` on interactive elements.
- `prefers-reduced-motion` is respected — animations degrade to static.
- Static generation, `next/font` (self-hosted, no layout shift), inline SVG
  assets, and minimal client JS keep the site fast.
```
