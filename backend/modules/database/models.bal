public type User record {|
    int id;
    string username;
    string password;
    string role;
|};

public type Hospital record {|
    int id;
    string name;
    int points;
|};

public type Prescription record {|
    int id;
    int doctor_id;
    string patient_id;
    json items;
    string created_at;
|};

public type Order record {|
    int id;
    int prescription_id;
    int hospital_id;
    int supplier_id;
    string status;
    string created_at;
|};

public type Inventory record {|
    int id;
    int supplier_id;
    string item_name;
    int quantity;
    decimal price;
|};

public type Notification record {|
    int id;
    int user_id;
    string message;
    string created_at;
|};