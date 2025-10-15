import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiagnosticReportProps {
  report: string;
}

export const DiagnosticReport = ({ report }: DiagnosticReportProps) => {
  const handleDownload = () => {
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnostic-report-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 bg-card border-border shadow-medium">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-light rounded-lg">
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Diagnostic Report</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="gap-2 border-border hover:bg-muted"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>

      <div className="prose prose-sm max-w-none">
        <div className="bg-muted/30 rounded-xl p-6 border border-border">
          <div className="space-y-4 text-foreground whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {report}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <span>AI-Generated Report • {new Date().toLocaleDateString()}</span>
      </div>
    </Card>
  );
};
