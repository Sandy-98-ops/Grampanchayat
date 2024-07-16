import React, { useState } from 'react'
import { Alert, Button, Col, Form, FormGroup, Row, } from 'react-bootstrap'
import './AddSchema.css';
import { createScheme } from '../../utils/api';


const AddSchema = () => {

  const [validated, setValidated] = useState(false);
  const [signupErrors, setSignupErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [scheme, setScheme] = useState({
    schemeName: '',
    benefits: '',
    department: '',
    eligibility: '',
    requiredDocuments: '',
    applyLink: ''
  })

  const handleChange = (event) => {
    setScheme({ ...scheme, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);

      try {
        const response = await createScheme(scheme);
        if (response.ok) {
          setShowSuccessAlert(true);
          setShowErrorAlert(false);

          setScheme({
            schemeName: '',
            benefits: '',
            department: '',
            eligibility: '',
            requiredDocuments: '',
            applyLink: ''
          });
        } else {
          setShowErrorAlert(true);
          setShowSuccessAlert(false);

          const errorData = await response.json();
          setSignupErrors({ server: errorData.message });
        }
      } catch (err) {
        setShowSuccessAlert(false);

        setShowErrorAlert(true);
        setSignupErrors({ server: `An error occurred. Please try again. ${err.message}` });
      }


    }
  };


  return (
    <div style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Form className="stylef" onSubmit={handleSubmit}>
        <div className='headd'>
          <h1 className='headf'>Add Scheme</h1></div>
        {showSuccessAlert && (
          <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
            Scheme Added Successfully
          </Alert>
        )}

        {signupErrors.server && (
          <div className="alert alert-danger">
            {signupErrors.server}
          </div>
        )}
        <Row>
          <Form.Group controlId="Schemaname">
            <Col xs={12} sm={12}>
              <Form.Label>Schema Name</Form.Label>
              <Form.Control
                required
                type="text"
                name='schemeName'
                value={scheme.schemeName}
                onChange={handleChange}>
              </Form.Control>
            </Col>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="Schema Benifits">
            <Col xs={12} sm={12}>
              <Form.Label>Schema Benifits</Form.Label>
              <Form.Control
                required
                type="text"
                name='benefits'
                value={scheme.benefits}
                onChange={handleChange}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">

              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <FormGroup controlId='dept' className='pd-3'>
              <Form.Label>Department</Form.Label>
              <Form.Select
                required
                title="You must select course"
                feedbackType="invalid"
                name='department'
                value={scheme.department}
                onChange={handleChange}
              >
                <option value={""}>Choose...</option>
                <option value={"Gram Panchayat"}>Gram Panchayat</option>
                <option value={"Nagar Parishad"}>Nagar Parishad</option>
                <option value={"Central Health Department"}>Central Health Department</option>

              </Form.Select>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Form.Group controlId="eligibility">
            <Col xs={12} sm={12}>
              <Form.Label>Eligibility</Form.Label>
              <Form.Control
                required
                as="textarea"
                name='eligibility'
                value={scheme.eligibility}
                onChange={handleChange}
                rows={2}>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="redocument">
            <Col xs={12} sm={12}>
              <Form.Label>Required Documents</Form.Label>
              <Form.Control
                required
                as="textarea"
                name='requiredDocuments'
                value={scheme.requiredDocuments}
                onChange={handleChange}
                rows={2}>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="Applylink">
            <Col xs={12} sm={12}>
              <Form.Label>Apply Link</Form.Label>
              <Form.Control
                required
                type="text"
                name='applyLink'
                value={scheme.applyLink}
                onChange={handleChange}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>

        <Button className='mt-2 text-center' type="Submit">Submit</Button>

      </Form>

    </div>
  )
}

export default AddSchema
