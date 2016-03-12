// DATABASE

// Retrieve data from the database
function getData() {
    var queryResult = db.Execute('SELECT * FROM sampleTable');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

// Create table
function createTable() {
    var result = {};

    var queryResult = db.Execute('SELECT TOP 1 * FROM sampleTable');
    var row = JSON.parse(queryResult);

    if (row.length > 0 && typeof row[0].Error != 'undefined') {
        db.Execute('CREATE TABLE sampleTable(id INTEGER PRIMARY KEY IDENTITY(1,1), userId nvarchar(50), value nvarchar(50), description nvarchar(500), contact nvarchar(200), forSale integer, tutoring integer, housing integer, lostFound integer, status);'); 
        //status 1 = buy, 0 = sell;
        result = '{"status":"tableCreated"}';
    } else
        result = '{"status":"tableExist"}';

    return JSON.stringify(result);
}

// Insert into the database
function insert() {
    db.Execute('INSERT INTO sampleTable (userId, value, description, contact, forSale, tutoring, housing, lostFound, status) VALUES(@currentUser,@value,@description,@contact,@forSale,@tutoring,@housing,@lostFound,@status)');
    return getData();     
} 