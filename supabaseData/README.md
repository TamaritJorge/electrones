# Database Architecture Documentation

The Electrones application uses a Supabase-managed PostgreSQL database with several public tables and row-level security (RLS) policies. The
`auth` schema holds the built-in `users` table for authentication, while most application data lives under `public`.

The following sections summarise the structure and key columns of each table that the front‑end and serverless functions interact with.

## Core Tables

### profiles
Stores extended user information linked to `auth.users` (via the same UUID).
- **id** (uuid, PK) – user identifier, matches `auth.uid()`
- **email** (text)
- **full_name** (text)
- **nickname** (text)
- **avatar_url** (text)
- **team_id** (integer) – numeric team id
- **current_balance** (integer, default 0)
- **lifetime_score** (integer, default 0)
- **role** (text, default `'student'`) – e.g. `student`, `admin`
- **student_group** (text)
- **attendance_count** (integer, default 0)
- **team** (text) – team code used in leaderboards

### transactions
Tracks every token movement (credits/debits).
- **id** (uuid, PK)
- **user_id** (uuid, FK→profiles.id)
- **amount** (integer, not null)
- **concept** (text) – reason or description
- **created_at** (timestamptz, default now())

### achievements
Catalog of possible achievements.
- **id** (uuid, PK)
- **name** (text, not null)
- **description** (text, not null)
- **icon_name** (text, not null)
- **reward_electrons** (integer, default 0)
- **reward_product_id** (uuid, nullable)
- **created_at** (timestamptz, default now())
- **category** (custom `achievement_category`, default `'especial'`)

### user_achievements
Records which users have unlocked awards.
- **id** (uuid, PK)
- **user_id** (uuid, FK→profiles.id)
- **achievement_id** (uuid, FK→achievements.id)
- **unlocked_at** (timestamptz, default now())

### shop_products
Items available in the in‑app shop or crowdfunding.
- **id** (uuid, PK)
- **name** (text, not null)
- **description** (text)
- **price** (integer, not null, ≥0)
- **image_icon** (text)
- **category** (text, default `'item'`)
- **max_per_user** (integer)
- **stock** (integer)
- **is_active** (boolean, default true)
- **purchase_type** (text enum `'individual'`, `'team'`, `'global'`) etc.
- **created_at** (timestamptz, default now())

### user_inventory
List of products owned by users.
- **id** (uuid, PK)
- **user_id** (uuid, FK→profiles.id)
- **product_id** (uuid, FK→shop_products.id)
- **is_consumed** (boolean, default false)
- **purchased_at** (timestamptz, not null)
- **consumed_at** (timestamptz, nullable)

### crowdfunding_campaigns
Defines group campaigns for collective funding or purchases.
- **id** (uuid, PK)
- **product_id** (uuid, nullable)
- **team_id** (text)
- **current_amount** (integer, default 0)
- **target_amount** (integer, not null)
- **is_completed** (boolean, default false)
- **created_at** (timestamptz, default now())

### crowdfunding_contributions
Individual contributions toward a campaign.
- **id** (bigint, PK, identity)
- **campaign_id** (uuid, FK→crowdfunding_campaigns.id)
- **user_id** (uuid, FK→profiles.id)
- **amount** (integer, not null)
- **contributed_at** (timestamptz, default now())
- **user_team_id** (text)

### crowdfunding_claims
Marks that a user has claimed a campaign reward.
- **campaign_id** (uuid)
- **user_id** (uuid)
- **claimed_at** (timestamptz, default now())

### teams
Team metadata used in leaderboards.
- **id** (text, PK)
- **name** (text, not null)
- **description** (text)
- **hex_color** (text, not null)
- **icon_key** (text)

### class_sessions & attendance (educational context)
- **class_sessions**: sessions created by teachers (id, name, group_name, session_type, secret_code, is_active, created_at, teacher_id).
- **attendance**: links users to sessions (id, user_id, session_id, created_at).

### exercise_library, loot_tiers, notifications, site_metrics, user_unlocks
Additional support tables for exercises, random loot, notifications, metrics, and unlocked exercises; these are mostly read‑only for students.

## Row‑Level Security (RLS)
Every public table has policies tailored to the application’s needs. Common patterns include:

* Users can only SELECT/INSERT/UPDATE their own rows (e.g. `transactions`, `user_achievements`, `user_inventory`, `crowdfunding_claims`, `user_unlocks`, `attendance`).
* Admins (profile.role = 'admin') have full access and can manage other users’ data (policies named “Admin …”).
* Certain catalog tables are globally readable (e.g. `achievements`, `teams`, `loot_tiers`, `crowdfunding_campaigns`).
* Teachers/admins can view more data for management (e.g. all attendances, all user_achievements).

Policies are implemented using `auth.uid()` and joins to `profiles` for role checks. See the SQL dump for the full set.

---

This README should now reflect the current database structure and security constraints used by the Electrones PWA backend.