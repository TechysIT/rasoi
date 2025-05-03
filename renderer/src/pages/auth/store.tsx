import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@heroui/react";
import StoreCard from "@/components/StoreCard";
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import NoResultAnimation from "@/lottie/no-result.json";
import { useRouter } from "next/router";

interface Store {
  id: string;
  name: string;
}

export default function Stores() {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const organizationId = "b6eda0e5-579c-4f28-b4f3-c5cfb864c653";

  const router = useRouter();

  useEffect(() => {
    if (!organizationId) return null;
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await window.ipc.invoke("getStores", organizationId);

        if (Array.isArray(response)) {
          setStores(response);
        } else {
          setStores([]);
        }
      } catch (err) {
        // console.error("Error fetching stores:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [organizationId]);

  const handleProceed = () => {
    if (selectedStoreId) {
      router.push(`/auth/members?storeId=${selectedStoreId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl p-8">
        <h1 className="text-2xl text-customPrimary-500 font-semibold mb-6">
          Choose Store
        </h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center p-6">
            {/* Skeleton loader for each store card */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-36">
                <Skeleton className="h-32 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : stores.length === 0 ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={NoResultAnimation} className="w-60 h-60" />
            <p className="text-gray-600 mt-4">No stores found</p>
          </div>
        ) : (
          <ScrollArea className="h-72">
            <ScrollBar className="bg-customPrimary-50" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center p-6">
              {stores.map((store) => (
                <StoreCard
                  key={store.id}
                  name={store.name}
                  isSelected={store.id === selectedStoreId}
                  onSelect={() => setSelectedStoreId(store.id)}
                />
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Buttons */}
        <div className="flex justify-end mt-10 gap-4">
          <Button className="text-gray-600 bg-transparent border-gray-300 px-6">
            Cancel
          </Button>
          <Button
            size="sm"
            radius="sm"
            className="bg-customPrimary-500 text-white px-6"
            disabled={!selectedStoreId}
            onPress={handleProceed}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}
