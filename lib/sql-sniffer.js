/*******************************************************************************
FILE: sql-sniffer
PATH: lib/sql-sniffer.js
SUMMARY: uses regular expressions to recognize specific SQL
         patterns and phrases
*******************************************************************************/
"use strict";

function sqlSniffer (sqlStatement){

  let insrtChars = '(\\;|\\\'|\\\\\"|\\\\|\\-\\-|\\/\\*|\\\\\')', // recogize these characters-->   ;   '    \"    --    \     /*     \'
      space = '+[\\s]+', // a seperator that allows for an infinate amount of white space (between recognized patterns)
      wrdSp = '+[\\w\\W]+', // a seperator that allows for an infinate amount of white space and words (between recognized patterns)
      OR = '|';

  //these functions serve to apend header info to regex statements
  function rejectPattern (word){
      return '('+insrtChars+word+OR+insrtChars+space+word+')'+space;
  };
  function rejectPatternWrdSp (word){
      return '('+insrtChars+word+OR+insrtChars+space+word+')'+wrdSp;
  };
    let regexExpression =
     new RegExp(
      //---REMOVAL---
      rejectPattern('truncate')+'table'+OR+
      rejectPattern('drop')+'table'+OR+
      rejectPattern('drop')+'procedure'+OR+
      rejectPattern('drop')+'package'+OR+
      rejectPattern('drop')+'function'+OR+
      rejectPattern('drop')+'index'+OR+
      rejectPattern('drop')+'bitmap'+space+'index'+OR+
      rejectPattern('drop')+'unique'+space+'index'+OR+
      rejectPattern('drop')+'materialized'+space+'view'+OR+
      rejectPattern('drop')+'view'+OR+
      rejectPattern('drop')+'trigger'+OR+
      rejectPattern('drop')+'type'+OR+
      rejectPattern('purge')+'table'+OR+
      rejectPattern('purge')+'recyclebin'+OR+
      rejectPattern('delete')+'from'+OR+
      //---DDL---
      rejectPattern('create')+'or'+space+'replace'+OR+
      rejectPattern('create')+'table'+OR+
      rejectPattern('alter')+'table'+OR+
      rejectPattern('create')+'procedure'+OR+
      rejectPattern('create')+'package'+OR+
      rejectPattern('create')+'function'+OR+
      rejectPattern('create')+'index'+OR+
      rejectPattern('alter')+'index'+wrdSp+'rebuild'+OR+
      rejectPattern('alter')+'index'+wrdSp+'rename'+OR+
      rejectPattern('create')+'bitmap'+space+'index'+OR+
      rejectPattern('create')+'unique'+space+'index'+OR+
      rejectPattern('create')+'materialized'+space+'view'+OR+
      rejectPattern('create')+'view'+OR+
      rejectPattern('alter')+'view'+OR+
      rejectPattern('create')+'trigger'+OR+
      rejectPattern('alter')+'trigger'+OR+
      rejectPattern('create')+'type'+wrdSp+'as'+OR+
      //---SYSTEM---
      rejectPattern('alter')+'system'+space+'set'+OR+
      rejectPattern('shutdown')+'normal'+OR+
      rejectPattern('shutdown')+'immediate'+OR+
      rejectPattern('shutdown')+'transactional'+OR+
      rejectPattern('shutdown')+'abort'+OR+
      //---DML---
      rejectPatternWrdSp('update')+'set'+OR+
      rejectPattern('insert')+'into'+OR+
      rejectPattern('insert')+'all'+space+'into'+OR+
      rejectPattern('merge')+'into'+wrdSp+'using'+OR+
      //---ANONYMOUS BLOCK---
      rejectPatternWrdSp('begin')+'\\;'+wrdSp+'end'+OR+
      '\\bsys\\.+[\\w]'+OR+
      '\\bexecute'+space+'\\bimmediate'+OR+
      '\\&\\&+[\\w]'+OR+
      //---DATA DICTIONARY---
      '\\bfrom'+wrdSp+'v\\$'+OR+
      '\\bfrom'+wrdSp+'all_'+OR+
      '\\bfrom'+wrdSp+'dba_'+OR+
      '\\bfrom'+wrdSp+'user_'+OR+
      //----RANDOM PATTERNS-----
      '1'+space+'\\='+space+'1'+space+'\\-\\-'+OR+
      '1'+space+'\\='+space+'1'+space+'\\#'+OR+
      '1'+space+'\\='+space+'1'+space+'\\/\\*'+OR+
      '\\\''+space+'1'+space+'\\\''+space+'\\='+space+'\\\''+space+'1'+space+'\\-\\-'+OR+
      'admin'+space+'\\\''+space+'\\-\\-'+OR+
      'admin'+space+'\\\''+space+'\\#'+OR+
      'admin'+space+'\\\''+space+'\\/\\*'
    ,'ig');
  let restrictedPhrases = sqlStatement.match(regexExpression);
  if (restrictedPhrases){return restrictedPhrases;}
  return false;
}

module.exports = sqlSniffer;