import ballerina/http;

public function updateHospitalPoints(int hospitalId, int points) returns error? {
    Hospital hospital = check database:getHospitalById(hospitalId);
    int newPoints = hospital.points + points;
    check database:updateHospitalPoints(hospitalId, newPoints);
    if newPoints >= 1000 { // Threshold for donation
        check database:resetHospitalPoints(hospitalId);
        check notifications:sendNotification(hospitalId, "Donation triggered: Orthodontic kit donated!");
    }
}