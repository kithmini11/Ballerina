import ballerina/http;

service /api on new http:Listener(8080) {

    resource function post login(http:Caller caller, http:Request req) returns error? {
        check caller->respond("Login endpoint");
    }

    resource function get patients(http:Caller caller, http:Request req) returns error? {
        check caller->respond("Patients endpoint");
    }

    // Add more resources for doctors, suppliers, inventory, etc.
}