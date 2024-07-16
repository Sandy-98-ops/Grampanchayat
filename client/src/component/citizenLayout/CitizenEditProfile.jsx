import React, { useState } from 'react'
import { Alert, Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { updateCitizenData } from '../../utils/api';
import { useCitizenData } from '../../utils/Cookies';

const CitizenEditProfile = () => {
    const [validated, setValidated] = useState(false);

    const { citizen: initialData } = useCitizenData();

    const [citizenData, setCitizenData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        gender: '',
        mobile: '',
    });

    const [signupErrors, setSignupErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCitizenData({ ...citizenData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        setValidated(true);

        try {
            const response = await updateCitizenData(initialData._id, citizenData);
            if (response.ok) {
                setShowSuccessAlert(true);
                setShowErrorAlert(false);

                setCitizenData({
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    email: '',
                    gender: '',
                    mobile: '',
                    password: ''
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
    };

    return (
        <div style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Form className="formstyle" noValidate validated={validated} onSubmit={handleSubmit}>
                <div className='divhed'>
                    <h1 className='formhead'>Edit Details</h1>
                </div>
                {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Profile Updated successful!
                    </Alert>
                )}

                {signupErrors.server && (
                    <div className="alert alert-danger">
                        {signupErrors.server}
                    </div>
                )}
                <Row>
                    <Col xs={12} sm={4}>
                        <Form.Group controlId="txtFirstName" className='pb-3'>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='firstName'
                                value={citizenData.firstName}
                                onChange={handleChange}
                                placeholder="First name"
                                pattern='[A-Za-z]{2,50}' // Corrected pattern
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={4}>
                        <Form.Group controlId="midLastName" className='pb-3'>
                            <Form.Label>Middle name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='middleName'
                                value={citizenData.middleName}
                                onChange={handleChange}
                                placeholder="Middle Name"
                                pattern='[A-Za-z]{0,50}' // Corrected pattern
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid middle name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={4}>
                        <Form.Group controlId="txtLastName" className='pb-3'>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='lastName'
                                value={citizenData.lastName}
                                onChange={handleChange}
                                placeholder="Last name"
                                pattern='[A-Za-z]{2,50}' // Corrected pattern
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4}>
                        <Form.Group controlId="txtEmail" className='pd-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email" // Corrected type
                                name='email'
                                value={citizenData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            <Form.Control.Feedback type="invalid">
                                Enter a valid email id.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={4}>
                        <FormGroup controlId='rdoGender' className='pd-3'>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                required
                                name='gender'
                                value={citizenData.gender}
                                onChange={handleChange}
                            >
                                <option value={""}>Choose...</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select a gender.
                            </Form.Control.Feedback>
                        </FormGroup>
                    </Col>

                    <Col xs={12} sm={4}>
                        <Form.Group controlId="txtMobile" className='pd-3'>
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='mobile'
                                value={citizenData.mobile}
                                onChange={handleChange}
                                placeholder="Mobile no"
                                pattern='[0-9]{10}' // Corrected pattern
                            />
                            <Form.Control.Feedback type="invalid">
                                Enter a valid mobile number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Button className='mt-2 text-center' type="submit">Update</Button>
            </Form>
        </div>
    );
}

export default CitizenEditProfile
