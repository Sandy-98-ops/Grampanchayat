import React from 'react'
import { Button, Col, Container, FormGroup, Row } from 'react-bootstrap'
import { Form } from 'react-router-dom'

const Services = () => {
    return (
        <div>
            <Container className="">
                <Row>
                    <Col xs={12} sm={9}>
                        <h2 className="mb-4">List of Services</h2>
                    </Col>
                    <Col xs={12} sm={3}>
                    <Button type="Submit">Add New</Button>
                    </Col>
                </Row>

                <Row className="table-header pb-2 pt-2 GuestHeader">
                        <Col xs={12} sm={1} className="text-center">
                            Sl. No.
                        </Col>
                        <Col xs={12} sm={3} className="text-center">
                            Services Name
                        </Col>
                        
                        <Col xs={12} sm={3} className="text-center">
                            Actions
                        </Col>
                    </Row>
            </Container>

        </div>
    )
}

export default Services
