import Link from 'next/link';
export default function Unauthorized(){return <main className="shell"><section className="panel"><h1>Access denied</h1><p>You do not have permission to open this workspace.</p><Link href="/login">Return to sign in</Link></section></main>}
