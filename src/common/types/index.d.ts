declare interface IEntityWithId {
  _id: string;
}

declare interface IUserInformation extends IEntityWithId {
  name: string;
  email: string;
  avatar: string;
}

declare interface ISwitchOption {
  value: string;
  label: string;
  count?: number;
}
