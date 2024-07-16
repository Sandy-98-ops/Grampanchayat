import React, { useEffect, useRef, useState } from 'react';
import { getApplicationByCitizen } from '../../utils/api';
import { useCitizenData } from '../../utils/Cookies';
import { Button, Container, Table } from 'react-bootstrap';
import PrintableApplication from './PrintableApplication'; // Adjust the path as needed
import { useReactToPrint } from 'react-to-print';

const ApplicationStatus = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const citizenData = useCitizenData();
    const [initialData, setInitialData] = useState(citizenData);

    const fileBasePath = 'http://localhost:8000/'; // Adjust based on your server configuration

    useEffect(() => {
        if (initialData.citizen) {
            getApplications();
        }
    }, [initialData]);

    const getApplications = async () => {
        try {
            const response = await getApplicationByCitizen(initialData.citizen._id);
            if (response.ok) {
                const data = await response.json();
                setApplications(data);
            } else {
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const printableRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printableRef.current,
        documentTitle: 'Application Details'
    });

    const handlePrintClick = (application) => {
        setSelectedApplication(application);
        setTimeout(handlePrint, 500); // Add a delay to ensure state updates before printing
    };

    return (
        <Container>
            {applications.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Father/Husband Name</th>
                                <th>Mother Name</th>
                                <th>Caste</th>
                                <th>Talathi Status</th>
                                <th>Circle Officer Status</th>
                                <th>Tahashildar Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application, index) => (
                                <tr key={index}>
                                    <td>{application.applicantName}</td>
                                    <td>{application.fatherHusbandName}</td>
                                    <td>{application.motherName}</td>
                                    <td>{application.caste}</td>
                                    <td style={{ color: application.staffRjected ? 'red' : 'black' }}>
                                        {application.staffApprove ? 'Approved by Talathi' : application.staffRjected ? 'Rejected by Talathi' : 'Pending'}
                                    </td>
                                    <td style={{ color: application.circleRejected ? 'red' : 'black' }}>
                                        {application.circleApprove ? 'Approved by Circle Officer' : application.circleRejected ? 'Rejected by Circle Officer' : application.staffRjected  ? '-' : 'Pending'}
                                    </td>
                                    <td style={{ color: application.rejected ? 'red' : 'black' }}>
                                        {application.approved ? 'Approved by Tahashildar' : application.rejected ? 'Rejected by Tahashildar' : application.circleRejected || application.staffRjected ?  '-' : 'Pending' }
                                    </td>
                                    {application.approved === true &&
                                        <td>
                                            <Button variant="secondary" onClick={() => handlePrintClick(application)}>Print</Button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {selectedApplication && (
                        <div style={{ display: 'none' }}>
                            <PrintableApplication ref={printableRef} application={selectedApplication} />
                        </div>
                    )}
                </>
            ) : (
                <p>No applications found.</p>
            )}
        </Container>
    );
};

export default ApplicationStatus;
