const db = require('./db');

const getUserConversations = async userId => {
    const result = await db.query(
        `SELECT chats.chat_id,
        CASE WHEN user_1 = $1 THEN user_2
        ELSE user_1 END AS partner_id,
        users.username AS partner_username,
        users.profile_pic_path AS avatar,
        m1.message AS last_message, m1.time_sent, m1.sender_id
        FROM chats JOIN users ON users.user_id = CASE
        WHEN user_1 = $1 THEN user_2 ELSE user_1 END
        LEFT JOIN messages m1 ON chats.chat_id = m1.chat_id
        AND m1.message_id = (
            SELECT MAX(m2.message_id)
            FROM messages m2
            WHERE m2.chat_id = chats.chat_id
        )
        WHERE (user_1 = $1 OR user_2 = $1) AND active = TRUE`,
        [userId]
    );
    return result.rows;
};

const isChatExists = async chatId => {
    return await db.query(
        `SELECT count(chat_id) FROM chats
            WHERE chat_id = $1`,
        [chatId]
    );
};

const searchChat = async (senderId, receiverId) => {
    let result = await db.query(
        `SELECT chat_id FROM chats
        WHERE (user_1 = $2 AND user_2 = $1)
        OR (user_1 = $1 AND user_2 = $2)`,
        [senderId, receiverId]
    );
    return result.rows[0];
};

const createChat = async (senderId, receiverId) => {
    const result = await db.query(
        `INSERT INTO chats (user_1, user_2)
        VALUES($1, $2) RETURNING *;`,
        [senderId, receiverId]
    );
    return result.rows[0].chat_id;
};

const addMessage = async (chatId, senderId, content) => {
    const result = await db.query(
        `INSERT INTO messages (chat_id, sender_id, message)
        VALUES($1, $2, $3) RETURNING *;`,
        [chatId, senderId, content]
    );
    return result.rows[0].message_id;
};

const getChatMessages = async (chatId, userId) => {
    const result = await db.query(
        `SELECT message_id AS id, message, time_sent, sender_id,
        CASE WHEN sender_id = user_1 THEN user_2
        ELSE user_1 END AS receiver_id,
        CASE WHEN sender_id = $2 THEN true
        ELSE false END AS mine
        FROM messages
        JOIN chats ON chats.chat_id = messages.chat_id
        WHERE chats.chat_id = $1
        ORDER BY time_sent`,
        [chatId, userId]
    );
    return result.rows;
};

module.exports = {
    getUserConversations,
    isChatExists,
    addMessage,
    createChat,
    getChatMessages,
    searchChat,
};
