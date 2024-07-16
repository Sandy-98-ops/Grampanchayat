import React, { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { addTalathi } from '../../utils/api';

const AddTalathi = () => {
    const [validated, setValidated] = useState(false);
    const [signupErrors, setSignupErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        village: '',
        contact: '',
        password: ''
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setValidated(true);

            try {
                const response = await addTalathi(data);
                if (response.ok) {
                    setShowSuccessAlert(true);
                    setShowErrorAlert(false);

                    setData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        village: '',
                        contact: '',
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


        }
    };

    return (
        <div style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Form className="formstyle" onSubmit={handleSubmit}>
                <div className='divhed'>
                    <h1 className='formhead'>Add Talathi</h1></div>
                {showSuccessAlert && (
                    <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                        Talathi Added Successfully
                    </Alert>
                )}

                {signupErrors.server && (
                    <div className="alert alert-danger">
                        {signupErrors.server}
                    </div>
                )}
                <Row>
                    <Col xs={12} sm={6}>
                        <Form.Group controlId="txtFirstName" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='firstName'
                                value={data.firstName}
                                onChange={handleChange}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Form.Group controlId="txtFirstName" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='lastName'
                                value={data.lastName}
                                onChange={handleChange}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6}>
                        <Form.Group controlId="midLastName">
                            <Form.Label>Village</Form.Label>
                            <Form.Control
                                type="text"
                                name='village'
                                value={data.village}
                                onChange={handleChange}
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">

                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>


                    <Col xs={12} sm={6}>

                        <Form.Group controlId="midLastName">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                name='contact'
                                value={data.contact}
                                onChange={handleChange}
                                pattern='{2,9}'
                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Form.Group controlId="midLastName" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name='email'
                            value={data.email}
                            onChange={handleChange}

                        >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>

                <Row>
                    <Form.Group controlId="txtLastName" >
                        <Col xs={12} sm={12}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                name='password'
                                value={data.password}
                                onChange={handleChange}

                            >
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please enter Password
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                </Row>

                <Button className='justify-content-center mt-4' type="Submit">Add</Button>

            </Form>
        </div>
    )
}

export default AddTalathi
