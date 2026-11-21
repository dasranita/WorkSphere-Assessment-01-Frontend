'use client';
import { useState } from 'react';
export default function LoginForm() {
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 async function submit(form:FormData) {
  setBusy(true);setError('');
  const payload={email:String(form.get('email')||''),password:String(form.get('password')||''),role:String(form.get('role')||'')};
  try {
   const response=await fetch('/api/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   const result=await response.json();
   if(!response.ok) throw new Error(result.error||'Unable to sign in.');
   window.location.assign(result.destination);
  } catch(e) { setError(e instanceof Error?e.message:'A network error occurred. Please try again.'); }
  finally {setBusy(false);}
 }
 return <form action={submit} className="panel" aria-label="Sign in form"><h2>Sign in</h2><p className="muted">Assessment demo sign-in. Choose a role to inspect its protected workspace.</p><label className="field">Email<input name="email" type="email" autoComplete="username" required maxLength={254} placeholder="you@example.com"/></label><label className="field">Password<input name="password" type="password" autoComplete="current-password" required minLength={8} maxLength={128} placeholder="At least 8 characters"/></label><label className="field">Demo role<select name="role" defaultValue="MEMBER"><option value="PLATFORM_ADMIN">Platform administrator</option><option value="OWNER">Organization owner</option><option value="PROJECT_MANAGER">Project manager</option><option value="MEMBER">Member</option></select></label>{error&&<p role="alert" className="error">{error}</p>}<button disabled={busy}>{busy?'Signing in…':'Sign in'}</button></form>;
}
