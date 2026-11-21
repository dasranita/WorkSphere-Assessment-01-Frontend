import RoleLayout from '@/components/RoleLayout';
import {cookies} from 'next/headers';
import {jwtVerify} from 'jose';
export default async function Layout({children}:{children:React.ReactNode}){const c=await cookies();let name='Owner';try{const t=c.get('worksphere_session')?.value;const key=new TextEncoder().encode(process.env.SESSION_SECRET!);if(t){const {payload}=await jwtVerify(t,key);if(typeof payload.name==='string')name=payload.name;}}catch{}return <RoleLayout role="OWNER" name={name}>{children}</RoleLayout>}
