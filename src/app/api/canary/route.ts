/**
 * GET /api/canary — health endpoint for the lifeos-devops 3-canary
 * milestone. Returns ok:true plus an ISO timestamp so the smoke test
 * can verify the running deployment is fresh.
 */
export async function GET(): Promise<Response> {
  return Response.json({
    ok: true,
    ts: new Date().toISOString(),
  })
}
