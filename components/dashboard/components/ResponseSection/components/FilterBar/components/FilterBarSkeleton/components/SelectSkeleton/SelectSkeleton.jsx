import { Card } from 'react-bootstrap';

export const SelectSkeleton = ({ text, icon }) => {
  const paddingStyle = { padding: '0.45rem 0.75rem' };

  return (
    <Card className='w-100'>
      <Card.Body
        style={paddingStyle}
        className='d-flex align-item-center justify-content-between text-muted'
      >
        <Card.Text className='m-0'>{text}</Card.Text>
        <div>
          <i className={icon} />
        </div>
      </Card.Body>
    </Card>
  );
};
