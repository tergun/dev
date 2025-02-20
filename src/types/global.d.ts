interface UniApp {
  showToast: (options: { title: string; icon?: string }) => void;
  navigateTo: (options: { url: string }) => void;
  redirectTo: (options: { url: string }) => void;
}

declare const uni: UniApp;
declare const getCurrentPages: () => any[];
declare const getApp: () => any;
