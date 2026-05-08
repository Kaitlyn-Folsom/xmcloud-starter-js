# Authoring deploy review (repo evidence)

Generated from a diff review against [items/items/templates/ccl.module.json](items/items/templates/ccl.module.json) and [items/nextjs-starter.module.json](items/nextjs-starter.module.json).

## Module mapping (all changed paths are serialized)

| Folder prefix in repo | `ccl.module.json` include | `allowedPushOperations` |
|----------------------|---------------------------|-------------------------|
| `ccl.media.fd/` | `ccl.media.fd` → `/sitecore/media library/Feature/Alaris` | CreateUpdateAndDelete |
| `ccl.templates.branches/` | `ccl.templates.branches` → `/sitecore/templates/Branches/Project/click-click-launch` | CreateUpdateAndDelete |
| `ccl.templates/.../AI Config/` | `ccl.templates` → `/sitecore/templates/Project/click-click-launch` | CreateUpdateAndDelete |
| `nextjs-starter/DefaultRenderingHost/` | `nextjs-starter` → `/sitecore/system/Settings/Services/Rendering Hosts/Default` (singleItem) | (default push for module) |

**Not in this diff:** `/sitecore/content` is not an include in `ccl.module.json`, so typical page content there is not driven by these YAML files.

## What the current diff is doing (summary)

- **Branch AI Config items (Alaris / SYNC / Solterra):** Field data moved from language-level `Fields` into `Versions[0].Fields`; some values gained quotes; UTF-8 BOM (`﻿`) added on several files. Semantics for question/answer (or service fields) appear preserved—mostly serialization shape cleanup.
- **Template standard values (`AI FAQ Item` / `AI Service` / `AI Summary` → `Content.yml`):** Removed duplicate language-level `Title: Content` entries; BOM on header.
- **Media `alaris-logo.yml`:** `BlobID` and related shared field value changed (asset identity / blob alignment).
- **Default rendering host (`Default.yml`):** **High impact.** `AppName`, editing `config` / `render` / application URLs switched from prior staging-style host to a different `*.sitecorecloud.io` editing host; language section simplified (removed `de-DE`, `zh-CN`; trimmed version metadata). **Verify this matches the environment you deploy to** or Experience Editor / Pages will target the wrong host.

## IAR vs `scsModules` (repository-only confirmation)

- Root [xmcloud.build.json](../xmcloud.build.json) sets `authoringPath: "./authoring"` and **does not** define `deployItems` or `postActions.actions.scsModules`.
- No other `deployItems` / `scsModules` references were found under this repo in `*.json` / `*.md` / `*.yml`.

**Human step (completes portal confirmation):** In [XM Cloud Deploy Portal](https://portal.sitecorecloud.io), open the project → environment → deployment / build settings and confirm whether items are applied as Items as Resources (IAR) or via post-deploy SCS modules. **This cannot be inferred from Git alone** if the portal overrides or extends `xmcloud.build.json`.

**Repo-only conclusion:** No `deployItems` or `scsModules` in committed `xmcloud.build.json`; authoring is referenced via `authoringPath` only.

## Deploy risk checklist

1. **Default rendering host:** Confirm URLs and `AppName` match the intended editing host for this environment.
2. **Branch templates:** If authors changed the same FAQ/Service/Summary branch items in CM, deploy will align CM to Git (`CreateUpdateAndDelete`).
3. **Alaris logo media:** Blob/media changes will sync to CM for that media item path.
