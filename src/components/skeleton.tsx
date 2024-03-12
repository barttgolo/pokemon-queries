type Props = {
  number?: number;
};

export const Skeleton = ({ number = 5 }: Props) => {
  return [...Array(number).keys()].map((key) => (
    <div
      key={key}
      className="bg-slate-200 rounded-lg h-[296px] animate-pulse shadow-md"
    />
  ));
};
