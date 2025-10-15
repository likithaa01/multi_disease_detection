import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DiseaseResults } from "./DiseaseResults";
import { DiagnosticReport } from "./DiagnosticReport";
import { HeatmapOverlay } from "./HeatmapOverlay";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageAnalysisProps {
  imageData: string;
  isAnalyzing: boolean;
  analysisResult: any;
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: any) => void;
  onReset: () => void;
}

export const ImageAnalysis = ({
  imageData,
  isAnalyzing,
  analysisResult,
  onAnalysisStart,
  onAnalysisComplete,
  onReset,
}: ImageAnalysisProps) => {
  const { toast } = useToast();

  const handleAnalyze = async () => {
    onAnalysisStart();

    try {
      const { data, error } = await supabase.functions.invoke("analyze-xray", {
        body: { imageData },
      });

      if (error) throw error;

      onAnalysisComplete(data);
      toast({
        title: "Analysis complete",
        description: "Diagnostic results are ready",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      onAnalysisComplete(null);
    }
  };

  useEffect(() => {
    if (!analysisResult && !isAnalyzing) {
      handleAnalyze();
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onReset}
          className="gap-2 border-border hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" />
          Upload New Image
        </Button>

        {!isAnalyzing && !analysisResult && (
          <Button
            onClick={handleAnalyze}
            className="gap-2 bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
          >
            <Sparkles className="w-4 h-4" />
            Analyze X-ray
          </Button>
        )}
      </div>

      {/* Image Display & Heatmap */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border shadow-medium">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Original X-ray</h3>
          <div className="rounded-xl overflow-hidden bg-muted/30">
            <img
              src={imageData}
              alt="Uploaded X-ray"
              className="w-full h-auto"
            />
          </div>
        </Card>

        <HeatmapOverlay
          imageData={imageData}
          heatmapData={analysisResult?.heatmap}
          isLoading={isAnalyzing}
        />
      </div>

      {/* Analysis Results */}
      {isAnalyzing && (
        <Card className="p-12 bg-card border-border shadow-medium">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Analyzing X-ray...
              </h3>
              <p className="text-muted-foreground">
                AI is examining the image for diagnostic patterns
              </p>
            </div>
          </div>
        </Card>
      )}

        {analysisResult && (
          <>
            <DiseaseResults 
              diseases={analysisResult.diseases} 
              modelAccuracy={analysisResult.modelAccuracy}
              detectionConfidence={analysisResult.detectionConfidence}
            />
            <DiagnosticReport report={analysisResult.report} />
          </>
        )}
    </div>
  );
};
