import { SetMetadata } from "@nestjs/common"

export const AccessLevel = (value: string) => SetMetadata("AccessLevel", value)

// eslint-disable-next-line no-shadow
export enum AccessLevels {
  Public = "public",
  Private = "private",
}
