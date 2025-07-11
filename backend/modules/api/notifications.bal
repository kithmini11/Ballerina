import ballerina/http;

public function sendNotification(int userId, string message) returns error? {
    Notification notification = {id: 0, user_id: userId, message: message, created_at: ""};
    check database:saveNotification(notification);
    User user = check database:getUserById(userId);
    if user.role == "patient" {
        check whatsapp:sendWhatsAppMessage(user.username, message);
    }
    // Future: Add email or push notifications
}