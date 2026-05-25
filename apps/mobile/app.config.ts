// lifeos-canary apps/mobile — substrate validation scaffold (EAS step 12).
//
// Identity MUST match LifeOS-v2's expo.dev project (per the canary-substrate
// validation plan: reuse LifeOS-v2's existing EAS project to avoid creating
// a separate canary project). Values verified from ~/dev/lifeos-v2/CLAUDE.md
// 2026-05-24.
//
// distribution: internal only (eas.json development profile). Substrate has
// NO `eas submit` wired (per src/lib/ship/command-spec.ts:113-148 EAS
// CommandSpec allowlist — submit is allowed but unused; no handler dispatches
// it). Accidental TestFlight push is structurally impossible.
//
// When LifeOS-v2 production cutover happens (step 16), this canary scaffold
// becomes vestigial and can be deleted. Until then it provides the cheap
// dry-run substrate for the EAS step-10 multi-target work.

import type { ExpoConfig } from "expo/config"

const config: ExpoConfig = {
  name: "LifeOS Canary",
  slug: "lifeos-v2",
  scheme: "lifeoscanary",
  version: "0.0.1",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  newArchEnabled: true,
  ios: {
    bundleIdentifier: "com.thelifeosapp.mobile",
    buildNumber: "1",
    supportsTablet: false,
  },
  extra: {
    eas: {
      projectId: "2c185416-30a0-4c74-ab26-cc89ab88943f",
    },
  },
  owner: "lifeosapp",
}

export default config
