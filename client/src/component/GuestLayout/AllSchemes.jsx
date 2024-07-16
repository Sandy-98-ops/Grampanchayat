import React, { useEffect, useState } from 'react'
import { getAllSchemes } from '../../utils/api';
import { Button, Col, Container, Row } from 'react-bootstrap';

const AllSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

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

    const viewApplication = (scheme) => {
        setSelectedApplication(scheme);
        setShowModal(true);
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

                    <Row className="table-header pb-2 pt-2 GuestHeader">
                        <Col xs={12} sm={1} className="text-center">Sl. No.</Col>
                        <Col xs={12} sm={1} className="text-center">Name</Col>
                        <Col xs={12} sm={2} className="text-center">Benefits</Col>
                        <Col xs={12} sm={2} className="text-center">Department</Col>
                        <Col xs={12} sm={2} className="text-center">Required Documents</Col>
                        <Col xs={12} sm={2} className="text-center">Eligibility</Col>
                        <Col xs={12} sm={2} className="text-center">Link</Col>
                    </Row>

                    {schemes.map((scheme, index) => (
                        <Row key={index} className="table-row">
                            <Col xs={12} sm={1} className="text-center">{index + 1}</Col>
                            <Col xs={12} sm={1} className="text-center">{scheme.schemeName}</Col>
                            <Col xs={12} sm={2} className="text-center">{scheme.benefits}</Col>
                            <Col xs={12} sm={2} className="text-center">{scheme.department}</Col>
                            <Col xs={12} sm={2} className="text-center">{scheme.requiredDocuments}</Col>
                            <Col xs={12} sm={2} className="text-center">{scheme.eligibility}</Col>
                            <Col xs={12} sm={2} className="text-center">
                                <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary">Apply</Button>
                                </a>
                            </Col>
                        </Row>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllSchemes
