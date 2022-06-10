declare type CurrentLocationContextValue = URL | null;
declare type AuthContextValue = [boolean, () => void];
declare type SettingsFormChangeHandler = (data: { [key: string]: any }) => void;
declare type SettingsFormElement = { onChange: SettingsFormChangeHandler };

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

declare interface IThemeColors {
  backgroundPrimaryColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  textTertiaryColor: string;
  controlPrimaryColor: string;
  controlSecondaryColor: string;
  buttonPrimaryColor: string;
  buttonSecondaryColor: string;
  iconPrimaryColor: string;
}

declare interface IThemeObject {
  light: IThemeColors;
  dark: IThemeColors;
}

declare interface ITab {
  title: ReactNode;
  badge?: ReactNode;
  tab: ReactNode;
}
