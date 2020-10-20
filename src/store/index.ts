
// @ts-nocheck
const context: any = require['context']('./model', false, /\.ts$/);
const getModel: Array = context.keys().map(key => context(key));
const Store = {};

getModel.forEach(model => {
  Store[model.default.title] = model.default;
});

export default Store;
