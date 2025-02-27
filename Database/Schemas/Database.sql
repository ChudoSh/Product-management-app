IF NOT EXISTS(SELECT * FROM sys.objects 
    WHERE object_id = OBJECT_ID('product_management'))
BEGIN
    CREATE DATABASE product_management;

    USE product_management;
END