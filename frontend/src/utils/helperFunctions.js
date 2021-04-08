
export const getQueryString = (query) => {
  let createQuery = "";
  for (let i = 0; i <= query.length - 1; i++) {
    if (createQuery != "") {
      createQuery = createQuery + "&&";
    }
    if (query[i].value != "") {
      createQuery = createQuery + query[i].key + "=" + query[i].value;
    }
  }
  return createQuery;
};
