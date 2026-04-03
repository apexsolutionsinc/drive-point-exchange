import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../../lib/supabase';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Not signed in → go to login
  if (!user) {
    redirect('/auth/admin/login?next=/admin');
  }

  // For now, allow any authenticated user to access admin
  // TODO: Implement proper role checking when Supabase is configured
  // const role = (user.user_metadata as any)?.role;
  // const roles = (user.app_metadata as any)?.roles as string[] | undefined;
  // const isAdmin = role === 'admin' || roles?.includes('admin');
  // if (!isAdmin) {
  //   redirect('/admin/login?error=not_authorized');
  // }

  return <>{children}</>;
}
