import { Outstatic } from "outstatic";
import { OstClient } from "outstatic/client";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const ostData = await Outstatic();
  const awaitedParams = await params;
  return <OstClient ostData={ostData} params={awaitedParams} />;
}
