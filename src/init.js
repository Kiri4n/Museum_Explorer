const sqlite3 = require('sqlite3');
const dbname = "database.db";

let db = new sqlite3.Database(dbname, err => {
    if (err){
        throw err;
    }
    console.log("database ON");
})

function initDB(){
    let querry = '\
        CREATE TABLE IF NOT EXISTS medias(\
           id       INTEGER     NOT NULL        PRIMARY KEY     AUTOINCREMENT,\
           type     CHAR(2)     NOT NULL,\
           name     CHAR(255)   NOT NULL,\
           date     DATETIME    NOT NULL,\
           path     VARCHAR     NOT NULL,\
           hide     BOOLEAN     NOT NULL\
        );\
    ';
    db.run(querry);


    querry = '\
        CREATE TABLE IF NOT EXISTS tags(\
            id       INTEGER     NOT NULL        PRIMARY KEY     AUTOINCREMENT,\
            name     CHAR(255)   NOT NULL,\
            hide     BOOLEAN     NOT NULL\
        );\
    ';
    db.run(querry)


    querry = '\
        CREATE TABLE IF NOT EXISTS authors(\
            id       INTEGER     NOT NULL        PRIMARY KEY     AUTOINCREMENT,\
            name     CHAR(255)   NOT NULL,\
            hide     BOOLEAN     NOT NULL\
        );\
    ';
    db.run(querry)


    querry = '\
        CREATE TABLE IF NOT EXISTS media_tag(\
            id_media       INTEGER     NOT NULL,\
            id_tag         INTEGER     NOT NULL,\
            CONSTRAINT FK_media FOREIGN KEY (id_media) REFERENCES medias(id),\
            CONSTRAINT FK_tag FOREIGN KEY (id_tag) REFERENCES tags(id),\
            CONSTRAINT PK_media_tag PRIMARY KEY (id_media,id_tag)\
        );\
    ';
    db.run(querry)


    querry = '\
        CREATE TABLE IF NOT EXISTS media_author(\
            id_media     INTEGER     NOT NULL,\
            id_author    INTEGER     NOT NULL,\
            CONSTRAINT FK_media FOREIGN KEY (id_media) REFERENCES medias(id),\
            CONSTRAINT FK_author FOREIGN KEY (id_author) REFERENCES authors(id),\
            CONSTRAINT PK_media_tag PRIMARY KEY (id_media,id_author)\
        );\
    ';
    db.run(querry)


    querry = '\
        CREATE TABLE IF NOT EXISTS media_author(\
            id_author        INTEGER     NOT NULL,\
            id_group         INTEGER     NOT NULL,\
            CONSTRAINT FK_author FOREIGN KEY (id_author) REFERENCES authors(id),\
            CONSTRAINT FK_group FOREIGN KEY (id_group) REFERENCES groups(id),\
            CONSTRAINT PK_author_group PRIMARY KEY (id_author,id_group)\
        );\
    ';
    db.run(querry)


    querry = '\
        CREATE TABLE IF NOT EXISTS groups(\
            id       INTEGER     NOT NULL        PRIMARY KEY     AUTOINCREMENT,\
            name     CHAR(255)   NOT NULL,\
            date     DATETIME    NOT NULL,\
            hide     BOOLEAN     NOT NULL\
        );\
    ';
    db.run(querry)


    querry = '\
        CREATE TABLE IF NOT EXISTS media_group(\
            id_media        INTEGER     NOT NULL,\
            id_group        INTEGER     NOT NULL,\
            CONSTRAINT FK_media FOREIGN KEY (id_media) REFERENCES medias(id),\
            CONSTRAINT FK_group FOREIGN KEY (id_group) REFERENCES groups(id),\
            CONSTRAINT PK_media_group PRIMARY KEY (id_media,id_group)\
        );\
    ';
    db.run(querry)


    querry = '\
        CREATE TABLE IF NOT EXISTS group_group(\
            id_group_parent     INTEGER     NOT NULL,\
            id_group_child      INTEGER     NOT NULL,\
            CONSTRAINT FK_group_parent FOREIGN KEY (id_group_parent) REFERENCES groups(id),\
            CONSTRAINT FK_group_child FOREIGN KEY (id_group_child) REFERENCES groups(id),\
            CONSTRAINT PK_group_parent_child PRIMARY KEY (id_group_parent,id_group_child)\
        );\
    ';
    db.run(querry)
}

module.exports = { initDB };