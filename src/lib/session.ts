import { SignJWT, jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';

export const roles = ['PLATFORM_ADMIN', 'OWNER', 'PROJECT_MANAGER', 'MEMBER'] as const;
export type Role = typeof roles[number];
export type Session = { userId: string; name: string; role: Role; organizationId?: string };

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error('SESSION_SECRET must contain at least 32 characters');
  return new TextEncoder().encode(value);
}
export async function createSession(session: Session) {
  return new SignJWT(session).setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt().setExpirationTime('2h').sign(secret());
}
export async function readSession(request: NextRequest): Promise<Session | null> {
  const token = request.cookies.get('worksphere_session')?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.userId !== 'string' || typeof payload.name !== 'string' ||
        !roles.includes(payload.role as Role)) return null;
    return payload as unknown as Session;
  } catch { return null; }
}
export const routeRoles: Record<string, Role[]> = {
  '/platform': ['PLATFORM_ADMIN'],
  '/owner': ['OWNER'],
  '/manager': ['PROJECT_MANAGER', 'OWNER'],
  '/member': ['MEMBER', 'PROJECT_MANAGER', 'OWNER'],
};
