CREATE TABLE "items" (
    "id" serial PRIMARY KEY,
    "name" varchar(20),
    "gender" varchar(6),
    "age" int,
    "ready_to_transfer" boolean,
    "notes" varchar(100)    
);


INSERT INTO "items" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES
    ('Scotty', 'M', 4, false, 'Born in Guatemala'),
    ('Jean', 'F', 5, false,'Allergic to lots of lava'),
    ('Ororo', 'F', 5 ,false,'Loves listening to Paula (Abdul)');

SELECT * FROM "items";