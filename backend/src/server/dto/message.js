function toMessageDto(message) {
  if (!message) return message;
  const plain = typeof message.toJSON === 'function' ? message.toJSON() : message;

  return {
    id: plain.id,
    matchId: plain.matchId,
    senderId: plain.senderId,
    text: plain.text,
    createdAt: plain.createdAt,
  };
}

function toMessageDtoList(messages) {
  if (!Array.isArray(messages)) return [];
  return messages.map(toMessageDto);
}

module.exports = { toMessageDto, toMessageDtoList };
