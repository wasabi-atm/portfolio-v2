import { Outstatic } from "outstatic";
import { OstClient } from "outstatic/client";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const ostData = await Outstatic();
  return <OstClient ostData={ostData} params={params} />;
}
