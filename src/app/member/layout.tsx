import RoleLayout from '@/components/RoleLayout';
export default function Layout({children}:{children:React.ReactNode}){return <RoleLayout role="MEMBER" name="Workspace member">{children}</RoleLayout>}
