declare const uni: {
  showToast: (options: { title: string; icon?: string }) => void;
  navigateTo: (options: { url: string }) => void;
  redirectTo: (options: { url: string }) => void;
}

declare module '@dcloudio/uni-app' {
  export * from '@dcloudio/uni-app/dist/uni-app.d.ts';
}
