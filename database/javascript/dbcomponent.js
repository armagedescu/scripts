class dbtable
{
   constructor(db, select, func)
   {
      this.db         = db;
      this.select     = select;
      this.select_bak = select;
      this.func       = func;
      this.buildTable();
   }

   buildHeader(tx, results)
   {
      let thead = document.createElement("thead");
      let tr    = document.createElement("tr");
      for (name in results.rows[0])
      {
         let td = document.createElement("td");
         td.innerText = name;
         tr.appendChild (td);
      }
      thead.appendChild(tr);
      return thead;
   }

   buildBody(tx, results)
   {
      let tbody = document.createElement("tbody");
      for (let i  = 0; i < results.rows.length; i++)
      {
         let tr = document.createElement("tr");
         for (name in results.rows[i])
         {
            let td = document.createElement("td");
            td.innerText = results.rows[i][name];
            tr.appendChild (td);
         }
         tbody.appendChild(tr);
      }
      return tbody;               
   }

   updateTable(tx, results)
   {
      while (this.table.childNodes.length > 0) this.table.removeChild(this.table.childNodes[0]);
      let thead = this.buildHeader (tx, results);
      let tbody = this.buildBody   (tx, results);
      this.table.appendChild(thead);
      this.table.appendChild(tbody);
   }
   reset()
   {
      this.select = this.select_bak;
      this.refreshTable();
   }

   sqlExecutor (tx, results)
   {
      if (results.rows.left < 1) return;
      let table = document.createElement("table");
         table.dbcomponent = this;
      this.table = table;
      this.updateTable(tx, results);
      
      let div      = document.createElement("div");
      let btnReset = document.createElement("button");
      btnReset.innerText = "R";
      btnReset.addEventListener("click", () => this.reset());
      div.appendChild(btnReset);
      let editSql = document.createElement("button");
      editSql.innerText = "E";
      editSql.addEventListener("click",  () => this.editSql ());
      div.appendChild(editSql);

      div.appendChild(this.table);
      div.dbcomponent = this;

      this.div = div;
      this.func(div);
   }
   editSql()
   {
      let div      = document.createElement("div");
	  div.class = "edit_sql";

      let sql = document.createElement("div");
	  sql.innerText = this.select;
	  sql.contentEditable = true;
	  div.appendChild(sql);

	  let btnExec = document.createElement("button");
      btnExec.innerText = "e";
      btnExec.addEventListener("click", () =>
        {
			this.select = sql.innerText;
			this.refreshTable();
			div.remove();
		});
      div.appendChild(btnExec);
	  let btnClose = document.createElement("button");
      btnClose.innerText = "x";
      btnClose.addEventListener("click", () => div.remove());
      div.appendChild(btnClose);

	  document.body.appendChild(div);
   }

   // Use if HTML table is already shown, but changed the SQL
   refreshTable()
   {
       this.db.transaction(
                    (tx) =>
                    {
                       console.log("before execute sql");
                       tx.executeSql(this.select, [], (tx, results) => this.updateTable(tx, results), null);
                       console.log("after execute sql");
                    } );
   }
   // Use if it is a newly created HTML table.
   // The func argument is a callback that is called after SQL update.
   // The callback should contain DOM logic that inserts the generated HTML element into HTML document.
   // Function builds a DIV element and a TABLE inside it.
   buildTable(func)
   {
       this.db.transaction(
                    (tx) =>
                    {
                       console.log("before execute sql");
                       tx.executeSql(this.select, [], (tx, results) => this.sqlExecutor(tx, results), null);
                       console.log("after execute sql");
                    } );
   }
}
