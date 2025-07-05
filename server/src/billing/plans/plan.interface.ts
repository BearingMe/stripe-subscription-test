import type { Timestamp } from "../../common/types/misc";

export interface Plan {
  id: string;
  active: boolean;
  created: Timestamp;
  metadata: Record<string, string>;
  defaultPrice: string;
}
