import { useState, useRef, useEffect } from 'react';
import { useSurvey } from '@/lib/re/surveyoverview';
import { Button, Modal, Row, Col, Form, Accordion } from 'react-bootstrap';
import styles from './SurveyImportModal.module.css';

export const SurveyImportModal = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const [surveyItems, setSurveyItems] = useState([]);
  const surveyTemplateRef = useRef(null);

  const {
    saveSurvey,
    refreshData,
    error: saveError,
    loading,
    success,
    surveyData,
  } = useSurvey();

  const handleTemplatePasted = () => {
    setError(false);
    const template = surveyTemplateRef.current.value;
    if (!template || template.length === 0) {
      return setSurveyItems([]);
    }
    try {
      const { steps } = JSON.parse(template);
      setSurveyItems(steps);
    } catch (err) {
      setError(true);
    }
  };

  const handleClose = () => {
    surveyTemplateRef.current = {};
    setShow(false);
    setError(false);
    setSurveyItems([]);
  };

  const handleImport = async () => {
    const surveyQuestions = surveyItems.map((question) => {
      return {
        type: question.type,
        text: question.text,
        title: question.title,
        identifier: question.identifier,
      };
    });
    await saveSurvey(surveyQuestions);
  };

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        handleClose();
        refreshData();
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  return (
    <>
      <Button
        variant={surveyData?.content ? 'secondary' : 'primary'}
        onClick={() => setShow(true)}
        disabled={surveyData?.content}
      >
        {surveyData?.content ? (
          'Imported'
        ) : (
          <>
            <i className='fa-solid fa-plus me-2' />
            Import
          </>
        )}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={styles.Modal}
        aria-labelledby='example-custom-modal-styling-title'
        fullscreen='md-down'
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Import survey
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg='6'>
              <Form>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlTextarea1'
                >
                  <Form.Label className={styles.Title}>
                    Survey template
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={16}
                    placeholder='Use survey JSON template from MyDataHelps'
                    onChange={handleTemplatePasted}
                    ref={surveyTemplateRef}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col lg='6'>
              <div className={styles.Title}>Survey preview</div>
              {error ? (
                'Please check your template again.'
              ) : surveyItems.length > 0 ? (
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
                'Your survey will be shown here.'
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleImport}
            disabled={loading || success}
          >
            {saveError
              ? 'Failed'
              : loading
              ? 'Importing...'
              : success
              ? 'Imported'
              : 'Import'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

function closeModalAfterDelay(delayInMs, onSuccess) {
  setTimeout(() => {
    onSuccess();
  }, delayInMs);
}
