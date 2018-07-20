function findArray(array, id, experts) {
  let filterArray = experts;
  let activeExpertsArray = [];

  array.map((element) => activeExpertsArray.push(element.activeExpert));
  if (array.length) {
    filterArray = experts.filter(({id}) => activeExpertsArray.every(activeId => activeId !== id))
  }

  return filterArray;

}

export default findArray;
