import React, { useState } from 'react';
import xml2js from 'xml2js';
import axios from 'axios';
import styles from './InputArea.module.css';

// study name, study des, notes, questions

export const InputArea = () => {
  const [researcherID, setResearcherID] = useState('');
  const [participantID, setParticipantID] = useState('');
  const [xmlFile, setXmlFile] = useState();
  // const [xmlText, setXmlText] = useState('');
  const [parsedXml, setParsedXml] = useState();
  const [parsing, setParsing] = useState(false);

  const handleXMLFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setXmlFile(file);
  };

  const handleParseFile = () => {
    const reader = new FileReader();
    const parser = new xml2js.Parser();
    setParsing(true);
    reader.onload = async (e) => {
      const xmlText = e.target.result;
      parser.parseString(xmlText, (err, res) => {
        if (!err) {
          setParsedXml(res);
        }
      });
    };
    reader.readAsText(xmlFile);
    setParsing(false);
  };

  const handleSave = async () => {
    const response = await axios.post('/api/create_survey', {
      researcherID: researcherID,
      participantID: participantID,
      studyData: parsedXml,
    });

    console.log(response.data);
  };

  return (
    <div className={styles.Container}>
      <div>
        <label htmlFor='researcherID' className={styles.InputLabel}>
          Researcher ID
        </label>
        <input
          type='text'
          id='researcherID'
          name='researcherID'
          className={styles.TextInputField}
          onChange={(e) => setResearcherID(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='participantID' className={styles.InputLabel}>
          Participant ID
        </label>
        <input
          type='text'
          id='participantID'
          name='participantID'
          className={styles.TextInputField}
          onChange={(e) => setParticipantID(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='xmlFile' className={styles.InputLabel}>
          XML file
        </label>
        <input
          type='file'
          id='xmlFile'
          name='xmlFile'
          accept='text/xml'
          className={styles.FileInputField}
          onChange={handleXMLFile}
        />
      </div>
      <div className={styles.ButtonsContainer}>
        <button
          className={styles.SaveButton}
          onClick={handleParseFile}
          disabled={parsedXml}
        >
          {!parsedXml ? 'Parse' : 'Parsed'}
        </button>
        <button
          className={styles.ParseButton}
          onClick={handleSave}
          disabled={!parsedXml}
        >
          Save
        </button>
      </div>
    </div>
  );
};
