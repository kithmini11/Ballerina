import ballerina/jwt;
import ballerina/crypto;

configurable string jwtSecret = "your_jwt_secret";
configurable string issuer = "dentix";
configurable string audience = "dentix_users";

public function generateToken(User user) returns string|error {
    jwt:Payload payload = {
        sub: user.username,
        iss: issuer,
        aud: audience,
        "role": user.role
    };
    return jwt:issue(payload, check crypto:hmacSha256(jwtSecret.toBytes()));
}

public function validateToken(string token) returns User|error {
    jwt:Payload payload = check jwt:validate(token, issuer, audience, check crypto:hmacSha256(jwtSecret.toBytes()));
    return {id: 0, username: payload.sub, password: "", role: check payload["role"].toString()};
}