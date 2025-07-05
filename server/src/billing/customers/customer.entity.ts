import type { Timestamp } from "../../common/types/misc";

export interface Customer {
  id: string;
  email: string;
  name: string;
  metadata: Record<string, string>;
  created: Timestamp;
}
