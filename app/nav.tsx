import { MainNav } from '../components/main-nav';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const session = await getServerSession();
  return <MainNav user={session?.user} />;
}
