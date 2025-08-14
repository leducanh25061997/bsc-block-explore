import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Blocks,
  Send,
  Wallet,
  TrendingUp,
  Users,
  BarChart3,
  Pickaxe,
  ArrowRightLeft } from
'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, closeSidebar }) => {
  const menuItems = [
  { id: 'blocks', label: 'Block Explorer', icon: Blocks },
  { id: 'transaction', label: 'Create Transaction', icon: Send },
  { id: 'wallet', label: 'My Wallet', icon: Wallet },
  { id: 'mining', label: 'Mining', icon: Pickaxe },
  { id: 'swap', label: 'Swap Tokens', icon: ArrowRightLeft },
  { id: 'referral', label: 'Referral', icon: Users },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 }];


  return (
    <aside className="w-64 bg-gray-900 text-white h-screen overflow-y-auto" data-id="ogcke45j7" data-path="src/components/Sidebar.tsx">
      <div className="p-6" data-id="218nd7j95" data-path="src/components/Sidebar.tsx">
        <nav className="space-y-2" data-id="f95g9tf0u" data-path="src/components/Sidebar.tsx">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                activeTab === item.id ?
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white' :
                'text-gray-300 hover:text-white hover:bg-gray-800'}`
                }
                onClick={() => {
                  if (closeSidebar) closeSidebar();
                  onTabChange(item.id)
                }} 
                data-id="ns6hv11ud" data-path="src/components/Sidebar.tsx"
              >
                <Icon className="w-5 h-5 mr-3" data-id="1ryj8ydqj" data-path="src/components/Sidebar.tsx" />
                {item.label}
              </Button>);

          })}
        </nav>
      </div>
    </aside>);

};

export default Sidebar;