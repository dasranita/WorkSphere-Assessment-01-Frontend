import { NextRequest,NextResponse } from 'next/server';
import { createSession } from '@/lib/session';
import { loginSchema } from '@/lib/validation';
const destinations={PLATFORM_ADMIN:'/platform',OWNER:'/owner',PROJECT_MANAGER:'/manager',MEMBER:'/member'} as const;
export async function POST(request:NextRequest) {
 try {
  const parsed=loginSchema.safeParse(await request.json());
  if(!parsed.success)return NextResponse.json({error:parsed.error.issues[0]?.message||'Invalid input.'},{status:400});
  // Assessment-only demo identity. Replace with a real backend authentication call.
  const {email,password,role}=parsed.data;
  if(password.length<8)return NextResponse.json({error:'Invalid credentials.'},{status:401});
  const token=await createSession({userId:`demo-${role.toLowerCase()}`,name:email.split('@')[0],role,organizationId:role==='PLATFORM_ADMIN'?undefined:'demo-org'});
  const response=NextResponse.json({destination:destinations[role]});
  response.cookies.set('worksphere_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:7200});
  return response;
 } catch { return NextResponse.json({error:'Unable to process sign-in. Check server configuration.'},{status:500}); }
}
