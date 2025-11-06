(function () {
  // Get configuration for this specific feature
  const config = window.__PAYLOPRO_CONFIG__?.applyServiceCharge || {};
  const feeRate = window.__PAYLOPRO_CONFIG__?.feeRate || 0.035;

  console.log("[PayLoPro - applyServiceCharge] Starting execution");
  console.log("[PayLoPro - applyServiceCharge] Config:", config);
  console.log("[PayLoPro - applyServiceCharge] Fee rate:", feeRate);

  // Apply service charge to all totals
  const targetSelectors = [
    { selector: "tr.row_total_exc > td.cell_value.align-right", name: "Subtotal" },
    { selector: "tr.row_total_tax > td.cell_value.align-right", name: "Tax" },
    { selector: "tr.row_total_inc > td.cell_value.align-right", name: "AMOUNT DUE (Total Inc)" },
    { selector: "tr.row_payments_list > td.cell_value.align-right", name: "PayLo Pro" },
    { selector: "tr.row_amount_outstanding > td.cell_value.align-right", name: "INVOICE BALANCE" }
  ];

  console.log(`[PayLoPro - applyServiceCharge] Applying ${feeRate * 100}% service charge...`);

  targetSelectors.forEach(item => {
    const targetElement = document.querySelector(item.selector);

    if (targetElement) {
      let currentValueText = targetElement.innerText.trim();
      let originalValue = parseFloat(currentValueText);

      if (!isNaN(originalValue) && originalValue >= 0) {
        let newValue = originalValue * (1 + feeRate);
        let newFormattedValue = newValue.toFixed(2);

        targetElement.innerText = newFormattedValue;
        console.log(`[PayLoPro - applyServiceCharge] Updated ${item.name}: ${originalValue.toFixed(2)} -> ${newFormattedValue}`);
      } else {
        console.warn(`[PayLoPro - applyServiceCharge] Skipping ${item.name}: Could not parse "${currentValueText}"`);
      }
    } else {
      console.error(`[PayLoPro - applyServiceCharge] Element not found for ${item.name}: ${item.selector}`);
    }
  });
})();

