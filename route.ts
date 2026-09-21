import { recordPortalOpen } from "@/db/portal-stats";

export async function POST() {
  try {
    await recordPortalOpen();
    return Response.json({ recorded: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to record portal open", error);
    return Response.json({ recorded: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
