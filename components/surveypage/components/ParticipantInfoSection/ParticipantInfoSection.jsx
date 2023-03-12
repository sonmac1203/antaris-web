import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCredentials } from '@/core/hooks';

export const ParticipantInfoSection = ({
  participantIdentifier,
  participantData,
  setParticipantData,
}) => {
  const { accessToken, projectId } = useCredentials();

  useEffect(() => {
    if (!accessToken || !projectId) {
      return;
    }
    const fetchParticipantData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { project_id: projectId },
        };
        const { data } = await axios.get(
          `/api/participants1/${participantIdentifier}`,
          config
        );
        if (data.success) {
          setParticipantData(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchParticipantData();
  }, [accessToken, projectId]);

  return (
    <section>
      <h2>Participant information</h2>
      <span>
        Name:{' '}
        {participantData
          ? participantData.demographics.first_name +
            ' ' +
            participantData.demographics.last_name
          : '--'}
      </span>
      <br />
      <span>
        Email: {participantData ? participantData.demographics.email : '--'}
      </span>
    </section>
  );
};
