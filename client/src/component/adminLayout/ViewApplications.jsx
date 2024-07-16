import React, { useEffect, useState } from 'react'
import { approveApplication, getAllApplications, rejectApplication } from '../../utils/api';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

const ViewApplications = () => {

  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const fileBasePath = 'http://localhost:8000/'; // Adjust based on your server configuration

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    try {
      const response = await getAllApplications();
      if (response.ok) {
        const data = await response.json();
        // Filter applications where circleApprove or Reject is true
        const filteredApplications = data.filter(application => application.circleApprove && !application.approved && !application.rejected);
        setApplications(filteredApplications);
      } else {
        console.error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const viewApplication = (institute) => {
    setSelectedApplication(institute);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleApprove = async (institute) => {
    try {
      const response = await approveApplication(institute._id);
      if (response.ok) {
        alert("Status updated successfully");
        getApplications();
        handleClose();
      } else {
        console.error('Failed to approve institute');
      }
    } catch (error) {
      console.error('Error approving institute:', error);
    }
  };

  const handleReject = async (institute) => {
    try {
      const response = await rejectApplication(institute._id, institute);
      if (response.ok) {
        alert("Status updated successfully");
        getApplications();
        handleClose();
      } else {
        console.error('Failed to reject institute');
      }
    } catch (error) {
      console.error('Error rejecting institute:', error);
    }
  };



  return (
    <div>
      <Container className="container-1">
        <div className="list-container scrollable-list">
          <Row>
            <Col xs={12} sm={8}>
              <h2 className="mb-4">Applications</h2>
            </Col>
          </Row>

          <Row className="table-header pb-2 pt-2 GuestHeader">
            <Col xs={12} sm={1} className="text-center">Sl. No.</Col>
            <Col xs={12} sm={2} className="text-center">Applicant Name</Col>
            <Col xs={12} sm={1} className="text-center">Village</Col>
            <Col xs={12} sm={2} className="text-center">Remarks</Col>
            <Col xs={12} sm={2} className="text-center">Status</Col>
            <Col xs={12} sm={2} className="text-center">Actions</Col>
          </Row>

          {applications.map((application, index) => (
            <Row key={index} className="table-row">
              <Col xs={12} sm={1} className="text-center">{index + 1}</Col>
              <Col xs={12} sm={2} className="text-center">{application.applicantName}</Col>
              <Col xs={12} sm={1} className="text-center">{application.village}</Col>

              <Col sm={2}>
                <Form.Control as="textarea" rows={1} value={application.remarks} disabled />
              </Col>
              {application.rejected === true &&
                <Col xs={12} sm={2} className="text-center">Rejected</Col>
              }

              {application.circleApprove == true &&
                <Col xs={12} sm={2} className="text-center">Approved By Circle Officer</Col>
              }

              {(application.approved === false && application.staffApprove == false)
                && application.rejected === false
                &&
                <Col xs={12} sm={2} className="text-center">Pending</Col>
              }
              <Col xs={12} sm={2} className="text-center">
                <Button variant="success" onClick={() => viewApplication(application)}>View</Button>
              </Col>
              {
                application.circleApprove === true &&
                <Col xs={12} sm={1} className="text-center">
                  <Button variant="success" onClick={() => handleApprove(application)}>Approve</Button>
                </Col>
              }


              {
                application.circleApprove === true &&
                <Col xs={12} sm={2} className="text-center">
                  <Button variant="danger" onClick={() => handleReject(application)}>Reject</Button>
                </Col>
              }
            </Row>
          ))}
        </div>
      </Container>


      {selectedApplication && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Applicant Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group controlId="firstName" className="pb-4">
                    <Form.Label>Applicant Name</Form.Label>

                    <Form.Control
                      className="large-input"
                      type="text"
                      name="firstName"
                      value={selectedApplication.applicantName}
                      readOnly
                      placeholder="Name"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} sm={6}>
                  <Form.Group controlId="lastName" className="pb-4">
                    <Form.Label>Caste</Form.Label>

                    <Form.Control
                      className="large-input"
                      type="text"
                      name="caste"
                      value={selectedApplication.caste}
                      readOnly
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Col>

              </Row>
              <Form.Group controlId="address" className="pb-4">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className="large-input"
                  type="text"
                  name="address"
                  value={selectedApplication.address}
                  readOnly
                  placeholder="Address"
                />
              </Form.Group>

              <Row>
                <Col xs={12} sm={4}>
                  <Form.Group controlId="lastName" className="pb-4">
                    <Form.Label>Village</Form.Label>

                    <Form.Control
                      className="large-input"
                      type="text"
                      name="lastName"
                      value={selectedApplication.village}
                      readOnly
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} sm={4}>
                  <Form.Group controlId="course" className="pb-4">
                    <Form.Label>Taluk</Form.Label>
                    <Form.Control
                      className="large-input"
                      type="text"
                      name="taluka"
                      value={selectedApplication.taluka}
                      readOnly
                      placeholder="Taluk"
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} sm={4}>
                  <Form.Group controlId="from" className="pb-4">
                    <Form.Label>District</Form.Label>

                    <Form.Control
                      className="large-input"
                      type="text"
                      name="district"
                      value={selectedApplication.district}
                      readOnly
                      placeholder="From"
                    />
                  </Form.Group>
                </Col>

              </Row>

              <Row className="mt-3">
                <Col xs={12} sm={3}>
                  Aadhar Card:
                </Col>
                <Col xs={12} sm={9}>
                  {selectedApplication.aadharCard && (
                    <Button variant="link" onClick={() => window.open(`${fileBasePath}${selectedApplication.aadharCard}`, "_blank")}>
                      View Aadhar Card
                    </Button>
                  )}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={12} sm={3}>
                  Ration Card:
                </Col>
                <Col xs={12} sm={9}>
                  {selectedApplication.rationCard && (
                    <Button variant="link" onClick={() => window.open(`${fileBasePath}${selectedApplication.rationCard}`, "_blank")}>
                      View Ration Card
                    </Button>
                  )}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={12} sm={3}>
                  PAN Card:
                </Col>
                <Col xs={12} sm={9}>
                  {selectedApplication.panCard && (
                    <Button variant="link" onClick={() => window.open(`${fileBasePath}${selectedApplication.panCard}`, "_blank")}>
                      View PAN Card
                    </Button>
                  )}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={12} sm={3}>
                  Bank Statement:
                </Col>
                <Col xs={12} sm={9}>
                  {selectedApplication.bankStatement && (
                    <Button variant="link" onClick={() => window.open(`${fileBasePath}${selectedApplication.bankStatement}`, "_blank")}>
                      View Bank Statement
                    </Button>
                  )}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={12} sm={3}>
                  Address Prrof:
                </Col>
                <Col xs={12} sm={9}>
                  {selectedApplication.addressProof && (
                    <Button variant="link" onClick={() => window.open(`${fileBasePath}${selectedApplication.addressProof}`, "_blank")}>
                      View Address Proof
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>
  )
}

export default ViewApplications
