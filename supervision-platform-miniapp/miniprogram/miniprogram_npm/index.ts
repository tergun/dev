export enum UserRole {
  GOVERNMENT_OFFICE = 'GOVERNMENT_OFFICE',
  PEOPLES_CONGRESS = 'PEOPLES_CONGRESS',
  CPPCC_OFFICE = 'CPPCC_OFFICE',
  DEPARTMENT = 'DEPARTMENT',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export interface GlobalData {
  userRole: UserRole | null;
  isAuthenticated: boolean;
}

export interface IAppOption {
  globalData: GlobalData;
}
