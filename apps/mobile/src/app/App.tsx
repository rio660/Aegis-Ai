import React from 'react';
import { AppShell, MobileBottomNav, SidebarNav } from '../components/components.js';
import { Dashboard, Welcome } from '../screens/Screens.js';
export function App(){return <AppShell><SidebarNav/><Welcome/><Dashboard/><MobileBottomNav/></AppShell>}
