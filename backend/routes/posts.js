var express = require('express');
const db = require('../db');
var router = express.Router();


router.get('/', function (req, res, next) {
    db.all(`SELECT 
        p.id id, local, especie, sexo, descricao, foto, user_id, u.name userName
    FROM posts p JOIN users u ON user_id = u.id`, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json(rows.map((row) => {
            return {
                id: row.id,
                local: row.local,
                especie: row.especie,
                sexo: row.sexo,
                descricao: row.descricao,
                foto: row.foto,
                user: {
                    id: row.user_id,
                    name: row.userName
                }
            };
        }));
    });
}
);


router.post('/', function (req, res, next) {
    db.run(`INSERT INTO posts 
        (user_id, local, especie, sexo, descricao, foto) VALUES 
        (?, ?, ?, ?, ?, ?)`, [
        req.user.id,
        req.body.local,
        req.body.especie,
        req.body.sexo,
        req.body.descricao,
        req.body.foto
    ], function (err) {
        if (err) {
            return next(err);
        }

        res.json({ id: this.lastID });
    });
});


router.put('/:id', async function (req, res, next) {

    const postId = req.params.id;

    if (req.user.isAdmin) {
        return updatePost(req, res, next);
    }
    const { postExists, isOwner } = await isPostOwner(req.user.id, postId);
    if (!postExists) {
        return res.send(404, { message: `A Postagem informada não foi encontrada` });
    }

    if (!isOwner) {
        return res.send(403, { message: 'Não é possível atualizar Postagem de outros usuários.' });
    }
    updatePost(req, res, next);
});

router.delete('/:id', async function (req, res, next) {

    const postId = req.params.id;

    if (req.user.isAdmin) {
        return deletePost(postId, next, res);
    }
    const { postExists, isOwner } = await isPostOwner(req.user.id, postId);
    if (!postExists) {
        return res.send(404, { message: `a Postagem informada não foi encontrada` });
    }

    if (!isOwner) {
        return res.send(403, { message: 'Não é possível deletar Postagem de outros usuários.' });
    }
    deletePost(postId, next, res);
});



module.exports = router;

function isPostOwner(userId, postId) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT user_id FROM posts WHERE id = ?`, [postId], function (err, result) {
            if (err) {
                resolve({ postExists: false, isOwner: false });
            }
            resolve({ postExists: true, isOwner: userId === result['user_id'] })
        });
    });
}

function updatePost(req, res, next) {

    const entries = Object.entries(req.body);

    sqlToExecute = `UPDATE posts SET `;

    const updateQuery = [...entries.values()].map(k => ` ${k[0]} = ?`).join(',');

    sqlToExecute += updateQuery;

    sqlToExecute += ` WHERE id = ?`;

    db.run(sqlToExecute, [
        ...[...entries.values()].map(k => k[1]),
        req.params.id
    ], function (err) {
        if (err) {
            return next(err);
        }
        res.sendStatus(200);
    });

}

function deletePost(postId, next, res) {
    db.run(`DELETE FROM posts WHERE id = ?`, [postId], function (err) {
        if (err) {
            return next(err);
        }
        res.sendStatus(200);
    });
}

