---
phase: authentication-crud-api
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - lib/schemas/auth.ts
  - app/api/auth/login/route.ts
  - app/api/auth/logout/route.ts
autonomous: true
requirements:
  - AUTH-01
  - AUTH-02

must_haves:
  truths:
    - "User can login with valid credentials and receive a session cookie"
    - "Invalid credentials return 401 Unauthorized"
    - "User can logout, clearing the session cookie"
  artifacts:
    - path: "lib/schemas/auth.ts"
      provides: "Zod validation schema for login requests"
      exports: ["loginSchema"]
    - path: "app/api/auth/login/route.ts"
      provides: "POST endpoint for user login"
      exports: ["POST"]
    - path: "app/api/auth/logout/route.ts"
      provides: "POST endpoint for user logout"
      exports: ["POST"]
  key_links:
    - from: "app/api/auth/login/route.ts"
      to: "lib/schemas/auth.ts"
      via: "Zod validation parse"
      pattern: "loginSchema\\.parse"
---

<objective>
Implement Zod validation schemas for authentication and API routes for login and logout with secure session cookie handling.

Purpose: Enable secure user authentication with password verification and HTTP-only session cookies.
Output: `lib/schemas/auth.ts`, `app/api/auth/login/route.ts`, `app/api/auth/logout/route.ts`
</objective>

<execution_context>
@$HOME/.config/opencode/get-shit-done/workflows/execute-plan.md
@$HOME/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@lib/ratelimit.ts
</context>

<tasks>

<task type="auto" tdd="true">
  <name>task 1: create auth validation schemas</name>
  <files>lib/schemas/auth.ts</files>
  <behavior>
    - Test 1: loginSchema validates valid email and password format
    - Test 2: loginSchema rejects missing or malformed email/password
  </behavior>
  <action>Create Zod validation schema for login requests containing email and password fields.</action>
  <verify>
    <automated>npx jest --testPathPattern=auth.test.ts || npx ts-node -e "import { loginSchema } from './lib/schemas/auth'; console.log(loginSchema.safeParse({email: 'test@example.com', password: 'password123'}).success)"</automated>
  </verify>
  <done>lib/schemas/auth.ts exists with exported loginSchema</done>
</task>

<task type="auto">
  <name>task 2: create login and logout api endpoints</name>
  <files>app/api/auth/login/route.ts, app/api/auth/logout/route.ts</files>
  <action>Implement POST /api/auth/login to authenticate users against Supabase, validate using loginSchema, and set an httpOnly session cookie. Implement POST /api/auth/logout to clear the session cookie.</action>
  <verify>
    <automated>curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/auth/login -d '{"email":"","password":""}'</automated>
  </verify>
  <done>Login and logout API routes created and functional with Zod validation and cookie management</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Client → Login API | Unauthenticated credentials input |
| API → Supabase Auth | Credential verification |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-AUTH-01 | Tampering | login/route.ts | mitigate | Validate request body using strict Zod schema (`loginSchema`) |
| T-AUTH-02 | Elevation of Privilege | login/route.ts | mitigate | Use secure httpOnly cookies for session storage |
</threat_model>

<verification>
- Verify login schema validates correct payloads.
- Verify login and logout routes handle requests properly.
</verification>

<success_criteria>
- Zod schema for login is defined and exported.
- Login and logout REST endpoints are fully implemented with validation and session management.
</success_criteria>

<output>
After completion, create `.planning/phases/04-authentication-crud-api/04-authentication-crud-api-01-SUMMARY.md`
</output>
