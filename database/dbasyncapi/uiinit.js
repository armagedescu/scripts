function main(event)
{
   console.log("start");

   let prom = initDatabase();

   prom.then((db) =>
   {
      console.log ("salut");
      let y = new dbtable (db,
                   "select x.id d, x.text tx, f.* "            +
                   "   from "                                  +
                   "      (select id, text from foo) x "       +
                   "      inner join foo f "                   +
                   "         on x.id == f.id or x.id != f.id ");
      let z = new dbtable (db, 'select * from logs');

      let divy = y.buildTable();
      let divz = z.buildTable();
	  divy.then((div) => {document.body.appendChild(div); div.className = "def_table";});
	  divz.then((div) => {document.body.appendChild(div); div.className = "def_table";});
   });
}