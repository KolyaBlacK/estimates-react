function generateUniqueId() {
  return new Date().valueOf() + Math.floor(Math.random() * 10);
}

export default generateUniqueId;
