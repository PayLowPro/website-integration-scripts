(function () {
  // Get configuration for this specific feature
  const config = window.__PAYLOPRO_CONFIG__?.updateAmountDueLabel || {};
  const feeRate = window.__PAYLOPRO_CONFIG__?.feeRate || 0;
  
  // Get placeholder value from configuration or use default
  const newLabelText = config.placeholder1 || "Cash Discounted Total";

  console.log("[PayLoPro - updateAmountDueLabel] Starting execution");
  console.log("[PayLoPro - updateAmountDueLabel] Config:", config);
  console.log("[PayLoPro - updateAmountDueLabel] New label text:", newLabelText);

  // Update the amount due label
  const selector = "#wrapper-letter tr.row_total_inc > td:nth-child(2)";
  const targetElement = document.querySelector(selector);

  if (targetElement) {
    targetElement.innerText = newLabelText;
    console.log("[PayLoPro - updateAmountDueLabel] Successfully updated label to:", newLabelText);
  } else {
    console.error("[PayLoPro - updateAmountDueLabel] Could not find target element:", selector);
  }
})();

