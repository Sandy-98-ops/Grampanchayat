import React, { useEffect, useState } from 'react'
import { getAllTalathis } from '../../utils/api';
import { Button, Col, Container, Row } from 'react-bootstrap';

const ViewTalathis = () => {
    const [circleOfficers, setCircleOfficers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        getCircleOfficers();
    }, []);

    const getCircleOfficers = async () => {
        try {
            const response = await getAllTalathis();
            if (response.ok) {
                const data = await response.json();
                setCircleOfficers(data);
            } else {
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const viewApplication = (circleOfficer) => {
        setSelectedApplication(circleOfficer);
        setShowModal(true);
    };

    return (
        <div>
            <Container className="container-1">
                <div className="list-container scrollable-list">
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">Talathi List</h2>
                        </Col>
                    </Row>

                    <Row className="table-header pb-2 pt-2 GuestHeader">
                        <Col xs={12} sm={1} className="text-center">Sl. No.</Col>
                        <Col xs={12} sm={2} className="text-center">Name</Col>
                        <Col xs={12} sm={2} className="text-center">Village</Col>
                        <Col xs={12} sm={4} className="text-center">Email</Col>
                        <Col xs={12} sm={3} className="text-center">Contact</Col>
                    </Row>

                    {circleOfficers.map((circleOfficer, index) => (
                        <Row key={index} className="table-row">
                            <Col xs={12} sm={1} className="text-center">{index + 1}</Col>
                            <Col xs={12} sm={2} className="text-center">{circleOfficer.firstName}  {circleOfficer.lastName}</Col>
                            <Col xs={12} sm={2} className="text-center">{circleOfficer.village}</Col>
                            <Col xs={12} sm={4} className="text-center">{circleOfficer.email}</Col>
                            <Col xs={12} sm={3} className="text-center">{circleOfficer.contact}</Col>

                        </Row>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default ViewTalathis
