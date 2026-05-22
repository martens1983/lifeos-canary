import { describe, expect, it } from "vitest"
import { GET } from "./route"

describe("GET /api/canary", () => {
  it("returns HTTP 200 + JSON {ok:true, ts:<ISO>}", async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.ok).toBe(true)
    expect(typeof body.ts).toBe("string")
    expect(() => new Date(body.ts).toISOString()).not.toThrow()
    /* Reject epoch — must be a fresh server-side stamp. */
    const now = Date.now()
    const ts = new Date(body.ts).getTime()
    expect(Math.abs(now - ts)).toBeLessThan(60_000)
  })
})
