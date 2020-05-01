const { Op } = require('sequelize');
let Instruction;
let moduleError;

try {
  const db = require('../models');
  ({ Instruction } = db);
  if (Instruction === undefined) {
    moduleError = 'It looks like you need to generate the Instruction model.';
  }
} catch (e) {
  console.error(e);
  if (e.message.includes('Cannot find module')) {
    moduleError = 'It looks like you need initialize your project.';
  } else {
    moduleError = `An error was raised "${e.message}". Check the console for details.`;
  }
}
/* Don't change code above this line ******************************************/



async function createNewInstruction(specification, recipeId) {
  // Use the findAll method of the Instruction object to find all the
  // instructions for the specified recipe.
  const instructions = await Instruction.findAll({
    where: {
      recipeId
    }
  });
  [{ id: 1, specification: 'add flour', recipeId: 3, listOrder: 1 }]
  const listOrder = instructions.length === 0 ? 1 : instructions[instructions.length - 1].dataValues.listOrder + 1;
  console.log(instructions);
  // const listOrders = instructions.map(i => i.listOrder).concat(0);
  // const maxListOrder = Math.max(...listOrders);
  // const listOrder = maxListOrder + 1;
  // return await Instruction.create({ specification, recipeId, listOrder });
  // let listOrder;
  // if (instructions.length === 0){
  //   listOrder = 1;
  // }else{
  //   listOrder = instructions[instructions.length - 1].dataValues.listOrder + 1
  // }


  // Use the create method of the Instruction object to create a new object and
  // return it using the maximum listOrder from the query just before this.
  //
  // Docs: https://sequelize.org/v5/manual/instances.html#creating-persistent-instances
  return await Instruction.create({ specification, recipeId, listOrder });
}



/* Don't change code below this line ******************************************/
module.exports = {
  createNewInstruction,
  loadingDbError: moduleError,
};
