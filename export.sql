--------------------------------------------------------
--  File created - Friday-April-20-2018   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table DONHANG
--------------------------------------------------------

  CREATE TABLE "HR"."DONHANG" 
   (	"ID" NUMBER(10,0) GENERATED BY DEFAULT ON NULL AS IDENTITY MINVALUE 1 MAXVALUE 1000000000 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"IDUSER" NUMBER(10,0), 
	"IDSP" VARCHAR2(2000 BYTE), 
	"TONGTIEN" NUMBER(20,0), 
	"STASTUS" NUMBER(10,0), 
	"IDSHIP" NUMBER(18,0), 
	"NGAYDAT" DATE, 
	"THANHTOAN" NUMBER(3,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSAUX" ;
--------------------------------------------------------
--  DDL for Table HANG
--------------------------------------------------------

  CREATE TABLE "HR"."HANG" 
   (	"ID" NUMBER(10,0) GENERATED BY DEFAULT ON NULL AS IDENTITY MINVALUE 1 MAXVALUE 1000 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"HANGSX" VARCHAR2(50 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSAUX" ;
--------------------------------------------------------
--  DDL for Table LOAI
--------------------------------------------------------

  CREATE TABLE "HR"."LOAI" 
   (	"ID" NUMBER(10,0) GENERATED BY DEFAULT ON NULL AS IDENTITY MINVALUE 1 MAXVALUE 10000 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"LOAISP" NVARCHAR2(50)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSAUX" ;
--------------------------------------------------------
--  DDL for Table MAU
--------------------------------------------------------

  CREATE TABLE "HR"."MAU" 
   (	"ID" NUMBER(10,0) GENERATED BY DEFAULT ON NULL AS IDENTITY MINVALUE 1 MAXVALUE 1000 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"MAUSP" NVARCHAR2(50)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSAUX" ;
--------------------------------------------------------
--  DDL for Table MEMBER
--------------------------------------------------------

  CREATE TABLE "HR"."MEMBER" 
   (	"TAIKHOAN" VARCHAR2(2000 BYTE), 
	"MATKHAU" VARCHAR2(2000 BYTE), 
	"TEN" VARCHAR2(2000 BYTE), 
	"SDT" VARCHAR2(2000 BYTE), 
	"EMAIL" VARCHAR2(2000 BYTE), 
	"ANH" VARCHAR2(2000 BYTE), 
	"RESETPASS" VARCHAR2(2000 BYTE), 
	"QUYEN" NUMBER(3,0), 
	"ID" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"STATUS" NUMBER(3,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSAUX" ;
--------------------------------------------------------
--  DDL for Table SANPHAM
--------------------------------------------------------

  CREATE TABLE "HR"."SANPHAM" 
   (	"ID" NUMBER(10,0) GENERATED BY DEFAULT ON NULL AS IDENTITY MINVALUE 1 MAXVALUE 100000 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"TENSP" NVARCHAR2(1000), 
	"LOAI" NUMBER(10,0), 
	"HANG" NUMBER(10,0) DEFAULT NULL, 
	"ANHBIA" VARCHAR2(2000 BYTE), 
	"ANHFULL" VARCHAR2(2000 BYTE), 
	"THONGTIN" VARCHAR2(2000 BYTE), 
	"THONGSO" VARCHAR2(2000 BYTE), 
	"MAU" NUMBER, 
	"DUNGLUONG" NUMBER, 
	"GIA" NUMBER, 
	"SOLUONG" NUMBER, 
	"SOLUONGDAT" NUMBER, 
	"ANHIEN" NUMBER, 
	"SALE" NUMBER, 
	"TINHTRANG" VARCHAR2(2000 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSAUX" ;
--------------------------------------------------------
--  DDL for Table SHIP
--------------------------------------------------------

  CREATE TABLE "HR"."SHIP" 
   (	"ID" NUMBER, 
	"NAME" VARCHAR2(2000 BYTE), 
	"LASTNAME" VARCHAR2(2000 BYTE), 
	"PHONE" VARCHAR2(2000 BYTE), 
	"ADDRESS" VARCHAR2(2000 BYTE), 
	"NOTES" VARCHAR2(2000 BYTE)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "SYSAUX" ;
REM INSERTING into HR.DONHANG
SET DEFINE OFF;
REM INSERTING into HR.HANG
SET DEFINE OFF;
Insert into HR.HANG (ID,HANGSX) values (2,'SamSung');
Insert into HR.HANG (ID,HANGSX) values (1,'Apple');
Insert into HR.HANG (ID,HANGSX) values (22,'Oppo');
REM INSERTING into HR.LOAI
SET DEFINE OFF;
Insert into HR.LOAI (ID,LOAISP) values (1,'Phone');
Insert into HR.LOAI (ID,LOAISP) values (2,'Tablet');
REM INSERTING into HR.MAU
SET DEFINE OFF;
Insert into HR.MAU (ID,MAUSP) values (1,'Gray');
Insert into HR.MAU (ID,MAUSP) values (2,'Gold');
REM INSERTING into HR.MEMBER
SET DEFINE OFF;
Insert into HR.MEMBER (TAIKHOAN,MATKHAU,TEN,SDT,EMAIL,ANH,RESETPASS,QUYEN,ID,STATUS) values ('admin','21232f297a57a5a743894a0e4a801fc3','admin','1111','kirru997@gmail.com','Capture.png',null,3,1,1);
REM INSERTING into HR.SANPHAM
SET DEFINE OFF;
Insert into HR.SANPHAM (ID,TENSP,LOAI,HANG,ANHBIA,ANHFULL,THONGTIN,THONGSO,MAU,DUNGLUONG,GIA,SOLUONG,SOLUONGDAT,ANHIEN,SALE,TINHTRANG) values (1,'Iphone SE',1,1,null,null,null,null,null,null,null,null,null,null,null,null);
Insert into HR.SANPHAM (ID,TENSP,LOAI,HANG,ANHBIA,ANHFULL,THONGTIN,THONGSO,MAU,DUNGLUONG,GIA,SOLUONG,SOLUONGDAT,ANHIEN,SALE,TINHTRANG) values (2,'Iphone 6S',1,2,null,null,null,null,null,null,null,null,null,null,null,null);
REM INSERTING into HR.SHIP
SET DEFINE OFF;