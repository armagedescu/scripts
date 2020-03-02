var speed = 10;            // smaller number moves the fly faster
var flyName = "fly.gif";

var dx = 3, dy = 3, xp, yp;   // coordinate and position variables
var am_x = Math.random() * 100, step_x = Math.random() / 10, step_y = 0.20 + Math.random();     // amplitude and step variables
var y_plus = 0;
var x_plus = 0;
var fi_plus;
var fi = 0;        // rotation
var adfi = .5 * Math.PI;      // distance from the center
var adfi_stopper;  // distance from the center
var doc_width = 800, doc_height = 600;
var fly_stopper = 0;
var neg = 0;
var pos = 1;

xp = doc_width  /  2;
yp = doc_height / 10;


var startHtml = 
               "<div id=\"the_fly\" onclick=\"javascript:dot_onClick();\""  +
               "  style=\""                          +
               "    POSITION: absolute;"             +
               "    Z-INDEX:    1;"                  +
               "    TOP:     15px; "                 +
               "    LEFT:    15px; "                 +
               "    WIDTH:   40px; "                 +
               "    HEIGHT:  40px; "                 +
               "\""                                  +
               "      >"                             +
               "  <img src=\"" + flyName + "\" border=\"0\"></img>" +
               "</div>\n"                            +
               //"<div id = \"detail\">qwe</div><br/>" +
               //"<div id = \"detail2\"></div>"        +
               //"<div id = \"detail3\"></div>"        +
               "";
document.write(startHtml);

adfi_stopper = 0;

var fi_speed   = 0;
var speed_grow = 1;
var chg_speed  = 0;
var line_speed = 6;

var direction = 0;
var fly_div;
var detail_dir;
var detail_dir1;
var detail_dir2;

var stop = 0;
var ddir  = 1;
var direction_flag = 1;
var rnd = 1;

function doOnResize()
{
   doc_width  = document.body.clientWidth;
   doc_height = document.body.clientHeight;
}

function documentOnLoad()
{
   try
   {
      fly_div    = document.getElementById("the_fly");
      doc_width  = document.body.clientWidth;
      doc_height = document.body.clientHeight;

      main();
      direction_changer();
      stopper();
   }catch(err)
   {
      alert(err.description);
   }
}
function main()
{
   if(stop == 0)
   {
      var cosdir = Math.cos(direction);
      var sindir = Math.sin(direction);
   
   
      var d_yp = dy * cosdir + dx * sindir;
      var d_xp = dx * cosdir - dy * sindir;
   
      yp += d_yp;
      xp += d_xp;
   
      if(yp < 0) //left margin
      {
         yp += d_yp * ((d_yp < 0) ? -2 : 2);
         direction = -direction;
      }else if(yp > doc_height - 60) //right margin
      {
         yp -= d_yp * ((d_yp < 0) ? -2 : 2);
         direction = -direction;
      }
   
      if(xp < 0) //top margin
      {
         xp += d_xp * ((d_xp < 0) ? -2 : 2);
         direction += Math.PI / 2 * (direction < 0) ? -1 : 1;
      }else if(xp > doc_width - 60) //bottom margin
      {
         xp -= d_xp * ((d_xp < 0) ? -2 : 2);
         direction += Math.PI / 2 * (direction < 0) ? -1 : 1;
      }
   
      fly_div.style.left = xp + "px";
      fly_div.style.top  = yp + "px";
   
      direction += ddir * 0.05 * Math.PI;
   
      if(direction >= 4 * Math.PI) direction -= 4 * Math.PI;
      else  if(direction <= -4 * Math.PI) direction += 4 * Math.PI;
   }
   setTimeout("main()", speed);
}




function direction_changer()
{
   if(stop == 0)
   {
      var x = Math.random();
      rnd = x;
      x = x < 0 ? -1 : x;
      ddir = x;

      direction_flag = x * 100 > 50 ? 1 : -1;
      if(direction_flag < 0) neg++; else pos++;

      ddir *= direction_flag;

   }

   setTimeout("direction_changer()", 200);
}

var stop_stopper = 0;

function dot_onClick()
{
   try
   {
      scare_fly(3);
   }catch(err)
   {
      alert(err.description);
   }
}

function scare_fly(scare)
{
   if(scare == 3)
   {
      stop_stopper = 1;
      stop = 0;
      dx = dy = 9;
      setTimeout("scare_fly(2)", 5000);
   }else if(scare == 2)
   {
      dx = dy = 6;
      setTimeout("scare_fly(1)", 3000);
   }else if(scare == 1)
   {
      dx = dy = 4;
      setTimeout("scare_fly(0)", 2000);
   }else
   {
      dx = dy = 3;
      stop_stopper = 0;
   }
}


function stopper()
{
   fly_stopper = Math.random() * 5000;
   if(stop_stopper == 0)
   {
      stop = stop == 1 ? 0 : 1;
      if(stop == 1) fly_stopper /= 4;
   }
   setTimeout("stopper()", fly_stopper);
}

function fly()
{
   this.stopper = function()
   {
     fly_stopper = Math.random() * 5000;
     if(stop_stopper == 0)
     {
        stop = stop == 1 ? 0 : 1;
        if(stop == 1) fly_stopper /= 4;
     }
     setTimeout("this.stopper()", fly_stopper);
   }
}



