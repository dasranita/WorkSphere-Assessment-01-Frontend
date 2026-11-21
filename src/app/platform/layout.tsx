import RoleLayout from '@/components/RoleLayout';
import {readSession} from '@/lib/session';
import {headers} from 'next/headers';
import {NextRequest} from 'next/server';
export default async function Layout({children}:{children:React.ReactNode}){const h=await headers();const cookie=h.get('cookie')||'';const request=new NextRequest('http://localhost/platform',{headers:{cookie}});const s=await readSession(request);return <RoleLayout role="PLATFORM_ADMIN" name={s?.name||'Administrator'}>{children}</RoleLayout>}
