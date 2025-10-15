import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ImageAnalysis } from "@/components/ImageAnalysis";
import { Activity, Brain, FileText } from "lucide-react";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
    setAnalysisResult(null);
  };

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-primary-glow rounded-xl shadow-glow">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MedVision AI</h1>
              <p className="text-sm text-muted-foreground">Explainable Multi-Disease Diagnosis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-5 border border-border shadow-soft hover:shadow-medium transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-light rounded-lg">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Multi-Disease Detection</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Detects pneumonia, effusion, cardiomegaly, and more with high accuracy
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border shadow-soft hover:shadow-medium transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent-light rounded-lg">
                <Brain className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Explainable AI</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Grad-CAM heatmaps show exactly where the model focuses attention
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border shadow-soft hover:shadow-medium transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent-light rounded-lg">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Diagnostic Reports</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Automated generation of professional radiology summaries
            </p>
          </div>
        </div>

        {/* Main Analysis Area */}
        {!uploadedImage ? (
          <FileUpload onImageUpload={handleImageUpload} />
        ) : (
          <ImageAnalysis
            imageData={uploadedImage}
            isAnalyzing={isAnalyzing}
            analysisResult={analysisResult}
            onAnalysisStart={() => setIsAnalyzing(true)}
            onAnalysisComplete={handleAnalysisComplete}
            onReset={() => {
              setUploadedImage(null);
              setAnalysisResult(null);
              setIsAnalyzing(false);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-4">
          <p className="text-sm text-muted-foreground text-center">
            MedVision AI - Research Prototype for Educational Purposes Only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
