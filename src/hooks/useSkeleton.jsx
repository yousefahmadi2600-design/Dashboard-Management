import { useEffect, useState } from "react";

export default function useSkeleton() {
    const [isLoading, setIsLoading] = useState(true);
      useEffect(() => {
        const timeout = setTimeout(() => {
          setIsLoading(false);
          return clearTimeout(timeout);
        }, 500);
      }, []);
      return isLoading
}