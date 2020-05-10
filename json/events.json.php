<?php
preg_match('/ctid\";s:3:\"(.*?)\";s:4:\"ctnm\"/s', $_COOKIE[ci_session_intranet], $ctid);
$ctid =  $ctid[1];
if($ctid == "") {
preg_match('/ctid\";s:2:\"(.*?)\";s:4:\"ctnm\"/s', $_COOKIE[ci_session_intranet], $ctid);
$ctid =  $ctid[1];
}
header('Content-type: text/json');
mysql_connect("localhost", "root", "d3xtr4n") or die(mysql_error());
mysql_select_db("intranet") or die(mysql_error());
$result = mysql_query("SELECT t0.fld_btp01,t0.fld_btdesc,unix_timestamp(t0.fld_btdt)'date',t0.fld_btid FROM tbl_bth t0 where t0.fld_bttyid=1 and (t0.fld_btflag=1 or t0.fld_baidp = '$ctid')");
$num_rows = mysql_num_rows($result);
$x = 0;
echo '[';
while($row = mysql_fetch_array($result)) {
  $x = $x + 1;
  echo '{ "date": " ' .$row['date'] . '000' . ' ", "type": "meeting", "title": "' . $row['fld_btp01'] . '", "description": "' . $row['fld_btdesc'] . '", "url": "index.php/page/form/78000EVENT/edit/' .  $row['fld_btid'] . '"}';
  if ($x < $num_rows) {
    echo ",";
  }
  
}
echo ']';
?>
