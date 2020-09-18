const db = require('./db');

const getUserConversations = async (userId) => {
    const result = await db.query(
        `SELECT * FROM chats WHERE (user_1 = $1 OR user_2 = $1) AND active = TRUE`,
        [userId]
    );
    return result.rows[0];
}

const isChatExists = async (chatId) => {
    let result;
    return await db.query(
        `SELECT count(chat_id) FROM chats
            WHERE chat_id = $1`,
        [chatId]
    );
}

const searchChat = async (senderId, receiverId) => {
    let result = await db.query(
        `SELECT chat_id FROM chats
        WHERE (user_1 = $2 AND user_2 = $1)
        OR (user_1 = $1 AND user_2 = $2)`,
        [senderId, receiverId]
    );
    return result.rows[0];
}

const createChat = async (senderId, receiverId) => {
    const result = await db.query(
        `INSERT INTO chats (user_1, user_2)
        VALUES($1, $2) RETURNING *;`,
        [senderId, receiverId]
    );
    return result.rows[0].chat_id;
}

const addMessage = async (chatId, senderId, content) => {
    const result = await db.query(
        `INSERT INTO messages (chat_id, sender_id, message)
        VALUES($1, $2, $3) RETURNING *;`,
        [chatId, senderId, content]
    );
    return result.rows[0].message_id;
}

const getChatMessages = async (chatId) => {
    const result = await db.query(
        `SELECT message, time_sent, sender_id,
        CASE WHEN sender_id = user_1 THEN user_2
        ELSE user_1 END AS receiver_id
        FROM messages
        JOIN chats ON chats.chat_id = messages.chat_id
        WHERE chats.chat_id = $1
        ORDER BY time_sent`,
        [chatId]
    )
    return result.rows;
}

module.exports = {
    getUserConversations,
    isChatExists,
    addMessage,
    createChat,
    getChatMessages,
    searchChat
};
