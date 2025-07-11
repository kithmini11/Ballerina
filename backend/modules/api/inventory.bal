import ballerina/http;

service /inventory on new http:Listener(9090) {
    resource function get .(http:Caller caller, http:Request req) returns error? {
        string? token = req.getHeader("Authorization");
        if token is () {
            check caller->respond({message: "Unauthorized"}, 401);
            return;
        }
        User user = check auth:validateToken(token.replace("Bearer ", ""));
        if user.role != "supplier" && user.role != "hospital" {
            check caller->respond({message: "Forbidden"}, 403);
            return;
        }
        Inventory[] inventory = check database:getInventory(user.id);
        check caller->respond(inventory);
    }

    resource function post update(http:Caller caller, http:Request req) returns error? {
        string? token = req.getHeader("Authorization");
        if token is () {
            check caller->respond({message: "Unauthorized"}, 401);
            return;
        }
        User user = check auth:validateToken(token.replace("Bearer ", ""));
        if user.role != "supplier" {
            check caller->respond({message: "Forbidden"}, 403);
            return;
        }
        json payload = check req.getJsonPayload();
        Inventory inventory = check payload.fromJsonWithType();
        check database:updateInventory(inventory);
        check caller->respond({message: "Inventory updated"});
    }
}