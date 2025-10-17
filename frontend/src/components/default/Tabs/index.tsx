import React, { ReactNode, useEffect, useState } from 'react';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import './style.scss';

interface TabsProps {
  list: ReactNode[];
}

function Tabs({ list }: TabsProps) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <ReactTabs className="tabs" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList className="tabs__list">
        {list.map((item, index) => (
          <Tab key={index} className="tabs__tab">Title {index + 1}</Tab>
        ))}
      </TabList>

      {list.map((item, index) => (
        <TabPanel key={index} className="tabs__panel">
          {item}
        </TabPanel>
      ))}
    </ReactTabs>
  );
}

export default Tabs;
