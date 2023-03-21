import React, { useEffect, useCallback } from 'react';
import { useSurvey, useMdh } from '@/core/hooks';
import { Table } from 'react-bootstrap';

export const ParticipantInfoSection = () => {
  const { participantsData } = useSurvey();
  const participantIds = participantsData.map((p) => p.participantIdentifier);
  const { participants, loading, error, fetchParticipants } = useMdh();

  const loadParticipantsFromMdh = useCallback(async () => {
    await fetchParticipants(participantIds);
  }, [fetchParticipants]);

  useEffect(() => {
    loadParticipantsFromMdh();
  }, []);

  if (error) {
    return <div>Error fetching participants</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2>Participant information from MDH</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p, k) => (
            <tr id={k} key={k}>
              <td>{k}</td>
              <td>
                {p.demographics.firstName} {p.demographics.lastName}
              </td>
              <td>{p.demographics.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};
