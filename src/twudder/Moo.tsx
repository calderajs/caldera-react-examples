import { MooAccount } from "./Account";
import { makeSharedResource } from "caldera";

export interface MooType {
  account: MooAccount;
  text: string;
  tags: string[];
  mentions: string[];
}

export const moosResource = makeSharedResource<MooType[]>([]);