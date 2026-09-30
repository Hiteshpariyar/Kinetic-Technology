// server/src/services/timelineService.ts

export interface TimelinePayload {
  platformIds?: string[];
  featureIds?: string[];
  integrationIds?: string[];
  design?: boolean;
}

export interface TimelineBreakdown {
  discoveryDays: number;
  designDays: number;
  developmentDays: number;
  testingDays: number;
  totalDays: number;
  estimatedWeeks: number;
}

export const calculateTimeline = async (payload: TimelinePayload): Promise<TimelineBreakdown> => {
  const {
    platformIds = [],
    featureIds = [],
    integrationIds = [],
    design = false,
  } = payload;

  const discoveryDays = 5;
  const designDays = design ? 10 : 3;
  const developmentDays = Math.max(10, (platformIds.length * 7) + (featureIds.length * 3) + (integrationIds.length * 2));
  const testingDays = Math.ceil(developmentDays * 0.25);
  const totalDays = discoveryDays + designDays + developmentDays + testingDays;
  const estimatedWeeks = Math.ceil(totalDays / 5);

  return {
    discoveryDays,
    designDays,
    developmentDays,
    testingDays,
    totalDays,
    estimatedWeeks,
  };
};
