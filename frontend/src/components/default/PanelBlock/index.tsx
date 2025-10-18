import './style.scss';
import { ReactNode } from 'react';

interface PanelBlockProps {
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

function PanelBlock({ icon, title, onClick }: PanelBlockProps) {
  return (
    <div className="panel-block" onClick={onClick}>
      <div className="panel-block__icon">
        {icon}
      </div>
      <div className="panel-block__title">
        {title}
      </div>
    </div>
  );
}

export default PanelBlock;
