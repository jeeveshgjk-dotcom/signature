# Signature Manager for Microsoft 365

Outlook add-in starter for managed email signatures, designed for deployment through **Microsoft 365 Admin Center → Settings → Integrated apps**.

## Included
- `manifest.xml` — Outlook add-in-only XML manifest with a compose ribbon command.
- `taskpane.html` / `taskpane.js` — Office.js task pane to manually insert an HTML signature at the cursor.
- `SKILL.md` — implementation conventions and roadmap.

## Status: development starter — not ready to upload
The manifest currently uses `https://YOUR-HTTPS-HOST.example.com` as a **placeholder**, and the icon PNG files have not been supplied. The add-in will not load until the HTTPS pages and icons exist and the URLs are updated. No automatic insertion, central administration, or Microsoft Graph integration is implemented yet.

The current insertion is manual, using `setSelectedDataAsync`, and can insert a second signature if run repeatedly.

## Next milestones
1. Deploy task pane assets and icon PNGs to a real HTTPS host.
2. Replace placeholder URLs and validate the XML manifest.
3. Pilot deploy to a test group.
4. Implement tenant-authenticated signature policies and event-based automatic insertion.

See `SKILL.md` for development guardrails.
