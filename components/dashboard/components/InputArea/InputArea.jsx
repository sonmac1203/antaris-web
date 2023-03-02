import React, { useEffect, useState } from 'react';
import xml2js from 'xml2js';
import axios from 'axios';
import { InputField, SubmitButton } from '@/core/components/form';
import { colorTokens } from '@/core/design/';
import styles from './InputArea.module.css';

// study name, study des, notes, questions

function getRawText(text) {
  const rawText = text.replace(/\r|\n/g, '');
  return rawText;
}

function populateQuestions(studyData) {
  const questionDefinitionArray =
    studyData['ODM']['Study'][0]['MetaDataVersion'][0]['ItemDef'];
  const questions = questionDefinitionArray.map(
    ({ $: questionInfo, Question }) => {
      const { OID, Name, DataType } = questionInfo;
      const [question] = Question;
      return {
        name: Name,
        questionID: OID,
        dataType: DataType,
        text: getRawText(question.TranslatedText[0]),
      };
    }
  );

  return questions;
}

export const InputArea = ({ researcherID }) => {
  const [participantIDs, setParticipantIDs] = useState('');
  const [studyID, setStudyID] = useState('');
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
      participantIDs: participantIDs,
      studyID: studyID,
      studyData: populateXml(parsedXml),
    });

    console.log(response.data);
  };

  const inputFields = [
    {
      label: 'Participant IDs',
      type: 'text',
      accept: null,
      name: 'participantIDs',
      id: 'participantIDs',
      callback: (e) => setParticipantIDs(e.target.value),
    },
    {
      label: 'Study ID',
      type: 'text',
      accept: null,
      name: 'studyID',
      id: 'studyID',
      callback: (e) => setStudyID(e.target.value),
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

const populateXml = (parsedXml) => {
  const study = parsedXml['ODM']['Study'][0];

  const globalVariables = {
    study_name: study['GlobalVariables'][0]['StudyName'][0],
    // study_description: study['GlobalVariables'][0]['StudyDescription'][0],
    protocol_name: study['GlobalVariables'][0]['ProtocolName'][0],
  };

  const itemDef = study['MetaDataVersion'][0]['ItemDef'];

  const questions = itemDef.map((item, key) => {
    const { OID, Name, DataType } = item['$'];
    const [question] = item['Question'];
    return {
      name: Name,
      question_id: OID,
      data_type: DataType,
      text: getRawText(question.TranslatedText[0]),
    };
  });

  const metaData = {
    questions: questions,
  };

  return {
    global_variables: globalVariables,
    meta_data: metaData,
  };
};
