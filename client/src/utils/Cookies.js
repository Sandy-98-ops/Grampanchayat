import { useState } from 'react';
import Cookies from 'js-cookie';

const citizenData = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    gender: '',
    mobile: '',
    password: ''
};

export const useCitizenData = () => {
    const [citizen, setCitizen] = useState(() => {
        const studData = Cookies.get('citizenData');
        if (studData) {
            try {
                console.log("Got Cookie and returning back")
                return JSON.parse(studData);
            } catch (error) {
                console.error('Error parsing studentData cookie:', error);
                return citizenData; // Fallback to default if parsing fails
            }
        }
        return citizenData; // Return default if cookie doesn't exist
    });

    const updateUserData = (newUserData) => {
        setCitizen(newUserData);
        Cookies.set('studentData', JSON.stringify(newUserData));
    };

    return { citizen, updateUserData };
};


const adminData = {
    firstName: '',
    lastName: '',
    email: '',
    taluk: '',
    gender: '',
    password: ''
};

export const useAdminData = () => {
    const [admin, setAdmin] = useState(() => {
        const data = Cookies.get('adminData');
        if (data) {
            try {
                console.log("Got Cookie and returning back")
                return JSON.parse(data);
            } catch (error) {
                console.error('Error parsing studentData cookie:', error);
                return adminData; // Fallback to default if parsing fails
            }
        }
        return adminData; // Return default if cookie doesn't exist
    });

    const updateAdminData = (newUserData) => {
        setAdmin(newUserData);
        Cookies.set('adminData', JSON.stringify(newUserData));
    };

    return { admin, setAdmin };
};



const staffData = {
    firstName: '',
    lastName: '',
    email: '',
    village: '',
    taluk: '',
    gender: '',
    password: ''
};

export const useStaffData = () => {
    const [staff, setStaff] = useState(() => {
        const data = Cookies.get('staffData');
        if (data) {
            try {
                console.log("Got Cookie and returning back")
                return JSON.parse(data);
            } catch (error) {
                console.error('Error parsing studentData cookie:', error);
                return staffData; // Fallback to default if parsing fails
            }
        }
        return staffData; // Return default if cookie doesn't exist
    });

    const updateInstituteData = (newUserData) => {
        setStaff(newUserData);
        Cookies.set('staffData', JSON.stringify(newUserData));
    };

    return { staff, setStaff };
};



const talathiData = {
    firstName: '',
    lastName: '',
    email: '',
    village: '',
    taluk: '',
    gender: '',
    password: ''
};

export const useTalathiData = () => {
    const [talathi, setTalathi] = useState(() => {
        const data = Cookies.get('talathiData');
        if (data) {
            try {
                console.log("Got Cookie and returning back")
                return JSON.parse(data);
            } catch (error) {
                console.error('Error parsing studentData cookie:', error);
                return talathiData; // Fallback to default if parsing fails
            }
        }
        return talathiData; // Return default if cookie doesn't exist
    });

    const updateInstituteData = (newUserData) => {
        setTalathi(newUserData);
        Cookies.set('staffData', JSON.stringify(newUserData));
    };

    return { talathi, setTalathi };
};



const circleOfficerData = {
    firstName: '',
    lastName: '',
    email: '',
    circle: '',
    gender: '',
    password: ''
};

export const useCircleOfficerData = () => {
    const [circleOfficer, setcircleOfficer] = useState(() => {
        const data = Cookies.get('circleOfficerData');
        if (data) {
            try {
                console.log("Got Cookie and returning back")
                return JSON.parse(data);
            } catch (error) {
                console.error('Error parsing studentData cookie:', error);
                return circleOfficerData; // Fallback to default if parsing fails
            }
        }
        return circleOfficerData; // Return default if cookie doesn't exist
    });

    const updateInstituteData = (newUserData) => {
        setcircleOfficer(newUserData);
        Cookies.set('circleOfficerData', JSON.stringify(newUserData));
    };

    return { circleOfficer, setcircleOfficer };
};
