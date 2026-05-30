declare module 'react' { const React: any; export default React; export const useState: any; export type ReactNode = any; }
declare module 'react-dom/client' { export function createRoot(el: Element): { render(node: any): void }; }
declare module 'react/jsx-runtime' { export const jsx:any; export const jsxs:any; export const Fragment:any; }
declare namespace JSX { interface IntrinsicElements { [elemName: string]: any } }
declare module '@capacitor/cli' { export interface CapacitorConfig { appId:string; appName:string; webDir:string } }

declare module '*.css';
declare namespace React { type ReactNode = any; }
