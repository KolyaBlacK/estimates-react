function findStateArray(array, divisionId, experts, expertValue) {
  let tempArray = array.slice();
  let activeExpertsArray = [];

  tempArray.map((element) => activeExpertsArray.push(element.activeExpert));

  if (array.length) {
    tempArray.map((element) => {
      if (element.id !== divisionId) {
        if (element.activeExpert === expertValue) {
          const filterExperts = experts.filter(({id}) => activeExpertsArray.every(activeId => activeId !== id));
          element.filterExperts = filterExperts;
          element.activeExpert = filterExperts[0].id;
        }
      }
    })
  }
  return tempArray;
}

export default findStateArray;
