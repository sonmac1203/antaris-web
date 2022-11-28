import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { InputArea } from './components';
import styles from './Dashboard.module.css';

export const Dashboard = ({ data }) => {
  const router = useRouter();
  const { name, antaris_id } = data;
  const [participantList, setParticipantList] = useState([]);

  const onSignOut = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        '/api/participants?fields=name,antaris_id'
      );

      if (response.data.success) {
        setParticipantList(response.data.participants_data);
      }
    })();
  }, []);

  return (
    <>
      <div className={styles.ResearcherDataContainer}>
        <button onClick={onSignOut}>Sign out</button>
        <div>
          <b>Name:</b> {name}
        </div>
        <div>
          <b>ID:</b> {antaris_id}
        </div>
        {participantList.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Antaris ID</th>
              </tr>
            </thead>
            <tbody>
              {participantList.map(({ name, antaris_id }, k) => (
                <tr key={k}>
                  <td>{name}</td>
                  <td>{antaris_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <InputArea researcherID={antaris_id} />
    </>
  );
};
