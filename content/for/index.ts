import type { Segment } from "../../lib/segments.ts";
import { segment as realEstateAgents } from "./real-estate-agents.ts";
import { segment as agenciesAndConsultancies } from "./agencies-and-consultancies.ts";
import { segment as tradesAndLocalServices } from "./trades-and-local-services.ts";

/**
 * The /for/<slug> use-case pages. Shipped features only; wording reused from
 * the FAQ, /how-it-works, /security and the guides. No customer names, stats,
 * prices or trial wording. The only storage line is "Email bodies aren't stored."
 */
export const segments: Segment[] = [realEstateAgents, agenciesAndConsultancies, tradesAndLocalServices];

export const segmentClosing = "Email bodies aren't stored.";
