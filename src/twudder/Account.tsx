export interface MooAccount {
  username: string;
  password: string;
  name: string;
}

export const accounts = new Map<string, MooAccount>();
