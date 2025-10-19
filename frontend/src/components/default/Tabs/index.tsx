import React, { ReactNode, useState } from 'react';
import './style.scss';

interface TabItem {
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTabIndex?: number;
  onTabChange?: (index: number) => void;
}

function Tabs({ tabs, activeTabIndex, onTabChange }: TabsProps) {
  const [internalTabIndex, setInternalTabIndex] = useState(0);
  
  const tabIndex = activeTabIndex !== undefined ? activeTabIndex : internalTabIndex;
  const setTabIndex = onTabChange || setInternalTabIndex;

  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <div 
          key={index} 
          className="tabs__panel"
          style={{ display: tabIndex === index ? 'block' : 'none' }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
