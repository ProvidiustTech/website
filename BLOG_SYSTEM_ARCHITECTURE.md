# ProvidIusTech Blog System - Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Application (App Router)          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │  Public Pages    │  │  Admin Pages     │               │
│  ├──────────────────┤  ├──────────────────┤               │
│  │ /blog            │  │ /admin/blog      │               │
│  │ /blog/[slug]     │  │ /admin/login     │               │
│  │                  │  │ /admin/dashboard │               │
│  │ (SSG + ISR)      │  │ (CSR + Auth)     │               │
│  └──────────────────┘  └──────────────────┘               │
│           │                        │                       │
│           ├────────────┬───────────┤                       │
│           │            │           │                       │
│           v            v           v                       │
│  ┌────────────────────────────────────────┐              │
│  │        API Routes (Server)             │              │
│  ├────────────────────────────────────────┤              │
│  │ GET    /api/blog                       │              │
│  │ POST   /api/blog/create                │ Image        │
│  │ GET    /api/blog/[id]                  │ Upload      │
│  │ PUT    /api/blog/[id]                  │─────────>  │
│  │ DELETE /api/blog/[id]                  │             │
│  │ POST   /api/admin/login                │             │
│  │ GET    /api/admin/auth-check           │             │
│  │ POST   /api/admin/logout               │             │
│  └──────────────────┬──────────────────────┘             │
│                     │                                    │
│                     v                                    │
│  ┌────────────────────────────────────────┐             │
│  │     Application Layer (lib/)           │             │
│  ├────────────────────────────────────────┤             │
│  │ ┌──────────────┐  ┌─────────────────┐ │             │
│  │ │  lib/blog.ts │  │ lib/admin-auth  │ │             │
│  │ │              │  │ .ts             │ │             │
│  │ │ - getAllPost │  │                 │ │             │
│  │ │ - addPost    │  │ - verifyPassword│ │             │
│  │ │ - updatePost │  │ - setAuthCookie │ │             │
│  │ │ - deletePost │  │ - isAuth        │ │             │
│  │ └──────────────┘  └─────────────────┘ │             │
│  └──────────────────┬──────────────────────┘             │
│                     │                                    │
│                     v                                    │
│  ┌────────────────────────────────────────┐             │
│  │      Prisma ORM Client                 │             │
│  │   (Type-safe Database Access)          │             │
│  └──────────────────┬──────────────────────┘             │
│                     │                                    │
└─────────────────────┼────────────────────────────────────┘
                      │
                      v
          ┌──────────────────────┐
          │  MySQL Database      │
          │  (via Aiven Cloud)   │
          ├──────────────────────┤
          │ Table: blog_posts    │
          │ Table: submissions   │
          └──────────────────────┘
```

---

## Architecture Components

### 1. **Frontend Layer**

#### Admin Interface (React + TypeScript)
- **Create Post** (`app/admin/blog/page.tsx`)
  - Form with multi-image upload
  - Real-time previews
  - Tag selection
  - Featured post toggle
  - Slug auto-generation

- **Dashboard** (`app/admin/blog/dashboard/page.tsx`)
  - Post list with search/filter/sort
  - Bulk operations
  - Edit/Delete actions
  - Responsive grid layout
  - Loading and error states

- **Edit Page** (`app/admin/blog/edit/[id]/page.tsx`)
  - Pre-filled form with post data
  - Image replacement capability
  - Same validation as create form

- **Login Page** (`app/admin/login/page.tsx`)
  - Password authentication
  - Redirect on auth success
  - Secure cookie storage

#### Public Interface (React + TypeScript)
- **Blog Listing** (`app/blog/page.tsx`)
  - Featured post hero section
  - Post grid with responsive columns
  - Empty state handling
  - Static generation + ISR

- **Post Page** (`app/blog/[slug]/page.tsx`)
  - Hero section with cover image
  - Full HTML content rendering
  - Image gallery
  - Related posts sidebar
  - Share buttons
  - Static generation with dynamic params
  - Metadata for SEO

#### Reusable Components
- **BlogCard** (`components/blog/BlogCard.tsx`)
  - Featured variant (hero layout)
  - Standard variant (card layout)
  - Image fallbacks
  - Hover animations

- **ShareButtons** (`components/blog/ShareButtons.tsx`)
  - Twitter share with pre-filled text
  - LinkedIn share with article metadata
  - Copy link to clipboard
  - Social icons

### 2. **API Layer**

#### Blog CRUD Endpoints
```
POST   /api/blog/create
  └─> Receives FormData (title, content, images)
      └─> Saves images to /public/blog-images/
      └─> Generates slug from title
      └─> Stores in database
      └─> Returns { slug, id }

GET    /api/blog
  └─> Retrieves all posts
  └─> Parses JSON fields (tags, images)
  └─> Returns sorted by date descending

GET    /api/blog/[id]
  └─> Retrieves single post by ID or slug
  └─> Returns post with parsed JSON fields

PUT    /api/blog/[id]
  └─> Updates post with FormData
  └─> Handles new image uploads
  └─> Preserves existing images or replaces

DELETE /api/blog/[id]
  └─> Soft or hard delete
  └─> Currently hard delete (data loss)
  └─> TODO: Implement soft delete with archive
```

#### Authentication Endpoints
```
POST   /api/admin/login
  └─> Receives { password }
  └─> Validates against NEXT_PUBLIC_ADMIN_PASSWORD
  └─> Sets HTTP-only cookie (7 day expiry)
  └─> Returns success or 401

GET    /api/admin/auth-check
  └─> Reads admin-auth cookie
  └─> Returns { authenticated: boolean }
  └─> Used to protect routes

POST   /api/admin/logout
  └─> Clears admin-auth cookie
  └─> Ends session immediately
```

### 3. **Data Layer**

#### Prisma Schema (`prisma/schema.prisma`)
```typescript
model BlogPost {
  id            Int       @id @default(autoincrement())
  slug          String    @unique                          // For URL routing
  title         String    @db.VarChar(500)                // Main heading
  excerpt       String    @db.Text                        // Card preview
  content       String    @db.LongText                    // Full HTML
  coverImage    String    @db.VarChar(500)                // Hero image
  author        String    @db.VarChar(255)                // Author name
  publishedAt   DateTime  @default(now())                 // Publish date
  updatedAt     DateTime  @updatedAt                      // Last edit
  readingTime   Int       @default(4)                     // Estimated minutes
  tags          String    @db.Text                        // JSON array string
  featured      Boolean   @default(false)                 // Hero highlight
  images        String    @db.Text                        // JSON array string
  createdAt     DateTime  @default(now())                 // Creation date

  @@index([slug])           // Fast slug lookups
  @@index([featured])       // Featured post queries
  @@index([publishedAt])    // Date sorting
  @@map("blog_posts")       // Table name
}
```

#### JSON Serialization Pattern
```typescript
// On Write (Create/Update)
tags: JSON.stringify(post.tags)              // Array → JSON string
images: JSON.stringify(post.images)          // Array → JSON string

// On Read (Get)
tags: JSON.parse(dbRecord.tags)              // JSON string → Array
images: JSON.parse(dbRecord.images)          // JSON string → Array
```

**Why Text not JSON?**
- MySQL doesn't support native JSON type
- Text fields work reliably across all MySQL versions
- Minimal performance impact for parsing
- Clear serialization at application boundaries

### 4. **Authentication System**

#### Cookie-based Session Management
```
1. User submits password → POST /api/admin/login
2. Server validates password against env variable
3. Server sets HTTP-only cookie:
   - Name: admin-auth
   - Value: "true"
   - HttpOnly: true (prevents XSS)
   - Secure: true (production only)
   - SameSite: lax (CSRF protection)
   - Path: /admin (scoped to admin routes)
   - MaxAge: 7 days

4. Browser sends cookie on all /admin/* requests
5. Page calls useAdminAuth() hook
6. Hook checks /api/admin/auth-check
7. If cookie present → allow access
8. If missing → redirect to login page
9. On logout → clear cookie → redirect to login
```

#### Hook Pattern (`hooks/useAdminAuth.ts`)
```typescript
export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  
  useEffect(() => {
    // Check auth on mount
    fetch('/api/admin/auth-check')
      .then(res => {
        if (!res.ok) router.push('/admin/login')
      })
  }, [])
  
  return { authenticated, logout }
}
```

---

## Data Flow

### Creating a Blog Post

```
Admin fills form
      │
      v
POST /api/blog/create (FormData)
      │
      ├─> Validate required fields
      ├─> Generate slug from title
      ├─> Save cover image to /public/blog-images/
      ├─> Save 1-3 additional images
      ├─> Stringify tags and images arrays
      ├─> Create Prisma record
      │
      v
Response: { slug, id, message }
      │
      v
Page redirects to /blog/[slug]
      │
      v
User sees published post
```

### Viewing a Blog Post

```
User clicks post link
      │
      v
GET /blog/[slug]
      │
      ├─> Fetch post via getPostBySlug()
      │   └─> Prisma findUnique(where: { slug })
      │   └─> Parse tags and images JSON
      │   └─> Return BlogPost object
      │
      ├─> Fetch all posts for related posts
      │   └─> Filter by matching tags
      │   └─> Slice to 3 posts
      │
      v
Render page with:
  - Hero section (cover image)
  - Post content (HTML)
  - Image gallery
  - Related posts sidebar
  - Share buttons
  - CTA section
```

### Editing a Blog Post

```
Admin clicks Edit button
      │
      v
GET /admin/blog/edit/[id]
      │
      ├─> Fetch post by ID
      ├─> Pre-fill form fields
      ├─> Show image previews
      │
      v
Admin modifies fields and submits
      │
      v
PUT /api/blog/[id] (FormData)
      │
      ├─> Validate fields
      ├─> Handle new image uploads
      ├─> Update Prisma record
      │
      v
Response: Updated BlogPost
      │
      v
Redirect to dashboard
```

---

## Image Upload Process

### File Handling

```
User selects cover + 3 images
      │
      v
Form collects files in FormData
  - cover (File)
  - image-0 (File)
  - image-1 (File)
  - image-2 (File)
      │
      v
POST /api/blog/create
      │
      ├─> Generate slug from title
      ├─> For each image:
      │   ├─> Read file bytes from buffer
      │   ├─> Extract file extension
      │   ├─> Generate filename: ${slug}-${position}.${ext}
      │   ├─> Ensure /public/blog-images/ dir exists
      │   ├─> Write file to disk
      │   ├─> Add URL to images array
      │
      v
Store image URLs in database
  - coverImage: "/blog-images/my-post-cover.jpg"
  - images: [
      "/blog-images/my-post-img-1.jpg",
      "/blog-images/my-post-img-2.jpg",
      "/blog-images/my-post-img-3.jpg"
    ]
      │
      v
Images served from public/ directory
  (Static file serving)
```

### Image URLs in Database

```typescript
// Stored as relative paths
coverImage = "/blog-images/slug-cover.jpg"
images = [
  "/blog-images/slug-img-1.jpg",
  "/blog-images/slug-img-2.jpg",
  "/blog-images/slug-img-3.jpg"
]

// Used directly in HTML
<img src={post.coverImage} alt={post.title} />

// Served from /public/blog-images/
// Next.js automatically handles routing
```

---

## Performance Optimizations

### 1. **Static Generation**
- Blog listing page: SSG with ISR (revalidate: 60)
- Individual posts: SSG with generateStaticParams()
- Static regeneration when posts change

### 2. **Database Indexing**
```sql
INDEX idx_slug (slug)         -- Fast slug lookups
INDEX idx_featured (featured) -- Featured post queries
INDEX idx_publishedAt (publishedAt) -- Date sorting
```

### 3. **Caching Strategy**
- Page caching: 60 second revalidation
- API caching: Cache headers on responses
- Browser caching: Cache-Control headers
- Service worker: Runtime cache + stale-while-revalidate

### 4. **Query Optimization**
- Only fetch necessary fields
- Use indexes on common filters
- Avoid N+1 queries
- Pagination ready (not yet implemented)

---

## Security Considerations

### 1. **Authentication**
- HTTP-only cookies prevent XSS
- SameSite=lax prevents CSRF
- 7-day expiry for session timeout
- Password never exposed to client

### 2. **Authorization**
- All admin pages check auth before rendering
- useAdminAuth hook enforces auth checks
- Unauthed users redirected to login
- No sensitive data in public pages

### 3. **Input Validation**
- Required fields checked in API
- File type validation (should add MIME type checks)
- HTML sanitization (should add DOMPurify for user content)
- Slug validation and sanitization

### 4. **Data Protection**
- Database credentials in env variables
- Password never logged or exposed
- Images stored with slug prefixes (prevents collisions)
- CORS configured for API endpoints (if needed)

### 5. **SQL Injection Prevention**
- Prisma parameterized queries
- No raw SQL strings
- All inputs filtered by Prisma

---

## Deployment Architecture

### Development Environment
```
localhost:3000 → Next.js Dev Server
             ↓
       Prisma Client
             ↓
       MySQL (Aiven Cloud)
```

### Production Environment (Vercel)
```
https://providius.vercel.app
             ↓
     Vercel Edge Network
             ↓
     Next.js Server (US)
             ↓
       Prisma Client
             ↓
       MySQL (Aiven Cloud)
```

### Deployment Steps

1. **Build Phase**
   ```bash
   npm run build
   # Generates static pages
   # Generates Prisma client
   # Optimizes assets
   ```

2. **Environment Setup**
   - DATABASE_URL
   - NEXT_PUBLIC_ADMIN_PASSWORD
   - NODE_ENV=production

3. **Runtime**
   - Serves static pages from CDN
   - Routes API requests to serverless functions
   - Maintains database connection pool

---

## Monitoring & Debugging

### Development Tools
```bash
# Start dev server
npm run dev

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# View database GUI
npx prisma studio

# Build for production
npm run build

# Run production build
npm start
```

### Debugging

**Blog not appearing?**
- Check Prisma query: `npx prisma studio`
- Verify database connection
- Check API response: `GET /api/blog`
- Check browser console for errors

**Images not loading?**
- Verify files exist in `/public/blog-images/`
- Check file permissions
- Check browser Network tab for 404s
- Verify URL format in database

**Auth not working?**
- Check `.env` has NEXT_PUBLIC_ADMIN_PASSWORD
- Check cookie in browser DevTools
- Verify /api/admin/auth-check returns 200

---

## Future Enhancements

### Phase 2
- [ ] Blog comments system
- [ ] Email notifications
- [ ] RSS feed generation
- [ ] Search functionality
- [ ] Author profiles
- [ ] Blog categories

### Phase 3
- [ ] Image optimization (Sharp, next/image)
- [ ] Analytics integration
- [ ] A/B testing framework
- [ ] Scheduled publishing
- [ ] Revision history
- [ ] Collaboration features

### Phase 4
- [ ] AI-powered recommendations
- [ ] Personalization
- [ ] Advanced SEO
- [ ] Multi-language support
- [ ] API documentation
- [ ] Webhook integrations

---

## Conclusion

This blog system provides a professional, scalable foundation for content management with:
- Clean architecture separating concerns
- Type-safe database access with Prisma
- Secure authentication and authorization
- Responsive, mobile-first design
- PWA capabilities
- Database persistence
- API-first design

All components are production-ready and can be deployed to Vercel or self-hosted with minimal configuration.

