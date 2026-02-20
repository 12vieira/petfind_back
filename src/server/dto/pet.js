function toPetDto(pet) {
  if (!pet) return pet;
  const plain = typeof pet.toJSON === 'function' ? pet.toJSON() : pet;

  const location = [plain.city, plain.state].filter(Boolean).join(', ');

  return {
    id: plain.id,
    ownerId: plain.ownerId,
    name: plain.name,
    species: plain.species,
    breed: plain.breed,
    sex: plain.sex,
    ageMonths: plain.ageMonths,
    description: plain.description,
    city: plain.city,
    state: plain.state,
    location,
    mainPhoto: plain.mainPhoto || null,
    additionalPhotos: Array.isArray(plain.additionalPhotos) ? plain.additionalPhotos : [],
    createdAt: plain.createdAt,
    updatedAt: plain.updatedAt,
  };
}

function toPetDtoList(pets) {
  if (!Array.isArray(pets)) return [];
  return pets.map(toPetDto);
}

module.exports = { toPetDto, toPetDtoList };
