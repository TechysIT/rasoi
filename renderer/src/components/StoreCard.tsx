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
      className={`w-24 h-28 flex flex-col items-center justify-between rounded-lg transition-all border border-gray-300 shadow-sm bg-customPrimary-50/50 ${
        isSelected
          ? "border-customPrimary-500 ring-2 ring-customPrimary-500 shadow-md"
          : ""
      }`}
    >
      <div className="flex items-center justify-center w-full h-20 flex-grow rounded-t-lg">
        <Image src="/shop.png" alt="Shop Icon" width={42} height={42} />
      </div>
      <div className="w-full bg-customPrimary-200/80 text-center py-1 rounded-b-lg text-sm truncate px-1">
        {name}
      </div>
    </button>
  );
};

export default StoreCard;
