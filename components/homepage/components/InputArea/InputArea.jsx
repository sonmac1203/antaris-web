import React, { useState } from 'react';
import xml2js from 'xml2js';
import axios from 'axios';
import { InputField, SubmitButton } from '@/core/components/form';
import { colorTokens } from '@/core/design/';
import styles from './InputArea.module.css';

// study name, study des, notes, questions

export const InputArea = () => {
  const [researcherID, setResearcherID] = useState('');
  const [participantID, setParticipantID] = useState('');
  const [xmlFile, setXmlFile] = useState();
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

  const inputFields = [
    {
      label: 'Researcher ID',
      type: 'text',
      accept: null,
      name: 'researcherID',
      id: 'researcherID',
      callback: (e) => setResearcherID(e.target.value),
    },

    {
      label: 'Participant ID',
      type: 'text',
      accept: null,
      name: 'participantID',
      id: 'participantID',
      callback: (e) => setParticipantID(e.target.value),
    },

    {
      label: 'XML file',
      type: 'file',
      accept: 'text/xml',
      name: 'xmlFile',
      id: 'xmlFile',
      callback: handleXMLFile,
    },
  ];

  return (
    <div className={styles.Container}>
      {inputFields.map(({ label, type, accept, name, id, callback }, key) => (
        <InputField
          key={key}
          label={label}
          type={type}
          accept={accept}
          name={name}
          id={id}
          callback={callback}
        />
      ))}
      <div className={styles.ButtonsContainer}>
        <SubmitButton
          text='Parse'
          color={colorTokens.pastelGreen}
          callback={handleParseFile}
          disabled={parsedXml}
        />
        <SubmitButton
          text='Save'
          color={colorTokens.pastelPink}
          callback={handleSave}
          disabled={!parsedXml}
        />
      </div>
    </div>
  );
};
