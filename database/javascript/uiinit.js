function main(db)
{
   console.log("start");                  

   y = new dbtable (db,
                "select x.id d, x.text tx, f.* "            +
                "   from "                                  +
                "      (select id, text from foo) x "       +
                "      inner join foo f "                   +
                "         on x.id == f.id or x.id != f.id ",
                (div) => {document.body.appendChild(div); div.className = "def_table";});

   z = new dbtable (db,
                'select * from logs',
                (div) => {document.body.appendChild(div); div.className = "def_table";});
}