import Link from 'next/link';
import type { Role } from '@/lib/session';
const links: Record<Role,{href:string;label:string}[]> = {
 PLATFORM_ADMIN:[{href:'/platform',label:'Platform overview'}],
 OWNER:[{href:'/owner',label:'Organization'},{href:'/manager',label:'Projects'},{href:'/member',label:'My tasks'}],
 PROJECT_MANAGER:[{href:'/manager',label:'Projects'},{href:'/member',label:'My tasks'}],
 MEMBER:[{href:'/member',label:'My tasks'}]
};
export default function RoleLayout({role,name,children}:{role:Role;name:string;children:React.ReactNode}) {
 return <><header className="topbar"><Link className="brand" href="/">WorkSphere</Link><nav className="nav" aria-label="Main navigation">{links[role].map(x=><Link key={x.href} href={x.href}>{x.label}</Link>)}</nav><span className="muted">{name} · {role.replaceAll('_',' ')}</span></header><main className="shell">{children}</main></>;
}
