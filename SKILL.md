# Signature — Microsoft 365 Outlook add-in development skill

## Goal
Build a secure Outlook signature manager deployed using Microsoft 365 Admin Center > Settings > Integrated apps > Upload custom app (Office Add-in XML manifest).

## Working rules
- Treat `manifest.xml` as an Outlook add-in-only manifest, not a Teams app manifest.
- Keep add-in web assets on a production HTTPS origin and use real, publicly reachable icon URLs.
- Do not claim a manifest alone deploys working signature management.
- Use Office.js for client-side signature insertion; escape user-controlled HTML.
- Do not embed Microsoft Graph secrets, tenant credentials, or tokens in frontend code.
- Begin with explicit manual insertion. Add automatic event-based signatures only after implementing and testing event runtime and `setSignatureAsync`.
- Validate XML against Microsoft Office add-in manifest schema and test across Outlook web, new Outlook, and classic Outlook before tenant-wide deployment.
- Use least-privilege permissions, staged deployment, and avoid duplicating users' existing signatures.

## Current implementation
Manual signature insertion task pane: `taskpane.html` + `taskpane.js`.
The XML manifest contains HTTPS placeholder URLs and is **not deployment-ready** until hosting, icons, and manifest validation are completed.

## Roadmap
1. Host taskpane and icons over HTTPS; replace placeholder origin.
2. Validate and pilot the manifest in Microsoft 365 Integrated apps.
3. Build authenticated, tenant-aware signature templates and centralized administration.
4. Add event-based auto insertion with supported Outlook clients and explicit fallback behavior.
5. Test security, user/group targeting, rollback, and deployment.

## Official references
- https://learn.microsoft.com/en-us/office/dev/add-ins/develop/event-based-activation
- https://learn.microsoft.com/en-us/samples/officedev/Office-Add-in-samples/outlook-add-in-set-signature/
