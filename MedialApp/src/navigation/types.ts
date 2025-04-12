import { ROUTES } from '../constants/routes';

export type RootStackParamList = {
  [ROUTES.MAIN]: undefined;
  [ROUTES.AUTH]: undefined;
};

export type MainTabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.NEWS]: undefined;
  [ROUTES.SHOWCASE]: undefined;
  [ROUTES.SEARCH]: undefined;
  [ROUTES.JOBS]: undefined;
  [ROUTES.MESSAGES]: undefined;
  [ROUTES.NOTIFICATIONS]: undefined;
  [ROUTES.PROFILE]: undefined;
};

export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
};
