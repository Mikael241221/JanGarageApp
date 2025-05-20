// import from the env
const api_url = import.meta.env.VITE_API_URL;
// a function to send a request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token":loggedInEmployeeToken
        },
        body: JSON.stringify(formData),
    };
    console.log(requestOptions)
    const response = await fetch(`${api_url}/api/employee`, requestOptions);
    return response;
}
// export all the functions
const employeeService = {
    createEmployee,
};
export default employeeService;
