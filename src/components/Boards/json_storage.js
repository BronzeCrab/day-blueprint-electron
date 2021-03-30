export const getActiveDataAndDate = (data) => {
  const activeBoard = data.boards.filter((b) => b.status === 'active')[0];
  if (activeBoard === undefined) {
    return undefined
  }
  return [activeBoard, activeBoard.date]
}; 


export const setActiveBoard = (date_str) => {
  const editJsonFile = require("edit-json-file");
  const file = editJsonFile(`${__dirname}/components/Boards/data.json`);
  const obj ={ id: 1, status: "active", date: date_str, lanes: [] };
  file.append("boards", obj);
  file.save();
  return obj
}