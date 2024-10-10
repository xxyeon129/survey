interface UseLengthCheckProps {
  array: string[];
  condition: (el: string) => boolean;
}

export default function useLengthCheck (props: UseLengthCheckProps) {
  return props.array.some(el => props.condition(el));
}