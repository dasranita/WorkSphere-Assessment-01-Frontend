# WorkSphere — Assessment 01: Frontend Architecture

This package contains **only Assessment 01** from the WorkSphere brief.

## Scope from the brief
- Responsive Next.js App Router application.
- Role-specific layouts for platform administrators, organization owners, project managers and members.
- Deliberate server/client component separation.
- Reusable validated forms.
- Accessible navigation.
- Protected pages.
- Safe error handling and automated tests for success, invalid input, authorization and failure paths.

## Run locally (Windows PowerShell)
```powershell
npm install
Copy-Item .env.example .env.local
# Edit .env.local and set SESSION_SECRET to a random secret of 32+ characters.
npm run dev
```
Open http://localhost:3000.

## Demo login
The login page accepts a demo role selector to demonstrate role-specific navigation and protected routes. It creates a signed, HTTP-only session cookie. This is a local assessment demonstration, **not production identity management**. Replace the demo login handler with your real backend authentication endpoint before production.

## Routes
- `/login` — demo sign-in
- `/platform` — platform administrator area
- `/owner` — organization owner area
- `/manager` — project manager area
- `/member` — member area
- `/unauthorized` — safe access-denied page

## Security/design notes
- Middleware verifies a signed session token and checks role claims before allowing protected route access.
- Session cookie is HTTP-only, SameSite=Lax and Secure in production.
- Server components are used for layouts and page shells; client components are limited to interactive forms/navigation.
- Zod validates form input on the server.
- Middleware is a frontend route boundary, not a replacement for backend authorization. Every API endpoint must independently authenticate the user and enforce organization/role/resource permissions.
- Do not commit `.env.local`, secrets, real user data or tokens.

## Tests
```powershell
npm test
```
Tests cover role authorization and form validation. Capture the actual test output and a screenshot of the running app for the required assessment evidence.

## Assessment evidence checklist
- [ ] Source committed to the project GitHub repository with meaningful commits.
- [ ] This assessment-specific README included.
- [ ] Screenshot or short recording showing each role's navigation and protected route behavior.
- [ ] Captured successful test run / CI result.
- [ ] Demonstrate invalid login input and unauthorized route behavior.
