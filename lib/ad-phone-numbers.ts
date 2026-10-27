// Google Ads call-tracking numbers (Ads account 184-645-0364). Each ad's
// "Final URL suffix" appends ?n=<value> so this site can swap the displayed
// number client-side to attribute calls back to the specific ad/campaign
// that drove the visit — no third-party call-tracking script needed. See
// components/AdPhoneProvider.tsx for how this is consumed, and
// DEPLOYMENT.md for the full brief this came from.
export const AD_TRACKING_NUMBERS: Record<string, string> = {
  "5182780739": "(518) 278-0739", // Albany / Capital Region airport, Halloween
  "5182780743": "(518) 278-0743", // Albany Airport Inbound
  "5182780752": "(518) 278-0752", // Albany Amtrak
  "4132691826": "(413) 269-1826", // Berkshires
  "8022092096": "(802) 209-2096", // Bennington VT
  "6072138197": "(607) 213-8197", // Oneonta / Otsego
  "8454107918": "(845) 410-7918", // Hudson Valley
  "3152602668": "(315) 260-2668", // Herkimer
  "4132695004": "(413) 269-5004", // Williams College
  "6072138840": "(607) 213-8840", // Cornell / Ithaca College
  "5182828020": "(518) 282-8020", // Medical rides
  "5182787063": "(518) 278-7063", // College (shared)
  "5182787060": "(518) 278-7060", // RPI
  "5182787056": "(518) 278-7056", // Union
  "5182787055": "(518) 278-7055", // Skidmore
  "8022092117": "(802) 209-2117", // Bennington College
  "8454121041": "(845) 412-1041", // Bard
  "8454121037": "(845) 412-1037", // Vassar
  "5182787051": "(518) 278-7051", // Local: Hunter / Windham
  "5182787053": "(518) 278-7053", // Local: Hudson
  "8454107989": "(845) 410-7989", // Local: Kingston / Rhinecliff
};
