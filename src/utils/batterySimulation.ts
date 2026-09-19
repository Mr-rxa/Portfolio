// Illustrative EV Battery Twin physics-inspired model
// Reference: Arrhenius electrochemical degradation & lithium plating dynamics

export interface BatteryTwinState {
  temperature: number; // -10 to 50 Celsius
  dischargeRate: number; // 0.5 to 3.5 C-rate
  usableCapacityPct: number; // e.g. 94.2%
  projectedRangeKm: number; // e.g. 132 km
  sohAfter1000Cycles: number; // State of Health %
  degradationMultiplier: number; // x baseline
  activeMechanisms: {
    coldPlating: boolean;
    heatSEI: boolean;
    highCRateStress: boolean;
    optimalZone: boolean;
  };
}

export function computeBatteryTwin(temp: number, cRate: number): BatteryTwinState {
  // High temp accelerates SEI growth exponentially (Arrhenius approx)
  const heatFactor = temp > 25 ? Math.exp((temp - 25) / 14) - 1 : 0;
  
  // Cold temp increases electrolyte viscosity & lithium plating risk
  const coldFactor = temp < 15 ? Math.pow((15 - temp) / 10, 1.8) : 0;
  
  // Discharge rate stress (Joule heating + mechanical electrode stress)
  const cRateStress = Math.pow(cRate / 1.0, 1.4);
  
  // Instantaneous range penalty (chemistry + inverter efficiency)
  let instantEfficiency = 1.0;
  if (temp < 20) {
    instantEfficiency -= (20 - temp) * 0.012; // cold range loss up to ~35%
  } else if (temp > 35) {
    instantEfficiency -= (temp - 35) * 0.007; // cooling system overhead
  }
  instantEfficiency -= (cRate - 1.0) * 0.06; // high draw losses
  instantEfficiency = Math.max(0.45, Math.min(1.02, instantEfficiency));

  const baselineRangeKm = 150; // Revolt RV400 nominal range approx
  const projectedRangeKm = Math.round(baselineRangeKm * instantEfficiency);

  // Irreversible degradation multiplier (baseline = 1.0)
  const degradationMultiplier = parseFloat(
    (1.0 + (heatFactor * 0.55) + (coldFactor * 0.4) + ((cRateStress - 1.0) * 0.35)).toFixed(2)
  );

  // SOH after 1,000 cycles (nominal baseline is ~88% at standard 25°C / 1C)
  const nominalFade = 12.0; // 12% loss -> 88% SOH
  const totalFade = Math.min(48, nominalFade * degradationMultiplier);
  const sohAfter1000Cycles = parseFloat((100 - totalFade).toFixed(1));

  const usableCapacityPct = parseFloat((100 * instantEfficiency).toFixed(1));

  return {
    temperature: temp,
    dischargeRate: cRate,
    usableCapacityPct,
    projectedRangeKm,
    sohAfter1000Cycles,
    degradationMultiplier,
    activeMechanisms: {
      coldPlating: temp < 10,
      heatSEI: temp > 35,
      highCRateStress: cRate > 2.0,
      optimalZone: temp >= 18 && temp <= 28 && cRate <= 1.5,
    },
  };
}
