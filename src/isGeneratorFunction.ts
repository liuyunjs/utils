import is from 'is-generator';

export const isGeneratorFunction: (fn: any) => fn is GeneratorFunction = is.fn;
