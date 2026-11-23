/* Starter manual signature insertion; no user data is transmitted to a server. */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const escapeHtml = value => String(value || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  Office.onReady(function (info) {
    if (info.host !== Office.HostType.Outlook || !Office.context.mailbox.item || !Office.context.mailbox.item.body) {
      $("status").textContent = "Open an Outlook message compose window.";
      return;
    }
    $("name").value = Office.context.mailbox.userProfile.displayName || "";
    $("company").value = "Your Company";
    $("insert").disabled = false;
    $("status").textContent = "Ready.";
  });
  $("insert").addEventListener("click", function () {
    const name = escapeHtml($("name").value.trim());
    const role = escapeHtml($("role").value.trim());
    const company = escapeHtml($("company").value.trim());
    if (!name) { $("status").textContent = "Enter a display name."; return; }
    const html = '<div style="font-family:Arial,sans-serif;font-size:12px;color:#253858"><strong>' + name + '</strong>' + (role ? '<br>' + role : '') + (company ? '<br>' + company : '') + '</div>';
    Office.context.mailbox.item.body.setSelectedDataAsync(html, {coercionType: Office.CoercionType.Html}, function (result) {
      $("status").textContent = result.status === Office.AsyncResultStatus.Succeeded ? "Signature inserted at cursor." : "Unable to insert: " + (result.error ? result.error.message : "Unknown error");
    });
  });
}());