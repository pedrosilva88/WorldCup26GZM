import KnockoutClient from "./KnockoutClient";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function KnockoutPage({ params }: Props) {
  const { token } = await params;
  return <KnockoutClient token={token} />;
}
