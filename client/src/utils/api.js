const API_URL = 'http://localhost:8000';

const apiRequest = async (endpoint, method = 'GET', data = null) => {
    const url = `${API_URL}${endpoint}`;
    const options = { method };

    if (data) {
        options.body = data instanceof FormData ? data : JSON.stringify(data);
        if (!(data instanceof FormData)) {
            options.headers = { 'Content-Type': 'application/json' };
        }
    }

    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        throw new Error(`An error occurred while processing your request : ${error}`);
    }
};


export const citizenRegister = (signupData) => {
    return apiRequest('/citizen/create', 'POST',
        signupData);
};

export const updateCitizenData = (id, data) => {
    return apiRequest(`/citizen/updateById/${id}`, 'PUT', data);
}

export const changeCitizenPassword = (id, data) => {
    return apiRequest(`/citizen/changePassword/${id}`, 'PUT', data);
}

export const citizenLogin = (loginData) => {
    return apiRequest('/citizen/login', 'POST', loginData);
}

export const adminRegister = (data) => {
    return apiRequest('/admin/create', 'POST', data);

}
export const adminLogin = (loginData) => {
    return apiRequest('/admin/login', 'POST', loginData);
}

export const addCircleOfficer = (data) => {
    return apiRequest('/circleOfficer/create', 'POST', data)
}

export const circleOfficerLogin = (loginData) => {
    return apiRequest('/circleOfficer/login', 'POST', loginData)
}

export const getAllCircleOfficers = () => {
    return apiRequest('/circleOfficer/', 'GET');
}

export const getAllTalathis = () => {
    return apiRequest('/talathi/', 'GET');
}

export const getAllStaff = () => {
    return apiRequest('/staff/', 'GET');
}

export const createScheme = (data) => {
    return apiRequest('/scheme/create', 'POST', data);
}

export const getAllSchemes = () => {
    return apiRequest('/scheme/', 'GET');
}

export const updateSchemeById = (id, data) => {
    return apiRequest(`/scheme/updateById/${id}`, 'PUT', data);
}

export const deleteSchemeById = (id) => {
    return apiRequest(`/scheme/deleteById/${id}`, 'DELETE');
}

export const addStaff = (data) => {
    return apiRequest('/staff/create', 'POST', data);
}

export const staffLogin = (loginData) => {
    return apiRequest('/staff/login', 'POST', loginData);
}

export const addTalathi = (data) => {
    return apiRequest('/talathi/create', 'POST', data);
}

export const talathiLogin = (loginData) => {
    return apiRequest('/talathi/login', 'POST', loginData);
}

export const savePersonalDetails = (formData) => {
    return apiRequest('/personalDetails/upload', 'POST', formData);
}


export const getAllApplications = () => {
    return apiRequest('/personalDetails/', "GET");
}

export const getApplicationByCitizen = (citizen) => {
    return apiRequest(`/personalDetails/${citizen}`, "GET");
}

export const staffApplicationApproval = (id) => {
    return apiRequest(`/personalDetails/staffApproval/${id}`, 'PUT');
}

export const staffApplicationRejection = (id, data) => {
    return apiRequest(`/personalDetails/staffRejection/${id}`, 'PUT', data)
}

export const circleApproveApplication = (id) => {
    return apiRequest(`/personalDetails/circleApproval/${id}`, 'PUT')
}

export const circleRejectApplication = (id, data) => {
    return apiRequest(`/personalDetails/circleRejection/${id}`, 'PUT', data)
}

export const approveApplication = (id) => {
    return apiRequest(`/personalDetails/adminApproval/${id}`, 'PUT');
}

export const rejectApplication = (id, data) => {
    return apiRequest(`/personalDetails/adminRejection/${id}`, 'PUT', data)
}









// ----------------------------------

export const updateStudent = (id, signupData) => {
    return apiRequest(`/citizen/updateById/${id}`, 'PUT', signupData);
}

export const studentForgotPassword = (email) => {
    return apiRequest(`/citizen/forgotPassword/${email}`, 'PUT');
}

export const instituteForgotPassword = (collegeEmail) => {
    return apiRequest(`/institute/forgotPassword/${collegeEmail}`, 'PUT');
}

export const updateInstituteDetails = (id, signupData) => {
    return apiRequest(`/institute/updateById/${id}`, 'PUT', signupData);
}

export const instituteRegister = (signupData) => {
    return apiRequest('/institute/createInstitute', 'POST',
        signupData);
};

export const studentLogin = (loginData) => {
    return apiRequest('/student/login', 'POST', loginData);
};

export const instituteLogin = (loginData) => {
    return apiRequest('/institute/instituteLogin', 'POST', loginData)
}


export const getAllDepos = () => {
    return apiRequest('/depo/', 'GET');
}

export const getAllInstitutes = () => {
    return apiRequest('/institute/', 'GET');
}

export const getInstituteById = (id) => {
    return apiRequest(`/institute/${id}`, 'GET');
}

export const rejectInstitute = (id) => {
    return apiRequest(`/institute/rejectInstitute/${id}`, 'PUT');
}

export const approveInstitute = (id) => {
    return apiRequest(`/institute/approveInstitute/${id}`, 'PUT');
}

export const studentPassApplication = (applicationData) => {
    return apiRequest('/pass-applications/upload', 'POST', applicationData);
}

export const getInstitutePassApplications = (id) => {
    return apiRequest(`/pass-applications/getInstitutePassApplications/${id}`, 'GET');
}

export const getPassApplications = () => {
    return apiRequest(`/pass-applications/`, 'GET');
}






export const approveDepoApplication = (id) => {
    return apiRequest(`/pass-applications/depoApproval/${id}`, 'PUT');

}

export const rejectDepoApplication = (id) => {
    return apiRequest(`/pass-applications/depoRejection/${id}`, 'PUT');
}