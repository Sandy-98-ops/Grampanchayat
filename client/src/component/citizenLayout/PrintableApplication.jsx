import React from 'react';
import { format } from 'date-fns'; // Import the format function from date-fns
import Logo from '../../utils/Logo.png'; // Adjust the path to your logo
import QrCode from '../../utils/QR_Code.png'; // Adjust the path to your QR code

const PrintableApplication = React.forwardRef((props, ref) => {
    const { application } = props;

    const todayDate = format(new Date(), 'dd/MM/yyyy');

    return (
        <div ref={ref} style={{ padding: '5mm', boxSizing: 'border-box', width: '210mm', height: '297mm', fontFamily: 'Arial, sans-serif' }}>
            <div style={{
                width: '100%',
                height: 'auto',
                padding: '5mm', // Reduced padding to ensure content starts from the left side
                border: '1px solid black',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>

                    <img src={Logo} alt="Karnataka Gov Logo" style={{ width: '100px', float: 'center', paddingRight: '40px' }} />
                </div>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <h6>GOVERNMENT OF KARNATAKA</h6>
                    <h6>REVENUE DEPARTMENT</h6>
                    <b>FORM-F Office of Tahsildar </b>
                    <b>Hukkeri Taluk</b>
                    <p>Date: {todayDate}</p>
                </div>
                <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>INCOME AND CASTE CERTIFICATE</h5>
                <p>Certificate No: <b>RD0038589473100</b></p>
                <p>This is to certify that Kumar. {application.applicantName} S/O Sri. {application.fatherHusbandName} (Father Name) and Smt. {application.motherName} (Mother Name)
                    residing at village Name, Hobli Name Hobli, Hukkeri Taluk, Belagavi District</p>
                <p>and his/her family does not come within the purview of creamy layer specified in Government Order No.:Himvaka 148 BCA 2015; Dt: 04.06.2015. Either the applicant or his/her parents/guardian/spouse is not a class-I or class-II officer in the service of the Government;</p>
                <p style={{ textAlign: 'center' }}>OR</p>
                <p>Does not hold an equivalent post in Public Sector Undertaking; OR Is not an employee under a Private Employer and drawing a salary which is not less than that of a Class-II Officer (initial stage of the pay scale of Rs.22800-43200/-)</p>
                <p style={{ textAlign: 'center' }}>OR</p>
                <p>His/Her Father, Mother/Guardian's Gross Annual Income does not exceed Rs.8.00 lakhs (Rs. Eight Lakhs)</p>
                <p>His/her parents/Guardian/spouse is not holding 10 units of Agricultural land or such of those not holding more than 20 acres of plantation land as specified in the Karnataka Land Reforms Act.</p>
                <p>Certified that Kumar. {application.applicantName} S/O Sri. {application.fatherHusbandName} residing at {application.residenceAddress}, of {application.villageWard}, {application.hobli} Hobli, {application.taluk} Taluk, {application.district} District belongs to caste {application.caste}&nbsp;
                of the Backward Classes and certified that his/her family annual income is Rs. {application.annualIncome} (Category {application.category}).</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>Please, verify the authenticity of this certificate by visiting www.nadakacheri.karnataka.gov.in & entering certificate Number or by SMSing KA NK to 161.</p>
                    <img src={QrCode} alt="QR Code" style={{ width: '100px', float: 'right' }} />
                </div>
                <div style={{ textAlign: 'right', marginTop: '20px', paddingRight: '40px' }}>
                    <strong>Name: {application.tahsildarName}</strong><br />
                    Tahsildar<br />
                    Hukkeri Taluk<br />
                    {application.district} District
                </div>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>This Certificate can be Verified at www.nadakacheri.karnataka.gov.in</p>
            </div>
        </div>
    );
});

export default PrintableApplication;
