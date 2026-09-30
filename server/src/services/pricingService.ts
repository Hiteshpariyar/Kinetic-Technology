// server/src/services/pricingService.ts
import { PrismaClient, PricingRule } from "@prisma/client";

const prisma = new PrismaClient();

export interface PricingPayload {
  platformIds?: string[];
  featureIds?: string[];
  integrationIds?: string[];
  design?: boolean;
  securityLevel?: string;
}

export interface PricingBreakdown {
  baseCost: number;
  platformCost: number;
  featureCost: number;
  integrationCost: number;
  designCost: number;
  securityCost: number;
  total: number;
}

/**
 * Calculate the total price based on selected IDs.
 * The frontend sends arrays of IDs (platformIds, featureIds, integrationIds, etc.).
 * The service looks up each rule, sums their price and returns a breakdown.
 */
export const calculatePrice = async (payload: PricingPayload): Promise<PricingBreakdown> => {
  const {
    platformIds = [],
    featureIds = [],
    integrationIds = [],
    design = false,
    securityLevel,
  } = payload;

  // Helper to sum price of rules for a given category
  const sumCategory = async (category: string, ids: string[]): Promise<number> => {
    if (ids.length === 0) return 0;
    try {
      const rules = await prisma.pricingRule.findMany({
        where: { category, name: { in: ids }, active: true },
      });
      return rules.reduce((acc: number, r: PricingRule) => acc + Number(r.price), 0);
    } catch (e) {
      // Fallback for initial deployment before database seeds
      console.warn(`[pricingService] Database query skipped or failed: ${e}`);
      return 0;
    }
  };

  const platformCost = await sumCategory("platform", platformIds);
  const featureCost = await sumCategory("feature", featureIds);
  const integrationCost = await sumCategory("integration", integrationIds);

  let designCost = 0;
  if (design) {
    try {
      const rule = await prisma.pricingRule.findFirst({
        where: { category: "design", active: true },
      });
      designCost = rule ? Number(rule.price) : 0;
    } catch {
      designCost = 0;
    }
  }

  let securityCost = 0;
  if (securityLevel) {
    try {
      const rule = await prisma.pricingRule.findFirst({
        where: { category: "security", name: securityLevel, active: true },
      });
      securityCost = rule ? Number(rule.price) : 0;
    } catch {
      securityCost = 0;
    }
  }

  const baseCost = 0;
  const total = baseCost + platformCost + featureCost + integrationCost + designCost + securityCost;

  return { baseCost, platformCost, featureCost, integrationCost, designCost, securityCost, total };
};
