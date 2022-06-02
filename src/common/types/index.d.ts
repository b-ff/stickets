declare interface IEntityWithId {
  _id: string;
}

declare interface IUserInformation extends IEntityWithId {
  name: string;
  email: string;
  avatar: string;
}

declare interface INote extends IEntityWithId {
  uid: string;
  url: string;
  note: string;
  scope: Scope;
  shared: boolean;
  sharedWith;
  createdAt: string;
  updatedAt: string;
  creator: IUserInformation;
  sharedWith: IUserInformation[];
}

declare interface ISwitchOption {
  value: string;
  label: string;
  count?: number;
}

declare type TNotesGroupedByScope = {
  [key in Scope]: INote[];
};
