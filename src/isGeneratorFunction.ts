export const isGeneratorFunction: (fn: any) => fn is GeneratorFunction =
  require('is-generator').fn;
