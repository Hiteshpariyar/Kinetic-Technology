import { Request, Response, NextFunction } from "express";
import { calculatePrice as calculatePriceService } from "../services/pricingService";
import { calculateTimeline as calculateTimelineService } from "../services/timelineService";

export const calculatePrice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await calculatePriceService(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const calculateTimeline = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await calculateTimelineService(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
