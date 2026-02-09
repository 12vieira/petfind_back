function toMatchDto(match) {
  if (!match) return match;
  const plain = typeof match.toJSON === 'function' ? match.toJSON() : match;

  return {
    id: plain.id,
    petAId: plain.petAId,
    petBId: plain.petBId,
    status: plain.status,
    createdAt: plain.createdAt,
    updatedAt: plain.updatedAt,
  };
}

function toMatchDtoList(matches) {
  if (!Array.isArray(matches)) return [];
  return matches.map(toMatchDto);
}

module.exports = { toMatchDto, toMatchDtoList };
