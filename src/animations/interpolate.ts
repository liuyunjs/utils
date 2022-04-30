import { isAnyObject } from '../isAnyObject';

type Extrapolation = 'clamp' | 'extend';

interface ExtrapolationConfig {
  left?: Extrapolation;
  right?: Extrapolation;
}

export interface IInterpolateConfig {
  input: number[];
  output: number[];
  extrapolation?: ExtrapolationConfig | Extrapolation;
}

export const interpolate = ({
  input,
  output,
  extrapolation,
}: IInterpolateConfig) => {
  let extrapolationLeft: Extrapolation, extrapolationRight: Extrapolation;

  extrapolationLeft = extrapolationRight = 'extend';

  if (isAnyObject(extrapolation)) {
    extrapolationLeft =
      (extrapolation as ExtrapolationConfig).left || extrapolationLeft;
    extrapolationRight =
      (extrapolation as ExtrapolationConfig).right || extrapolationRight;
  } else {
    extrapolationLeft = extrapolationRight =
      (extrapolation as Extrapolation) || extrapolationLeft;
  }

  let len = input.length;

  if (len !== output.length) {
    throw new Error('input 跟 output 数组长度应该一样');
  }

  return (curr: number) => {
    if (len < 2) return curr;
    let startIndex: number;
    if (curr < input[0]) {
      if (extrapolationLeft === 'clamp') return output[0];
      startIndex = 0;
    }
    if (curr > input[len - 1]) {
      if (extrapolationRight === 'clamp') return output[len - 1];
      startIndex = len - 2;
    } else {
      startIndex = 0;
      while (startIndex < len - 1) {
        if (input[startIndex] <= curr && input[startIndex + 1] >= curr) {
          break;
        }
        startIndex++;
      }
    }

    const inputDistance = input[startIndex + 1] - input[startIndex];
    const outputDistance = output[startIndex + 1] - output[startIndex];

    const distance = curr - input[startIndex];
    return (distance / inputDistance) * outputDistance + output[startIndex];
  };
};
