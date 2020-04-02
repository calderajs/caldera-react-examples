import { MooAccount } from "./Account";

export interface MooType {
  account: MooAccount;
  text: string;
  tags: string[];
  mentions: string[];
}
