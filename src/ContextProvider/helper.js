export default function categorizeObjects(data) {
  const categories = { crypto: [], nonCrypto: [] };

  data.forEach((object) => {
    const { asset_id, name, type_is_crypto } = object;
    const filteredObject = { asset_id, name, type_is_crypto };

    if (type_is_crypto === 1) {
      categories.crypto.push(filteredObject);
    } else {
      categories.nonCrypto.push(filteredObject);
    }
  });

  // Sort nonCrypto currencies to be able to see better by 'name' property
  categories.nonCrypto.sort((a, b) => a.name.localeCompare(b.name));

  return categories;
}
