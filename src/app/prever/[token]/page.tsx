import PredictionsClient from "./PredictionsClient";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function PredictionsPage({ params }: Props) {
  const { token } = await params;
  return <PredictionsClient token={token} />;
}
