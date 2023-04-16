import { Badge, ListGroup } from 'react-bootstrap';
import { getRelativeTime } from '@/core/utils';
import Link from 'next/link';

export const AnswerItem = ({ responseData }) => {
  const { content, responded_by: participant } = responseData;

  const answerText = content.answer_text;
  const responder = {
    fullname: `${participant.demographics.first_name} ${participant.demographics.last_name}`,
    id: participant.participant_identifier,
  };

  const skipBadge = (
    <Badge bg='warning' text='dark'>
      skipped
    </Badge>
  );

  const answer = answerText.toLowerCase() === 'skip' ? skipBadge : answerText;

  return (
    <ListGroup.Item className='d-flex flex-column px-0'>
      <h5 className='fs-6'>{answer}</h5>
      <div className='d-flex align-items-center gap-1 mb-1'>
        <h6
          className='fw-normal text-secondary m-0'
          style={{ fontSize: '13px' }}
        >
          by {getLink(responder.fullname, responder.id)}
        </h6>
        ·
        <h6
          className='fw-normal text-secondary m-0'
          style={{ fontSize: '13px' }}
        >
          {getRelativeTime(content.provided_at)}
        </h6>
      </div>
    </ListGroup.Item>
  );
};

const getLink = (text, id) => (
  <Link
    href={`re/dashboard/participants/${id}`}
    className='text-secondary text-decoration-none fw-semibold'
  >
    {text}
  </Link>
);
