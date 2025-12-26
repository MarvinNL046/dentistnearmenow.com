# Row Level Security (RLS) Policies

Dit document beschrijft hoe je RLS policies toepast op de Neon database.

## Wat is RLS?

Row Level Security (RLS) zorgt ervoor dat gebruikers alleen de data kunnen zien en bewerken waar ze recht op hebben. Dit wordt afgedwongen op database niveau, dus ook als er een bug in je applicatie code zit, kan een gebruiker nooit bij data van anderen.

## Installatie

### Stap 1: Voer de SQL migrations uit in Neon

1. Ga naar [Neon Console](https://console.neon.tech)
2. Open je project
3. Ga naar **SQL Editor**
4. Kopieer en plak de inhoud van:
   - `0001_rls_policies.sql` (basis policies)
   - `0002_rls_additional_tables.sql` (cemetery-specifieke tabellen)
5. Klik op **Run**

### Stap 2: Test de policies

```sql
-- Test als anonymous user
SET LOCAL app.current_user_id = '';
SELECT * FROM user_favorites_by_slug; -- Zou 0 rows moeten geven

-- Test als specifieke user (bijv. user 1)
SET LOCAL app.current_user_id = '1';
SELECT * FROM user_favorites_by_slug; -- Alleen favorieten van user 1

-- Test admin check
SELECT auth.is_admin(); -- true als user 1 admin is
```

## Gebruik in je applicatie

### Methode 1: Direct SQL (huidige aanpak)

```typescript
import { neon } from '@neondatabase/serverless';
import { getCurrentUser } from '@/lib/auth';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  const user = await getCurrentUser();

  // Set user context voor RLS
  if (user) {
    await sql`SET LOCAL app.current_user_id = ${user.id.toString()}`;
  }

  // Nu respecteren alle queries automatisch de RLS policies
  const favorites = await sql`
    SELECT * FROM user_favorites_by_slug
  `; // Geeft automatisch alleen jouw favorieten!

  return Response.json(favorites);
}
```

### Methode 2: Met helper functie

```typescript
import { withRLS } from '@/lib/db/with-rls';
import { db } from '@/lib/db';
import { userFavorites } from '@/lib/db/schema';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();

  const favorites = await withRLS(user?.id, async () => {
    return db.select().from(userFavorites);
  });

  return Response.json(favorites);
}
```

## Policy overzicht

| Tabel | Select | Insert | Update | Delete |
|-------|--------|--------|--------|--------|
| `users` | Eigen + public profiles | - | Alleen eigen | - |
| `businesses` | Public actieve | Eigen | Eigen | Eigen |
| `places` | Public actieve | - | Eigenaar/business | - |
| `reviews` | Published + eigen | Auth users | Eigen pending | Eigen |
| `user_favorites_by_slug` | Alleen eigen | Eigen | - | Eigen |
| `cemetery_reviews` | Approved + eigen | Iedereen | Eigen pending | - |
| `website_feedback` | Admin only | Iedereen | Admin | Admin |
| `google_reviews` | Iedereen | Admin | Admin | Admin |

## Belangrijke functies

```sql
-- Huidige user ID ophalen
SELECT auth.user_id();

-- Check of huidige user admin is
SELECT auth.is_admin();

-- Business ID van huidige user
SELECT auth.business_id();
```

## Troubleshooting

### "Permission denied" errors

1. Check of RLS is ingeschakeld: `SELECT relrowsecurity FROM pg_class WHERE relname = 'table_name';`
2. Check of de user context is gezet: `SELECT current_setting('app.current_user_id', true);`
3. Check de policies: `SELECT * FROM pg_policies WHERE tablename = 'table_name';`

### Policies uitzetten (development)

```sql
-- Tijdelijk RLS uitzetten voor een tabel
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;

-- Weer aanzetten
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### Bypass RLS (admin operations)

Voor system operations (cron jobs, migrations) gebruik je een database role met `BYPASSRLS` privilege, of voer je operaties uit zonder user context.

## Security notes

1. **Altijd user context zetten** - Vergeet niet `SET LOCAL app.current_user_id` aan te roepen
2. **Gebruik `SET LOCAL`** - Dit zorgt ervoor dat de context alleen voor de huidige transactie geldt
3. **Admin checks** - De `auth.is_admin()` functie checkt de `role` kolom in de `users` tabel
4. **Defense in depth** - RLS is een extra laag beveiliging, doe ook authorization checks in je applicatie code
