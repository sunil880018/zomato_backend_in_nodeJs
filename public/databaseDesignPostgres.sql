-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/x2RxyS
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "customers" (
    "customer_id" int(4)   NOT NULL,
    "customer_name" varchar(20)   NOT NULL,
    "customer_phone" varchar(12)   NOT NULL,
    "customer_address" varchar(30)   NOT NULL,
    CONSTRAINT "pk_customers" PRIMARY KEY (
        "customer_id"
     )
);

CREATE TABLE "restaurant" (
    "restaurant_id" int(3)   NOT NULL,
    "restaurant_name" varchar(20)   NOT NULL,
    "restaurant_location" varchar(20)   NOT NULL,
    "restaurant_rating" decimal(2,1)   NOT NULL,
    CONSTRAINT "pk_restaurant" PRIMARY KEY (
        "restaurant_id"
     )
);

CREATE TABLE "zomato_employee" (
    "employee_id" int(6)   NOT NULL,
    "employee_name" varchar(20)   NOT NULL,
    "employee_phone" varchar(11)   NOT NULL,
    "employee_rating" decimal(2,1)   NOT NULL,
    CONSTRAINT "pk_zomato_employee" PRIMARY KEY (
        "employee_id"
     )
);

CREATE TABLE "foods" (
    "food_id" int(7)   NOT NULL,
    "food_name" varchar(20)   NOT NULL,
    "per_unit_price" decimal(5,2)   NOT NULL,
    CONSTRAINT "pk_foods" PRIMARY KEY (
        "food_id"
     )
);

CREATE TABLE "orders_details" (
    "order_id" int(4)   NOT NULL,
    "customer_id" int(4)   NOT NULL,
    "restaurant_id" int(4)   NOT NULL,
    "employee_id" int(6)   NOT NULL,
    "order_status" varchar(10)   NOT NULL,
    "order_time" timestamp   NOT NULL,
    "delivered_time" timestamp   NOT NULL
);

CREATE TABLE "payments" (
    "transaction_id" int(8)   NOT NULL,
    "order_id" int(4)   NOT NULL,
    "payment_type" varchar(20)   NOT NULL,
    "payment_status" varchar(10)   NOT NULL,
    "amount" decimal(5,2)   NOT NULL,
    CONSTRAINT "pk_payments" PRIMARY KEY (
        "transaction_id"
     )
);

CREATE TABLE "orders_food" (
    "order_food_id" int(4)auto_increment   NOT NULL,
    "order_id" int(4)   NOT NULL,
    "customer_id" int(4)   NOT NULL,
    "restaurant_id" int(3)   NOT NULL,
    "food_id" int(7)   NOT NULL,
    "quantity" int(2),   NOT NULL,
    "employee_id" int(6)   NOT NULL,
    "transaction_id" int(4)   NOT NULL,
    CONSTRAINT "pk_orders_food" PRIMARY KEY (
        "order_food_id"
     )
);

CREATE TABLE "wallet" (
    "wallet_id" int(4)   NOT NULL,
    "wallet_balance" decimal(2,1)   NOT NULL,
    "customer_id" int(4)   NOT NULL,
    CONSTRAINT "pk_wallet" PRIMARY KEY (
        "wallet_id"
     )
);

ALTER TABLE "orders_details" ADD CONSTRAINT "fk_orders_details_customer_id" FOREIGN KEY("customer_id")
REFERENCES "customers" ("customer_id");

ALTER TABLE "orders_details" ADD CONSTRAINT "fk_orders_details_restaurant_id" FOREIGN KEY("restaurant_id")
REFERENCES "restaurant" ("restaurant_id");

ALTER TABLE "orders_details" ADD CONSTRAINT "fk_orders_details_employee_id" FOREIGN KEY("employee_id")
REFERENCES "zomato_employee" ("employee_id");

ALTER TABLE "payments" ADD CONSTRAINT "fk_payments_order_id" FOREIGN KEY("order_id")
REFERENCES "orders_details" ("order_id");

ALTER TABLE "orders_food" ADD CONSTRAINT "fk_orders_food_order_id" FOREIGN KEY("order_id")
REFERENCES "orders_details" ("order_id");

ALTER TABLE "orders_food" ADD CONSTRAINT "fk_orders_food_food_id" FOREIGN KEY("food_id")
REFERENCES "foods" ("food_id");

ALTER TABLE "orders_food" ADD CONSTRAINT "fk_orders_food_transaction_id" FOREIGN KEY("transaction_id")
REFERENCES "payments" ("transaction_id");

ALTER TABLE "wallet" ADD CONSTRAINT "fk_wallet_customer_id" FOREIGN KEY("customer_id")
REFERENCES "customers" ("customer_id");
