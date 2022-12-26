async function initDatabase()
{
   var db = openDatabase('mydb2', '1.0', 'Test 2 DB', 2 * 1024 * 1024);

   return new Promise((resolve, reject) =>
   {
      db.transaction( (tx) =>
         {
            tx.executeSql   ('drop table if exists logs');
            tx.executeSql( "create table if not exists logs (id unique, log)" );
            tx.executeSql( "insert into logs (id, log) values (1, 'foobar')"  );
            tx.executeSql( "insert into logs (id, log) values (2, 'logmsg')"  );
            tx.executeSql( "insert into logs (id, log) values (3, 'test')"    );
            tx.executeSql( "insert into logs (id, log) values (4, 'test1')"   );
            tx.executeSql( "insert into logs (id, log) values (5, 'test2')"   );
            tx.executeSql( "insert into logs (id, log) values (6, 'test3')"   );
            console.log("logs created");
      
            tx.executeSql   ( 'drop table if exists foo' );
            tx.executeSql   ( 'create table foo (id unique, text)' );
            tx.executeSql   ( 'insert into foo (id, text) values (?, ?)', [1, 'unu'  ] );
            tx.executeSql   ( 'insert into foo (id, text) values (?, ?)', [2, 'doi'  ] );
            tx.executeSql   ( 'insert into foo (id, text) values (?, ?)', [3, 'trei' ] );
            console.log("test created");
      
            resolve(db); //promise
         });
   });
}