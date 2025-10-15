import { Card } from "@/components/ui/card";
import { Loader2, Flame } from "lucide-react";

interface HeatmapOverlayProps {
  imageData: string;
  heatmapData?: string;
  isLoading: boolean;
}

export const HeatmapOverlay = ({
  imageData,
  heatmapData,
  isLoading,
}: HeatmapOverlayProps) => {
  return (
    <Card className="p-6 bg-card border-border shadow-medium">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-accent-light rounded-lg">
          <Flame className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Grad-CAM Heatmap</h3>
      </div>

      <div className="rounded-xl overflow-hidden bg-muted/30 relative">
        {isLoading ? (
          <div className="aspect-square flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Generating heatmap...</p>
            </div>
          </div>
        ) : heatmapData ? (
          <div className="relative">
            <img src={imageData} alt="X-ray base" className="w-full h-auto" />
            <img
              src={heatmapData}
              alt="Attention heatmap"
              className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply"
            />
          </div>
        ) : (
          <div className="aspect-square flex items-center justify-center">
            <img src={imageData} alt="X-ray" className="w-full h-auto opacity-50" />
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          Heatmap highlights regions that influenced the AI's diagnostic decision
        </p>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            <span className="text-muted-foreground">Low Attention</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full" />
            <span className="text-muted-foreground">High Attention</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
