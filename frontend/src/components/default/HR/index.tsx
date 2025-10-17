import './style.scss';

interface HRProps {
  margin: number;
}

function HR({ margin }: HRProps) {
  return (
    <div className="hr" style={{ marginTop: margin, marginBottom: margin }} />
  );
}

export default HR;
