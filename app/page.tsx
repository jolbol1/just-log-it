export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  return <main className="p-4 md:p-10 mx-auto max-w-7xl">Hi</main>;
}
