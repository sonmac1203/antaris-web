import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import { useCredentials } from '@/core/hooks';
import { useSurvey } from '@/core/hooks';

export const SurveyParsingSection = () => {
  const {
    error,
    loading,
    surveyData,
    setSurveyContent,
    sendSurvey,
    setSelectedParticipants,
  } = useSurvey();

  const { surveyID, surveyName, surveyDisplayName, surveyDescription } =
    surveyData;

  const { projectId } = useCredentials();
  const [surveyItems, setSurveyItems] = useState([]);

  const selectedParticipants = ['MDH-0224-3069', 'MDH-5747-4140'];

  const onSurveyTemplateSubmit = (e) => {
    e.preventDefault();
    const { steps } = JSON.parse(e.target[0].value);

    const surveyContent = steps.map((question) => {
      return {
        type: question.type,
        text: question.text,
        title: question.title,
        identifier: question.identifier,
      };
    });
    console.log(surveyContent);
    setSurveyContent(surveyContent);
    setSurveyItems(steps);
    setSelectedParticipants(selectedParticipants);
  };

  const handleSave = async () => await sendSurvey();

  // const handleSave = async () => {
  //   try {
  //     const { data: firstResponse } = await axios.post(
  //       '/api/store_participant',
  //       participantData
  //     );

  //     if (!firstResponse.success) {
  //       return;
  //     }

  //     const surveyContent = surveyItems.map((item) => ({
  //       ...item,
  //       status: 'incomplete',
  //     }));

  //     console.log(surveyContent);

  //     const { data: secondResponse } = await axios.post(
  //       '/api/surveys/send_survey',
  //       {
  //         project_id: projectId,
  //         survey_id: surveyID,
  //         participant_identifier: participantIdentifier,
  //         secondary_identifier: participantData.secondary_identifier,
  //         survey_name: surveyName,
  //         survey_display_name: surveyDisplayName,
  //         survey_description: surveyDescription,
  //         status: status,
  //         due_date: dueDate,
  //         content: surveyContent,
  //       }
  //     );

  //     if (!secondResponse.success) {
  //       return;
  //     }
  //     console.log(firstResponse);
  //     console.log(secondResponse);
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }
  // };

  return (
    <section>
      <h2>Survey parsing</h2>
      <Row>
        <Col>
          <Form onSubmit={onSurveyTemplateSubmit}>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>
                <b>Survey template</b>
              </Form.Label>
              <Form.Control as='textarea' rows={20} />
              <Form.Text className='text-muted'>
                Use survey JSON template from MyDataHelps
              </Form.Text>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Parse
            </Button>
          </Form>
          <Button className='mt-3' onClick={handleSave}>
            {loading ? 'Sending...' : 'Send to participants'}
          </Button>
          {error && <div>THERE HAS BEEN AN ERROR</div>}
        </Col>
        <Col>
          <div className='mb-2'>
            <b>Survey Preview</b>
          </div>
          {surveyItems.length > 0 ? (
            <Accordion>
              {surveyItems.map((item, key) => {
                const { text, identifier, answerFormat } = item;
                return (
                  <Accordion.Item eventKey={key} key={key}>
                    <Accordion.Header>
                      # {key + 1}: {text}
                    </Accordion.Header>
                    <Accordion.Body>
                      ID: {identifier}
                      <br />
                      Answer format: {answerFormat.type}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          ) : (
            'No survey is parsed yet.'
          )}
        </Col>
      </Row>
    </section>
  );
};
