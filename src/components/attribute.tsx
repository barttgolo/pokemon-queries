type Props = {
  name: string;
  value: string | number;
};

export const Attribute = ({ name, value }: Props) => {
  return (
    <div>
      {name}: <span className="font-semibold">{value}</span>
    </div>
  );
};
