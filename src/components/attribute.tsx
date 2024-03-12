type Props = {
  name: string;
  value: string;
};

export const Attribute = ({ name, value }: Props) => {
  return (
    <div>
      {name}: <span className="font-semibold">{value}</span>
    </div>
  );
};
