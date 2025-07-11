import ballerina/http;

service /hospitals on new http:Listener(9090) {
    resource function get .(http:Caller caller, http:Request req) returns error? {
        Hospital[] hospitals = check database:getHospitals();
        check caller->respond(hospitals);
    }

    resource function get [int id]/points(http:Caller caller, http:Request req) returns error? {
        string? token = req.getHeader("Authorization");
        if token is () {
            check caller->respond({message: "Unauthorized"}, 401);
            return;
        }
        User user = check auth:validateToken(token.replace("Bearer ", ""));
        if user.role != "hospital" && user.role != "admin" {
            check caller->respond({message: "Forbidden"}, 403);
            return;
        }
        Hospital hospital = check database:getHospitalById(id);
        check caller->respond({points: hospital.points});
    }
}