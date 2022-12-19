const generateNumbers = (count, initialNumbers = [], maxNumber = 4) => {
  const generatedNumber = Math.round(Math.random() * (maxNumber - 1));
  if (count === 1) {
    if (initialNumbers.includes(generatedNumber)) return generateNumbers(count, initialNumbers);
    return [...initialNumbers, generatedNumber];
  }
  if (initialNumbers.includes(generatedNumber)) return generateNumbers(count, initialNumbers);
  return generateNumbers(count - 1, [...initialNumbers, generatedNumber]);
};

const generateBones = (count, bombIndex = []) => [...new Array(count)].map((_, index) => ({
  id: index,
  isBomb: bombIndex.includes(index),
  taken: false,
  side: index % 4,
}));

export { generateNumbers, generateBones };
