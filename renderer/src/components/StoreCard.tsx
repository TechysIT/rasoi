import Image from "next/image";

interface StoreCardProps {
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({
  name,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`w-24 h-28 flex flex-col items-center justify-between rounded-xl transition-all border shadow-xl  ${
        isSelected
          ? "border-customPrimary-500 ring-2 ring-customPrimary-500 "
          : ""
      }`}
    >
      <div className="flex items-center justify-center w-full min-h-20 flex-grow rounded-t-xl ">
        <Image src="/shop.png" alt="Shop Icon" width={42} height={42} />
      </div>
      <div
        className="w-full bg-customPrimary-100  font-semibold
      text-center capitalize py-1 rounded-b-xl text-sm truncate px-1"
      >
        {name}
      </div>
    </button>
  );
};

export default StoreCard;
