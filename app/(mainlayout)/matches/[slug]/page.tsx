import MatchPhotos from "../../../../pages/matches/MatchPhotos";

export default async function MatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const matchTitle = resolvedParams.slug.replace(/-/g, " ").toUpperCase();
  return <MatchPhotos title={matchTitle} />;
}
