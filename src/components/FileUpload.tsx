import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onImageUpload: (imageData: string) => void;
}

export const FileUpload = ({ onImageUpload }: FileUploadProps) => {
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 20MB",
          variant: "destructive",
        });
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        onImageUpload(base64);
        toast({
          title: "Image uploaded",
          description: "Ready for analysis",
        });
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer
          transition-all duration-300 bg-card/50 backdrop-blur-sm
          ${
            isDragActive
              ? "border-primary bg-primary-light/20 shadow-glow"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-6">
          <div
            className={`
            p-6 rounded-2xl transition-all duration-300
            ${
              isDragActive
                ? "bg-gradient-to-br from-primary to-primary-glow shadow-glow scale-110"
                : "bg-gradient-to-br from-muted to-muted/50"
            }
          `}
          >
            {isDragActive ? (
              <FileImage className="w-16 h-16 text-primary-foreground" />
            ) : (
              <Upload className="w-16 h-16 text-primary" />
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              {isDragActive ? "Drop your X-ray here" : "Upload Chest X-ray"}
            </h2>
            <p className="text-muted-foreground">
              Drag and drop or click to select an image
            </p>
            <p className="text-sm text-muted-foreground/70">
              Supports JPG, PNG, WEBP (Max 20MB)
            </p>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>High Resolution</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-low-risk rounded-full" />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
