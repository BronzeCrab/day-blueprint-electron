export const getActiveDataAndDate = (data) => {
  const activeBoard = data.boards.filter((b) => b.status == 'active')[0];
  return [activeBoard, activeBoard.date]
}; 


export const setActiveDate = (date_str) => {
  const editJsonFile = require("edit-json-file");
  const file = editJsonFile(`${__dirname}/components/Boards/data.json`);
  file.set("boards.[0].date", date_str);
  file.save();
}