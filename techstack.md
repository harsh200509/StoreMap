For this product, I would **not start with microservices**. Build it as a **modular monolith + separate map/navigation engine**, then split services only when you actually need scale.

## 1. Recommended Tech Stack

| Layer            | Technology                        | Why                                     |
| ---------------- | --------------------------------- | --------------------------------------- |
| Customer Web/PWA | **Next.js + TypeScript**          | SEO, routing, PWA, good React ecosystem |
| Admin Dashboard  | **Next.js + TypeScript**          | Same ecosystem, easy reuse              |
| Mobile later     | **React Native + Expo**           | Android/iOS                             |
| UI               | **Tailwind CSS + shadcn/ui**      | Fast development                        |
| Store Map        | **SVG + React**                   | Best for interactive 2D indoor maps     |
| Map Editor       | **React + SVG**                   | Drag/drop aisles, racks, sections       |
| Backend          | **Node.js + TypeScript + NestJS** | Modular architecture and validation     |
| API              | **REST + WebSocket where needed** | REST is enough for MVP                  |
| Database         | **PostgreSQL + PostGIS**          | Relational data + spatial queries       |
| ORM              | **Prisma**                        | Fits your existing stack                |
| Cache            | **Redis**                         | Caching/search/session/routing          |
| Search           | **PostgreSQL FTS initially**      | No need for Elasticsearch initially     |
| Advanced Search  | **OpenSearch** later              | Large product catalogs                  |
| Route Engine     | **Custom A* initially**           | Indoor graph is manageable              |
| Queue            | **BullMQ + Redis**                | Imports, map processing, inventory sync |
| Object Storage   | **S3-compatible storage**         | Store map files/product images          |
| Auth             | **JWT + refresh tokens**          | Simple multi-role authentication        |
| Validation       | **Zod**                           | Shared TypeScript validation            |
| Testing          | **Vitest + Playwright**           | Unit + E2E                              |
| Deployment       | **Docker + GitHub Actions**       | Reproducible deployment                 |
| Database hosting | **Supabase / managed PostgreSQL** | Easy initial deployment                 |
| Backend hosting  | **Render / Fly.io / AWS later**   | Start simple                            |
| Monitoring       | **Sentry + OpenTelemetry later**  | Error/performance monitoring            |

---

# 2. High-Level Architecture

```text
                         ┌──────────────────────┐
                         │      Customer        │
                         │  Web / PWA / Mobile  │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌──────────────────────┐
                         │      API Gateway     │
                         │      / Backend       │
                         └──────────┬───────────┘
                                    │
             ┌──────────────────────┼─────────────────────┐
             │                      │                     │
             ▼                      ▼                     ▼
      ┌─────────────┐       ┌──────────────┐      ┌──────────────┐
      │   Search    │       │ Navigation   │      │  Inventory   │
      │   Module    │       │    Module    │      │    Module    │
      └──────┬──────┘       └───────┬──────┘      └──────┬───────┘
             │                      │                     │
             └──────────────────────┼─────────────────────┘
                                    ▼
                         ┌──────────────────────┐
                         │     PostgreSQL       │
                         │      + PostGIS       │
                         └──────────┬───────────┘
                                    │
                          ┌─────────┴─────────┐
                          ▼                   ▼
                    ┌──────────┐       ┌────────────┐
                    │  Redis   │       │  S3/Object │
                    │  Cache   │       │  Storage   │
                    └──────────┘       └────────────┘
```

Admin:

```text
                  ┌────────────────────┐
                  │    Admin Dashboard │
                  └─────────┬──────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Backend API   │
                    └───────┬───────┘
                            │
           ┌────────────────┼────────────────┐
           ▼                ▼                ▼
       Map Editor       Products        Inventory
           │                │                │
           └────────────────┼────────────────┘
                            ▼
                       PostgreSQL
```

---

# 3. Monorepo Architecture

Since you already work with TypeScript, I'd use **Turborepo + pnpm**.

```text
smart-map/
│
├── apps/
│   │
│   ├── customer-web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   └── lib/
│   │
│   ├── admin-web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   └── lib/
│   │
│   └── api/
│       ├── src/
│       │   ├── modules/
│       │   ├── common/
│       │   ├── config/
│       │   └── main.ts
│       │
│       └── prisma/
│
├── packages/
│   │
│   ├── ui/
│   ├── types/
│   ├── validation/
│   ├── map-engine/
│   ├── routing-engine/
│   └── config/
│
├── infrastructure/
│   ├── docker/
│   └── terraform/
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

# 4. Backend Architecture

Use a **modular monolith**.

```text
apps/api/src/

├── modules/
│
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.repository.ts
│   │   └── auth.module.ts
│   │
│   ├── stores/
│   │   ├── store.controller.ts
│   │   ├── store.service.ts
│   │   ├── store.repository.ts
│   │   └── store.module.ts
│   │
│   ├── floors/
│   │
│   ├── maps/
│   │
│   ├── sections/
│   │
│   ├── aisles/
│   │
│   ├── racks/
│   │
│   ├── products/
│   │
│   ├── inventory/
│   │
│   ├── search/
│   │
│   ├── shopping-lists/
│   │
│   ├── navigation/
│   │
│   ├── analytics/
│   │
│   └── admin/
│
├── common/
│   ├── guards/
│   ├── decorators/
│   ├── errors/
│   └── middleware/
│
└── main.ts
```

Each module owns its business logic.

For example:

```text
products/
│
├── product.controller.ts
├── product.service.ts
├── product.repository.ts
├── product.dto.ts
└── product.module.ts
```

Don't make:

```text
controllers/
services/
repositories/
```

as giant global folders. That becomes messy as the project grows.

---

# 5. Most Important Part: Map Architecture

This is where I would make a specific design decision.

**Don't store the entire map as a single image.**

Instead, store it as structured data.

For example:

```text
Floor
 │
 ├── Walls
 ├── Sections
 │     │
 │     ├── Grocery
 │     ├── Dairy
 │     └── Personal Care
 │
 ├── Aisles
 │     │
 │     ├── A01
 │     ├── A02
 │     └── A03
 │
 ├── Racks
 │
 └── Navigation Graph
```

The frontend renders this structured data into SVG.

---

# 6. Map Data Model

Example:

```json
{
  "floorId": "floor_1",
  "width": 1200,
  "height": 800,
  "elements": [
    {
      "id": "aisle_01",
      "type": "aisle",
      "x": 100,
      "y": 150,
      "width": 80,
      "height": 300
    }
  ]
}
```

Frontend:

```text
Map JSON
    ↓
React Map Renderer
    ↓
SVG
    ↓
Interactive map
```

This gives you:

* zoom
* pan
* click
* highlight
* route rendering
* product markers

without needing a complex GIS frontend.

---

# 7. Navigation Architecture

The navigation system should have **two separate concepts**.

### Physical map

```text
Aisles
Walls
Racks
Sections
Doors
Checkout
```

### Navigation graph

```text
Node ───── Node ───── Node
  │                   │
  │                   │
Node ───── Node ───── Node
```

Example:

```text
Entrance
   |
   A
  / \
 B   C
 |   |
 D   E
  \ /
 Checkout
```

Each node:

```text
{
  id,
  x,
  y,
  floorId,
  type
}
```

Each edge:

```text
{
  from,
  to,
  distance,
  accessible
}
```

Then A* calculates:

```text
START
  ↓
Node 17
  ↓
Node 21
  ↓
Node 32
  ↓
Product
```

---

# 8. Multiple Product Routing

This should be its own service/module.

Input:

```text
START
+
Product locations:
A
B
C
D
E
+
Checkout
```

Pipeline:

```text
Shopping List
      ↓
Resolve Product Locations
      ↓
Convert Locations → Graph Nodes
      ↓
Calculate Distances
      ↓
Optimize Stop Order
      ↓
A* route between stops
      ↓
Merge paths
      ↓
Return Route
```

Response:

```json
{
  "distance": 285,
  "estimatedMinutes": 5,
  "stops": [
    {
      "order": 1,
      "productId": "p1",
      "aisle": "A03"
    },
    {
      "order": 2,
      "productId": "p2",
      "aisle": "A07"
    }
  ],
  "path": [
    [100, 300],
    [150, 300],
    [150, 450]
  ]
}
```

---

# 9. Database Architecture

I'd use PostgreSQL.

Core relationships:

```text
Organization
     │
     └── Store
           │
           ├── Floor
           │     │
           │     ├── Section
           │     │      │
           │     │      └── Aisle
           │     │             │
           │     │             └── Rack
           │     │
           │     └── Navigation Graph
           │
           └── Products
                    │
                    └── ProductLocation
```

Important tables:

```text
organizations
stores
floors
sections
aisles
racks

products
categories
brands
product_locations

inventory
inventory_events

navigation_nodes
navigation_edges

shopping_lists
shopping_list_items

users
roles

map_versions

search_events
navigation_events
```

---

# 10. Product Location

Don't put location directly inside `products`.

Bad:

```text
products

id
name
aisle_id
```

Because the same product can exist in multiple stores.

Instead:

```text
products

id
name
brand
barcode
```

and:

```text
product_locations

id
product_id
store_id
floor_id
section_id
aisle_id
rack_id
shelf
position
```

Now:

```text
Maggi
 ├── Store A → Aisle 7
 ├── Store B → Aisle 4
 └── Store C → Aisle 8
```

That's the correct architecture.

---

# 11. Inventory

Keep inventory separate from location.

```text
Product
   │
   ├── Location
   │
   └── Inventory
```

Because:

```text
Location = where the product should be

Inventory = whether it's currently available
```

For example:

```text
Maggi

Location:
Aisle 7

Inventory:
23 units
```

---

# 12. Search Architecture

### MVP

```text
User
 ↓
API
 ↓
PostgreSQL
 ↓
Full-text search
 ↓
Products
```

Use indexes.

Don't introduce Elasticsearch just because it's a search application.

When you reach:

```text
Millions of products
+
Thousands of stores
+
Complex ranking
+
Fuzzy search
```

then:

```text
PostgreSQL
      +
OpenSearch
```

becomes worthwhile.

---

# 13. Search Ranking

Eventually search:

> "amul milk"

should understand:

```text
Amul Taaza Milk
Amul Gold Milk
Amul Slim n Trim
```

Ranking:

```text
Exact name
    ↓
Prefix match
    ↓
Brand match
    ↓
Category match
    ↓
Fuzzy match
```

You can later add embeddings, but **don't use an LLM/vector DB for basic product search**.

---

# 14. Admin Map Editor

This is one of the most important frontend applications.

Architecture:

```text
Admin
 ↓
Map Editor
 ↓
Canvas/SVG
 ↓
Map JSON
 ↓
Backend
 ↓
PostgreSQL
```

Tools:

```text
Select
Move
Resize
Add Aisle
Add Rack
Add Section
Add Entrance
Add Checkout
Add Navigation Node
Connect Nodes
```

Example:

```text
             Map Editor

┌─────────────────────────────────────┐
│ Select | Aisle | Rack | Node | Path │
├─────────────────────────────────────┤
│                                     │
│       ┌───────┐   ┌───────┐        │
│       │ A01   │   │ A02   │        │
│       └───────┘   └───────┘        │
│            ●────────●               │
│            │        │               │
│            ●────────●               │
│                                     │
└─────────────────────────────────────┘
```

---

# 15. Map Rendering

I'd use:

**SVG first.**

Not Mapbox.

Not Google Maps.

Not Three.js.

Not WebGL.

Why?

Your environment is controlled:

```text
Store
 ↓
Floor
 ↓
Aisles
 ↓
Racks
 ↓
Products
```

You don't need geographic maps.

SVG gives you:

```text
<rect>
<path>
<circle>
<text>
```

and can easily render:

```text
Aisles
Products
Routes
User position
Sections
```

---

# 16. Future Indoor Positioning

Don't make this a requirement for MVP.

Architecture should allow it later:

```text
PositionProvider
       │
       ├── EntranceProvider
       ├── QRProvider
       ├── BLEProvider
       └── UWBProvider
```

Then navigation doesn't care how the position was obtained.

It only receives:

```text
currentNode
```

This is a good abstraction.

---

# 17. Event Architecture

Initially:

```text
API
 ↓
PostgreSQL
```

For asynchronous work:

```text
API
 ↓
Redis/BullMQ
 ↓
Worker
```

Use queues for:

* CSV product imports
* Inventory synchronization
* Map processing
* Search indexing
* Analytics aggregation
* Image processing
* Notifications

Don't introduce Kafka initially.

---

# 18. Multi-Tenant Architecture

This is important if you're selling it to multiple retailers.

Every store belongs to an organization:

```text
Organization
│
├── Store 1
│
├── Store 2
│
└── Store 3
```

Every business table should be scoped appropriately.

For example:

```text
products
product_locations
inventory
```

should be associated with the relevant organization/store.

This prevents:

```text
DMart data
    X
Reliance data
```

from accidentally mixing.

---

# 19. Roles

Use RBAC.

```text
SUPER_ADMIN
     ↓
ORGANIZATION_ADMIN
     ↓
STORE_MANAGER
     ↓
STORE_EDITOR
     ↓
CUSTOMER
```

Permissions:

```text
STORE_MANAGER
✓ Edit products
✓ Edit map
✓ Edit inventory
✓ View analytics

STORE_EDITOR
✓ Edit locations
✓ Update products

CUSTOMER
✓ Search
✓ Navigate
✓ Shopping list
```

---

# 20. Deployment Architecture

### MVP

Keep it simple:

```text
                Cloudflare
                    │
             ┌──────┴──────┐
             ▼             ▼
        Next.js         NestJS
        Frontend        Backend
                           │
                  ┌────────┼────────┐
                  ▼        ▼        ▼
              PostgreSQL Redis     S3
```

Dockerize everything.

```text
docker-compose.yml

api
postgres
redis
```

Development:

```bash
docker compose up
```

---

# 21. Production Evolution

When you get actual customers:

```text
                    CDN
                     │
               Load Balancer
                     │
           ┌─────────┴─────────┐
           ▼                   ▼
       API Server           API Server
           │                   │
           └─────────┬─────────┘
                     │
              PostgreSQL
                     │
                Read Replica
                     
                Redis Cluster
                     
                  Workers
```

Still **not microservices unless required**.

---

# 22. Recommended Project Stack for You Specifically

Given your existing experience, I would choose:

```text
Frontend
────────────
Next.js
TypeScript
Tailwind
shadcn/ui
React Query
Zustand
SVG

Backend
────────────
NestJS
TypeScript
Prisma
Zod

Database
────────────
PostgreSQL
PostGIS
Redis

Search
────────────
PostgreSQL FTS
→ OpenSearch later

Navigation
────────────
A*
Dijkstra
Graph data structure

Async
────────────
BullMQ
Redis

Storage
────────────
S3

Auth
────────────
JWT
Refresh tokens
RBAC

DevOps
────────────
Docker
GitHub Actions
Cloudflare

Testing
────────────
Vitest
Playwright
```

---

# 23. One Important Change From Your Existing Stack

You already use:

**React + Vite + Node/Express + PostgreSQL + Redis.**

You technically **don't need to change everything**.

For an MVP, I'd actually use:

```text
React + Vite
Node + Express
PostgreSQL
Redis
SVG
Prisma
```

Then only introduce Next.js/NestJS if there's a specific reason.

The product's difficult engineering is **map modeling + location data + routing**, not the framework.

---

# 24. Final Architecture I'd Build

```text
                         CUSTOMER
                            │
                ┌───────────┴───────────┐
                │                       │
             Web/PWA                 Mobile
                │                       │
                └───────────┬───────────┘
                            │
                            ▼
                     API / Backend
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
     SEARCH             NAVIGATION          INVENTORY
        │                   │                   │
        │              ┌────┴────┐              │
        │              │         │              │
        │             Graph     Route            │
        │              │         │              │
        └──────────────┼─────────┼──────────────┘
                       │
                       ▼
                 PostgreSQL
                  + PostGIS
                       │
              ┌────────┴────────┐
              ▼                 ▼
            Redis              S3
              │
              ▼
            Workers
              │
              ▼
       Import / Sync / Analytics


                      ADMIN
                        │
                        ▼
                 Admin Dashboard
                        │
             ┌──────────┼──────────┐
             ▼          ▼          ▼
          Map Editor Products   Inventory
             │          │          │
             └──────────┼──────────┘
                        ▼
                   Backend API
```

### The key architectural decision

Separate these three things:

**1. Product data**

> What is the product?

**2. Physical location**

> Where is it?

**3. Navigation graph**

> How do I walk there?

That separation will make the system much easier to scale from **one DMart-like supermarket → multiple stores → malls → entire retail chains**.

For an MVP, I would build **one store + one floor + ~500 products + SVG map + multi-item search + A* route**. That is enough to prove whether customers actually find it useful before spending time on BLE, UWB, real-time positioning, or AI.
