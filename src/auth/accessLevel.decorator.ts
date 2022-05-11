import { SetMetadata } from "@nestjs/common";

export const AccessLevel = (value: string) => {
  return SetMetadata("AccessLevel", value);
};

export enum AccessLevels {
  Public = "public",
  Player = "player",
  Admin = "admin",
}
