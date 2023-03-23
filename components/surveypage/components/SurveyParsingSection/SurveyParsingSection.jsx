import { useState } from 'react';
import { useSurvey } from '@/core/hooks';
import { Row, Col, Form, Button, Accordion } from 'react-bootstrap';

export const SurveyParsingSection = () => {
  const {
    error,
    loading,
    setSurveyContent,
    sendSurvey,
    setSelectedParticipants,
  } = useSurvey();

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
    setSurveyContent(surveyContent);
    setSurveyItems(steps);
    setSelectedParticipants(selectedParticipants);
  };

  const handleSave = async () => await sendSurvey();

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
