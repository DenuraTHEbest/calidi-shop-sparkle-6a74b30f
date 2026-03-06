import { useEffect, useState } from "react";
import { getRecommendations, type Recommendation } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  productId: string;
}

export default function Recommendations({ productId }: Props) {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRecommendations(productId, 4)
      .then(setRecs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <section className="mt-16">
        <h2 className="font-display text-2xl text-foreground mb-6">
          You may also like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full" />
          ))}
        </div>
      </section>
    );
  }

  if (!recs.length) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl text-foreground mb-6">
        You may also like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recs.map((rec) => (
          <Card key={rec.p_id} className="overflow-hidden border-border">
            <CardContent className="p-0">
              {rec.image_base64 && (
                <img
                  src={`data:image/jpeg;base64,${rec.image_base64}`}
                  alt={rec.name}
                  className="w-full aspect-[3/4] object-cover"
                />
              )}
              <div className="p-4 space-y-1">
                <h3 className="font-display text-sm font-medium text-foreground">
                  {rec.name}
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  {rec.brand}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  Match: {(rec.similarity_score * 100).toFixed(0)}%
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
