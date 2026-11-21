import {describe,it,expect} from 'vitest';
import {loginSchema} from '../src/lib/validation';
describe('login validation',()=>{
 it('accepts valid form input',()=>{expect(loginSchema.safeParse({email:'learner@example.com',password:'password123',role:'MEMBER'}).success).toBe(true)});
 it('rejects malformed email',()=>{expect(loginSchema.safeParse({email:'not-an-email',password:'password123',role:'MEMBER'}).success).toBe(false)});
 it('rejects short password',()=>{expect(loginSchema.safeParse({email:'learner@example.com',password:'123',role:'MEMBER'}).success).toBe(false)});
 it('rejects unknown role',()=>{expect(loginSchema.safeParse({email:'learner@example.com',password:'password123',role:'SUPERUSER'}).success).toBe(false)});
});
