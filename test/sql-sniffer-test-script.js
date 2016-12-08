/*****************************************************************
  NAME: sql-sniffer-test-script
  PATH: test/sql-sniffer-test-script.js
  WHAT: Unit tests for "lib/sql-sniffer-test-script.js"
******************************************************************/
"use strict";
var chai = require('chai');
var should = chai.should();
var sqlSniffer = require('../lib/sql-sniffer.js');

describe('Testing the \"gopher-tools.js\" library...', function(){
//--------------------------------rejectInject--------------------------------//
  describe('The \"sqlSniffer\" function:', function(){
    it('returns \"false\" when no restricted phrase patterns detected', function (){
      let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing';
      let expectedResult = false;
      sqlSniffer(sqlStatement).should.eql(expectedResult);
    })
//*
    //---REMOVAL---
    describe('for \"Removal\" type patterns', function(){
      it('returns \"\[\'tRunCate  tAble\'\]\" when a \"Truncate Table\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; tRunCate  tAble  someTable;';
        let expectedResult = ['; tRunCate  tAble'];
        console.log(sqlSniffer(sqlStatement));
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOp  tAble\'\]\" when a \"Drop Table\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOp  tAble  someTable;';
        let expectedResult = ['; drOp  tAble'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOp  pRoCedurE\'\]\" when a \"Drop Procedure\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOp  pRoCedurE  someProcedure;';
        let expectedResult = ['; drOp  pRoCedurE'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP  PaCkAGe\'\]\" when a \"Drop Package\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP  PaCkAGe  somePackage;';
        let expectedResult = ['; drOP  PaCkAGe'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP  fUNctioN\'\]\" when a \"Drop Function\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP  fUNctioN  someFunction;';
        let expectedResult = ['; drOP  fUNctioN'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP INDEX\'\]\" when a \"Drop Index\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP INDEX  someIndex;';
        let expectedResult = ['; drOP INDEX'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP  bITmAp  IndeX\'\]\" when a \"Drop Bitmap Index\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP  bITmAp  IndeX  someBitmap Index;';
        let expectedResult = ['; drOP  bITmAp  IndeX'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP  uniQue  InDEX\'\]\" when a \"Drop Unique Index\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP  uniQue  InDEX  someUniqueIndex;';
        let expectedResult = ['; drOP  uniQue  InDEX'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP   MATeriAlized  VIEW\'\]\" when a \"Drop Materialized View\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP   MATeriAlized  VIEW  someMaterializedView;';
        let expectedResult = ['; drOP   MATeriAlized  VIEW'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP   VIEW\'\]\" when a \"Drop View\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP   VIEW  someView;';
        let expectedResult = ['; drOP   VIEW'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP   tRigGer\'\]\" when a \"Drop Trigger\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP   tRigGer  someTrigger;';
        let expectedResult = ['; drOP   tRigGer'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'drOP   tYpE\'\]\" when a \"Drop Type\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; drOP   tYpE  someType;';
        let expectedResult = ['; drOP   tYpE'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'pUrGE tABlE\'\]\" when a \"Purge Table\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable; pUrGE tABlE; SELECT someColumn FROM someTable WHERE oneThing = anotherThing';
        let expectedResult = ['; pUrGE tABlE'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'pUrGE  rECYCleBiN\'\]\" when a \"Purge Recyclebin\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable; pUrGE  rECYCleBiN; SELECT someColumn FROM someTable WHERE oneThing = anotherThing';
        let expectedResult = ['; pUrGE  rECYCleBiN'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'dEleTE   FROm\'\]\" when a \"Delete Type\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; dEleTE   FROm someTable...';
        let expectedResult = ['; dEleTE   FROm'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })
   })
   //---DDL---
    describe('for \"DDL\" type patterns', function(){
      it('returns \"\[\'CREATE  or  REPLACE\'\]\" when a \"Create Or Replace\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CREATE  or  REPLACE  someFunction...';
        let expectedResult = ['; CREATE  or  REPLACE'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CReAtE  TaBLe\'\]\" when a \"Create Table\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CReAtE  TaBLe  SOMETABLE (someColumn varchar2(20 BYTE));...';
        let expectedResult = ['; CReAtE  TaBLe'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'AlTeR  TaBLe\'\]\" when a \"Alter Table\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; AlTeR  TaBLe  SOMETABLE (someColumn varchar2(20 BYTE));...';
        let expectedResult = ['; AlTeR  TaBLe'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE  pRoCedurE\'\]\" when a \"Create Procedure\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE  pRoCedurE  someProcedure...';
        let expectedResult = ['; CreAtE  pRoCedurE'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE  PaCkAGe\'\]\" when a \"Create Package\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE  PaCkAGe  somePackage...';
        let expectedResult = ['; CreAtE  PaCkAGe'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE  fUNctioN\'\]\" when a \"Create Function\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE  fUNctioN  someFunction...';
        let expectedResult = ['; CreAtE  fUNctioN'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE   INDEX\'\]\" when a \"Create Index\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE INDEX  someIndex...';
        let expectedResult = ['; CreAtE INDEX'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'AlTer   INDEX  indexName   reBuIld\'\]\" when a \"Alter Index...Rebuild\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; AlTer   INDEX  indexName   reBuIld...';
        let expectedResult = ['; AlTer   INDEX  indexName   reBuIld'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'AlTer   INDEX  indexName   reNaMe\'\]\" when a \"Alter Index...Rename\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; AlTer   INDEX  indexName   reNaMe...';
        let expectedResult = ['; AlTer   INDEX  indexName   reNaMe'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE  bITmAp  IndeX\'\]\" when a \"Create Bitmap Index\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE  bITmAp  IndeX  someBitmap Index...';
        let expectedResult = ['; CreAtE  bITmAp  IndeX'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE  uniQue  InDEX\'\]\" when a \"Create Unique Index\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE  uniQue  InDEX  someUniqueIndex...';
        let expectedResult = ['; CreAtE  uniQue  InDEX'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE   mAtErializEd  View\'\]\" when a \"Create Materialized View\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE   mAtErializEd  View  someMaterializedView...';
        let expectedResult = ['; CreAtE   mAtErializEd  View'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE  View\'\]\" when a \"Create View\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE  View  someView...';
        let expectedResult = ['; CreAtE  View'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'Alter  View\'\]\" when a \"Alter View\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; Alter  View  someView...';
        let expectedResult = ['; Alter  View'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE  Trigger\'\]\" when a \"Create Trigger\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE  Trigger  someTrigger...';
        let expectedResult = ['; CreAtE  Trigger'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'Alter  Trigger\'\]\" when a \"Alter Trigger\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; Alter  Trigger  someTrigger...';
        let expectedResult = ['; Alter  Trigger'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'CreAtE  TYPe someType aS\'\]\" when a \"Create Type\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; CreAtE  TYPe someType aS...';
        let expectedResult = ['; CreAtE  TYPe someType aS'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

    })

    describe('for \"System\" type patterns', function(){

      it('returns \"\[\'AlTer   System    Set\'\]\" when a \"Alter System Set\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; AlTer   System    Set...';
        let expectedResult = ['; AlTer   System    Set'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'sHutDown    NorMal\'\]\" when a \"Shutdown Normal\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; sHutDown    NorMal...';
        let expectedResult = ['; sHutDown    NorMal'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'sHutDown   ImmEdIate\'\]\" when a \"Shutdown Immediate\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; sHutDown   ImmEdIate...';
        let expectedResult = ['; sHutDown   ImmEdIate'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'sHutDown   tRansActionAl\'\]\" when a \"Shutdown Transactional\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; sHutDown   tRansActionAl...';
        let expectedResult = ['; sHutDown   tRansActionAl'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'sHutDown   aBorT\'\]\" when a \"Shutdown Abort\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; sHutDown   aBorT...';
        let expectedResult = ['; sHutDown   aBorT'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

    })

    describe('for \"DML\" type patterns', function(){

      it('returns \"\[\'UPDATE   someTable  SET\'\]\" when a \"Update...Set\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; UPDATE   someTable  SET...';
        let expectedResult = ['; UPDATE   someTable  SET'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'InsErT  InTo\'\]\" when a \"Insert Into\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; InsErT  InTo...';
        let expectedResult = ['; InsErT  InTo'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'InsErT  All  InTo\'\]\" when a \"Insert All Into\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; InsErT  All  InTo...';
        let expectedResult = ['; InsErT  All  InTo'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'MERGE  into  someTable  USING\'\]\" when a \"Merge Into...Using\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; MERGE  into  someTable  USING...';
        let expectedResult = ['; MERGE  into  someTable  USING'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

    })

    describe('for \"Anonymoys Block\" type patterns', function(){

      it('returns \"\[\'BEGIN null; SELECT * FROM DUAL; END;\'\]\" when a \"Merge Into...Using\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; BEGIN null; END;...';
        let expectedResult = ['; BEGIN null; END'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'sYS.\'\]\" when a \"SYS.\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; EXEC sYS.GET_OWNER (\'AAAA||CHR(DBMS_SQL.EXECUTE(4))--\');';
        let expectedResult = ['sYS.G'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'EXECUTE   ImmeDiaTe\'\]\" when a \"Execute Immediate\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; EXECUTE   ImmeDiaTe  someProcedure();';
        let expectedResult = ['EXECUTE   ImmeDiaTe'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'&&\'\]\" when a \"&&...\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing;SELECT * FROM &&1';
        let expectedResult = ['&&1'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

    })

    describe('for \"Data Dictionary\" type patterns', function(){

      it('returns \"\[\'v$\'\]\" when a \"v$\" pattern is detected', function (){
        let sqlStatement = 'SELECT someColumn FROM someTable WHERE oneThing = anotherThing; SELECT * FROM v$SomeSysView';
        let expectedResult = ['FROM someTable WHERE oneThing = anotherThing; SELECT * FROM v$'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'FROM  someTable A,  all_\'\]\" when a \"From...All_\" pattern is detected', function (){
        let sqlStatement = 'SELECT * FROM  someTable A,  all_tables B;';
        let expectedResult = ['FROM  someTable A,  all_'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'FROM  someTable A,  dba_\'\]\" when a \"From...DBA_\" pattern is detected', function (){
        let sqlStatement = 'SELECT * FROM  someTable A,  dba_tables B;';
        let expectedResult = ['FROM  someTable A,  dba_'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

      it('returns \"\[\'FROM  someTable A,  user_\'\]\" when a \"From...User_\" pattern is detected', function (){
        let sqlStatement = 'SELECT * FROM  someTable A,  user_tables B;';
        let expectedResult = ['FROM  someTable A,  user_'];
        sqlSniffer(sqlStatement).should.eql(expectedResult);
      })

    })

  })
//*/
})