import ballerina/http;
import modules.database;

service /auth on new http:Listener(9090) {
    resource function post login(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        string username = check payload.username.toString();
        string password = check payload.password.toString();

        User? user = check database:getUserByUsername(username);
        if user is () || user.password != password {
            check caller->respond({message: "Invalid credentials"}, 401);
            return;
        }

        string token = check jwt:generateToken(user);
        check caller->respond({token: token});
    }
}