import React, { useState } from 'react';
import { Alert, Button, Col, Form, FormGroup, Modal, Row } from 'react-bootstrap';
import './IncomeStep2.css';
import { savePersonalDetails } from '../../utils/api';
import { useCitizenData } from '../../utils/Cookies';
import { useNavigate } from 'react-router-dom';

const IncomeStep2 = () => {

  const navigate = useNavigate();
  const { citizen: initialData } = useCitizenData();

  console.log(initialData)

  const [validated, setValidated] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [signupErrors, setSignupErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [formData, setFormData] = useState({
    citizen: initialData._id,
    district: '',
    taluka: '',
    village: '',
    applicantName: '',
    fatherHusbandName: '',
    motherName: '',
    caste: '',
    email: '',
    address: '',
    pinCode: '',
    mobile: '',
    rationCard: null,
    aadharCard: null,
    panCard: null,
    bankStatement: null,
    addressProof: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log("Entering")
    event.preventDefault();
    setValidated(true);

    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    try {

      const response = await savePersonalDetails(form);

      if (response.ok) {
        setShowSuccessAlert(true);
        setFormData({
          ...formData,
          district: '',
          taluka: '',
          village: '',
          applicantName: '',
          fatherHusbandName: '',
          motherName: '',
          caste: '',
          email: '',
          address: '',
          pinCode: '',
          mobile: '',
          rationCard: null,
          aadharCard: null,
          panCard: null,
          bankStatement: null,
          addressProof: null
        })
        setModalShow(false); // Close modal if open
        setShowErrorAlert(false); // Close error alert if open
        navigate('/citizen')
      } else {
        setShowErrorAlert(true);
        const errorData = await response.json();
        setSignupErrors({ server: errorData.message });
      }
    } catch (err) {
      setShowErrorAlert(true);
      setSignupErrors({ server: `An error occurred. Please try again. ${err.message}` });
    }

  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setSignupErrors({ ...signupErrors, [name]: 'Invalid file type. Only JPG, JPEG, PNG and PDF are allowed.' });
        setFormData({ ...formData, [name]: null });
        return;
      }

      if (file.size > maxSize) {
        setSignupErrors({ ...signupErrors, [name]: 'File size exceeds the limit of 2MB.' });
        setFormData({ ...formData, [name]: null });
        return;
      }

      if (name === 'photo') {
        const img = new Image();
        img.onload = () => {
          if (img.width !== img.height) {
            setSignupErrors({ ...signupErrors, [name]: 'Invalid photo dimensions. Photo should be square (passport size).' });
            setFormData({ ...formData, [name]: null });
          } else {
            const { [name]: removedError, ...remainingErrors } = signupErrors;
            setSignupErrors(remainingErrors);
            setFormData({ ...formData, [name]: file });
          }
        };
        img.src = URL.createObjectURL(file);
      } else {
        const { [name]: removedError, ...remainingErrors } = signupErrors;
        setSignupErrors(remainingErrors);
        setFormData({ ...formData, [name]: file });
      }
    }
  };

  const handleViewDocument = (document) => {
    if (document) {
      setSelectedDocument(URL.createObjectURL(document));
      setModalShow(true); // Open modal only when document is clicked
    }
  };

  const DocumentModal = ({ document, show, onHide }) => {
    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>View Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed src={document} type="application/pdf" width="100%" height="500px" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Form className="styleform" noValidate validated={validated} onSubmit={handleSubmit}>
        <div className='headdiv'>
          <h1 className='headform'>Personal Details</h1>

          {showSuccessAlert && (
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              Details submitted successfully!
            </Alert>
          )}
          {showErrorAlert && signupErrors.server && (
            <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
              {signupErrors.server}
            </Alert>
          )}
        </div>


        <div>
          <Row>
            <Col xs={12} sm={6}>
              <h3>Do you have a ration card?</h3>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="yes"
                    checked={selectedOption === 'yes'}
                    onChange={handleRadioChange}
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="no"
                    checked={selectedOption === 'no'}
                    onChange={handleRadioChange}
                  />
                  No
                </label>
              </div>
            </Col>
          </Row>
        </div>

        <Row>
          <Col xs={12} sm={4}>
            <Form.Group controlId="txtDistrict" className='pb-3'>
              <Form.Label>District</Form.Label>
              <Form.Control
                required
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a district.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={4}>
            <Form.Group controlId="taluka" className='pb-3'>
              <Form.Label>Taluka</Form.Label>
              <Form.Control
                required
                type="text"
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a taluka.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={4}>
            <Form.Group controlId="village" className='pb-3'>
              <Form.Label>Village</Form.Label>
              <Form.Control
                required
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a village.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            <Form.Group controlId="applicantname" className='pd-3'>
              <Form.Label>Applicant Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the applicant's name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={4}>
            <Form.Group controlId="afathername" className='pd-3'>
              <Form.Label>Father/Husband Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="fatherHusbandName"
                value={formData.fatherHusbandName}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the father/husband's name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={4}>
            <Form.Group controlId="amothername" className='pd-3'>
              <Form.Label>Mother Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the mother's name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            <FormGroup controlId='caste' className='pd-3'>
              <Form.Label>Caste</Form.Label>
              <Form.Control
                required
                type="text"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the caste.
              </Form.Control.Feedback>
            </FormGroup>
          </Col>
          <Col xs={12} sm={4}>
            <FormGroup controlId='email' className='pd-3'>
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email id.
              </Form.Control.Feedback>
            </FormGroup>
          </Col>
          <Col xs={12} sm={4}>
            <FormGroup controlId='address' className='pd-3'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the address.
              </Form.Control.Feedback>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={4}>
            <FormGroup controlId='pincode' className='pd-3'>
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                required
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the pin code.
              </Form.Control.Feedback>
            </FormGroup>
          </Col>
          <Col xs={12} sm={4}>
            <Form.Group controlId="txtFirstName" className='pd-3'>
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                required
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid mobile number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={3}>
            Ration Card:
          </Col>
          <Col xs={12} sm={7}>
            <Form.Group controlId="aadharCard" className="pb-4">
              <Form.Control
                type="file"
                name="rationCard"
                onChange={handleFileChange}
                isInvalid={!!signupErrors.rationCard}
              />
              <Form.Control.Feedback type="invalid">
                {signupErrors.rationCard}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={2}>
            {formData.rationCard
              && <Button onClick={() => handleViewDocument(formData.rationCard)}>View</Button>}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={3}>
            Aadhar:
          </Col>
          <Col xs={12} sm={7}>
            <Form.Group controlId="aadharCard" className="pb-4">
              <Form.Control
                type="file"
                name="aadharCard"
                onChange={handleFileChange}
                isInvalid={!!signupErrors.aadharCard}
              />
              <Form.Control.Feedback type="invalid">
                {signupErrors.aadharCard}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={2}>
            {formData.aadharCard
              && <Button onClick={() => handleViewDocument(formData.aadharCard)}>View</Button>}
          </Col>
        </Row>


        <Row>
          <Col xs={12} sm={3}>
            PAN Card:
          </Col>
          <Col xs={12} sm={7}>
            <Form.Group controlId="panCard" className="pb-4">
              <Form.Control
                type="file"
                name="panCard"
                onChange={handleFileChange}
                isInvalid={!!signupErrors.panCard}
              />
              <Form.Control.Feedback type="invalid">
                {signupErrors.panCard}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={2}>
            {formData.panCard
              && <Button onClick={() => handleViewDocument(formData.panCard)}>View</Button>}
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={3}>
            Address Proof:
          </Col>
          <Col xs={12} sm={7}>
            <Form.Group controlId="addressProof" className="pb-4">
              <Form.Control
                type="file"
                name="addressProof"
                onChange={handleFileChange}
                isInvalid={!!signupErrors.addressProof}
              />
              <Form.Control.Feedback type="invalid">
                {signupErrors.addressProof}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={2}>
            {formData.addressProof
              && <Button onClick={() => handleViewDocument(formData.addressProof)}>View</Button>}
          </Col>
        </Row>


        <Row>
          <Col xs={12} sm={3}>
            Bank Statements:
          </Col>
          <Col xs={12} sm={7}>
            <Form.Group controlId="bankStatement" className="pb-4">
              <Form.Control
                type="file"
                name="bankStatement"
                onChange={handleFileChange}
                isInvalid={!!signupErrors.bankStatement}
              />
              <Form.Control.Feedback type="invalid">
                {signupErrors.bankStatement}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={2}>
            {formData.bankStatement
              && <Button onClick={() => handleViewDocument(formData.bankStatement)}>View</Button>}
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Button variant="primary" className='custom-button' type="submit">Submit</Button>
        </Row>
      </Form >

      <DocumentModal
        document={selectedDocument}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div >

  );
};

export default IncomeStep2;