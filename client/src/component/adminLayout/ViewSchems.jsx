import React, { useEffect, useState } from 'react';
import { deleteSchemeById, getAllSchemes, updateSchemeById } from '../../utils/api'; // Ensure you have an updateSchemeById function in your API utilities
import { Button, Col, Container, Modal, Row, Form, Alert } from 'react-bootstrap';

const ViewSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [signupErrors, setSignupErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        getSchemes();
    }, []);

    const getSchemes = async () => {
        try {
            const response = await getAllSchemes();
            if (response.ok) {
                const data = await response.json();
                setSchemes(data);
            } else {
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const handleEdit = (scheme) => {
        setSelectedScheme(scheme);
        setShowModal(true);
    };

    const handleDelete = async (schemeId) => {

        try {
            const response = await deleteSchemeById(schemeId);
            if (response.ok) {
                alert("Scheme Deleted Successfully");
                getSchemes();
            } else {
                setShowErrorAlert(true);
                setSignupErrors({ server: `An error occurred. Please try again.` });
            }

        } catch (err) {
            setShowErrorAlert(true);
            setSignupErrors({ server: `An error occurred. Please try again. ${err.message}` });
        }
    }

    const handleModalClose = () => {
        setSelectedScheme(null);
        setShowModal(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateSchemeById(selectedScheme._id, selectedScheme);
            if (response.ok) {
                // Update the scheme in the state
                setSchemes(prevSchemes =>
                    prevSchemes.map(scheme =>
                        scheme._id === selectedScheme._id ? selectedScheme : scheme
                    )
                );
                setShowSuccessAlert(true);
                setTimeout(() => setShowSuccessAlert(false), 3000);
                handleModalClose();
            } else {
                setShowErrorAlert(true);
                setSignupErrors({ server: `An error occurred. Please try again.` });
            }
        } catch (err) {
            setShowErrorAlert(true);
            setSignupErrors({ server: `An error occurred. Please try again. ${err.message}` });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedScheme(prevScheme => ({
            ...prevScheme,
            [name]: value
        }));
    };

    return (
        <div>
            <Container className="container-1">
                <div className="list-container scrollable-list">
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">Schemes</h2>
                        </Col>
                    </Row>

                    {showSuccessAlert && (
                        <Alert variant="success">Scheme updated successfully!</Alert>
                    )}
                    {showErrorAlert && signupErrors.server && (
                        <Alert variant="danger">{signupErrors.server}</Alert>
                    )}

                    <Row className="table-header pb-2 pt-2 GuestHeader">
                        <Col xs={12} sm={1} className="text-center">Sl. No.</Col>
                        <Col xs={12} sm={1} className="text-center">Name</Col>
                        <Col xs={12} sm={2} className="text-center">Benefits</Col>
                        <Col xs={12} sm={2} className="text-center">Department</Col>
                        <Col xs={12} sm={3} className="text-center">Required Documents</Col>
                        <Col xs={12} sm={3} className="text-center">Actions</Col>
                    </Row>

                    {schemes.map((scheme, index) => (
                        <Row key={index} className="table-row">
                            <Col xs={12} sm={1} className="text-center">{index + 1}</Col>
                            <Col xs={12} sm={1} className="text-center">{scheme.schemeName}</Col>
                            <Col xs={12} sm={2} className="text-center">{scheme.benefits}</Col>
                            <Col xs={12} sm={2} className="text-center">{scheme.department}</Col>
                            <Col xs={12} sm={3} className="text-center">{scheme.requiredDocuments}</Col>
                            <Col xs={12} sm={3} className="text-center">
                                <Button variant="warning" onClick={() => handleEdit(scheme)}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(scheme._id)}>Delete</Button>
                            </Col>
                        </Row>
                    ))}
                </div>
            </Container>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Scheme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedScheme && (
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group controlId="schemeName">
                                <Form.Label>Scheme Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="schemeName"
                                    value={selectedScheme.schemeName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="benefits">
                                <Form.Label>Benefits</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="benefits"
                                    value={selectedScheme.benefits}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="department">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="department"
                                    value={selectedScheme.department}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="requiredDocuments">
                                <Form.Label>Required Documents</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="requiredDocuments"
                                    value={selectedScheme.requiredDocuments}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="eligibility">
                                <Form.Label>Eligibility</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="eligibility"
                                    value={selectedScheme.eligibility}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-center mt-4">
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </div>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ViewSchemes;
