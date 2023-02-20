const sqlite3 = require('better-sqlite3');
const db = sqlite3('database.db', { verbose: console.log });

All = (table) => {
    result = []
    console.log("All:");
    const sql = db.prepare("SELECT * FROM "+table);
    const rows = sql.all();

    for (const row of rows) {
        console.log(row);
        result.push(row);
    }
    return result
}

allInColumn = (table,column) => {
    result = []
    console.log("all entries in column:",column);
    const sql = db.prepare("SELECT "+column+" FROM "+table);
    const rows = sql.all();

    for (const row of rows) {
        console.log(row);
        result.push(row);
    }
    return result
}

OneWithId = (id) => {
    console.log("One with ID:");
    const sql = db.prepare("SELECT * FROM msgTable WHERE id = ?");
    const row = sql.get(id);
    console.log(row);
}

Insert = (table,column,value) => {
    console.log("Inserting:");
    const sql = db.prepare("INSERT INTO "+table+" ("+column+") VALUES (?)");

    const info = sql.run(value)
    console.log("Amount of changes done: " + info.changes);
    console.log("Last inserted ID: " + info.lastInsertRowid);
}

multipleInsert = (table,columns,values) => {
    console.log("Inserting:");
    console.log("INSERT INTO "+table+" ("+columns.join(",")+") VALUES ("+values.map(x => "?").join(",")+")");

    const sql = db.prepare("INSERT INTO "+table+" ("+columns.join(",")+") VALUES ("+values.map(x => "?").join(",")+")");

    const info = sql.run(...values)
    console.log("Amount of changes done: " + info.changes);
    console.log("Last inserted ID: " + info.lastInsertRowid);
}

Delete = (id) => {
    console.log("Deleting:");
    const sql = db.prepare("DELETE FROM msgTable WHERE id = ?");
    const info = sql.run(id);
    console.log("Amount of changes done: " + info.changes);
    console.log("Last inserted ID: " + info.lastInsertRowid);
}

deleteAll = () => {
    console.log("Deleting all:");
    const sql = db.prepare("DELETE FROM msgTable");
    const info = sql.run();
    console.log("Amount of changes done: " + info.changes);
    console.log("Last inserted ID: " + info.lastInsertRowid);
}

exports.All = All;
exports.allInColumn = allInColumn;
exports.OneWithId = OneWithId;
exports.Insert = Insert;
exports.multipleInsert = multipleInsert;
exports.Delete = Delete;
exports.deleteAll = deleteAll;