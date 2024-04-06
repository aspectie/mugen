export const enum UserRateStatus {
  planned = 'planned',
  watching = 'watching',
  rewatching = 'rewatching',
  completed = 'completed',
  on_hold = 'on_hold',
  dropped = 'dropped'
}

export type TUserRateStatus = keyof typeof UserRateStatus
