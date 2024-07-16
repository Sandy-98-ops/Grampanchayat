import React from 'react'
import income1 from '../income1.PNG';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const IncomeStep1 = () => {

  const navigate = useNavigate();

  const moveNext = () => {
    navigate('/citizen/step2');
  }


  return (
    <div style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Form className='tableform'>
        <table border={1}>
          <th>Income Certificate</th>
          <tr><img
            src={income1}
            width="90%"
            height="90%"
            className="d-inline-block align-top"
            alt="Logo"
          /></tr>
          <tbody className='tbody'>
            <tr>
              <th>*Note</th>
            </tr>
            <tr lassName='tbody' > <td>Documents are mandatory</td></tr>
            <tr><td>All supporting documents which are to be uploaded should be valid PDF file. (Each PDF file size should be less than 200 kb )</td></tr>
            <tr><td>If you want Certificate in Kannada OR English Select Language Option in top Menu</td></tr>
            <tr><td>Please be prepared with the scaned copies of the above documents and be ready for online payment</td></tr>
            <tr><td>Applicant Photo should be valid .jpg or .png file. (with maximum size of 50 kb )</td></tr>
            <tr><center>
              <button className='proceed' type="button" onClick={moveNext}>Proceed</button></center>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
  )
}

export default IncomeStep1
