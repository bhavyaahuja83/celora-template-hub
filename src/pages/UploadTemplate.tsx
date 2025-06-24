
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, FileText, Tag, DollarSign, Eye, X, Plus, Info } from "lucide-react";
import { toast } from "sonner";

const UploadTemplatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    tags: [] as string[],
    templateFile: null as File | null,
    screenshots: [] as File[]
  });

  const [tagInput, setTagInput] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currency, setCurrency] = useState("₹"); // This will be auto-detected

  // Mock function to detect user location and set currency
  const detectCurrency = () => {
    // This would use IP detection or browser locale in real implementation
    const locale = navigator.language;
    return locale.startsWith('en-IN') || locale.includes('IN') ? "₹" : "$";
  };

  useState(() => {
    setCurrency(detectCurrency());
  });

  const categories = [
    "Web Applications",
    "Flutter Apps", 
    "Android Apps",
    "UI Components",
    "Dashboard Templates",
    "Landing Pages",
    "E-commerce",
    "Admin Panels"
  ];

  const popularTags = [
    "responsive", "modern", "dashboard", "ecommerce", "portfolio", 
    "landing-page", "admin", "mobile-first", "dark-mode", "minimal"
  ];

  const handleTemplateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error("File size should be less than 100MB");
        return;
      }
      if (!file.name.endsWith('.zip')) {
        toast.error("Please upload a ZIP file");
        return;
      }
      setFormData(prev => ({ ...prev, templateFile: file }));
      toast.success("Template file uploaded successfully!");
    }
  };

  const handleScreenshotsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.screenshots.length > 3) {
      toast.error("Maximum 3 screenshots allowed");
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 10MB per image.`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file.`);
        return false;
      }
      return true;
    });

    const newPreviews: string[] = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviews.push(event.target?.result as string);
        if (newPreviews.length === validFiles.length) {
          setPreviewImages(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setFormData(prev => ({ 
      ...prev, 
      screenshots: [...prev.screenshots, ...validFiles] 
    }));
  };

  const removeScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.templateFile) {
      toast.error("Please upload a template file");
      return;
    }

    // Mock upload function - replace with actual API call
    try {
      toast.success("Template uploaded successfully! It will be reviewed within 24-48 hours.");
      console.log("Template upload data:", formData);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        tags: [],
        templateFile: null,
        screenshots: []
      });
      setPreviewImages([]);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Upload Your Template
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Share your amazing work with thousands of developers worldwide
          </p>
          
          {/* Earning Banner */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-green-800">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">Earn 65% on every sale. Your template, your price.</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-purple-600" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Template Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Modern Dashboard UI Kit"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your template, its features, and what makes it special..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="mt-1 min-h-32"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="price">Price ({currency}) *</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                          {currency}
                        </span>
                        <Input
                          id="price"
                          type="number"
                          placeholder="1999"
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-purple-600" />
                    Tags & Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Add Tags</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(tagInput);
                          }
                        }}
                      />
                      <Button type="button" onClick={() => addTag(tagInput)} disabled={!tagInput}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Popular Tags */}
                  <div>
                    <Label className="text-sm text-gray-600">Popular Tags:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularTags.map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addTag(tag)}
                          disabled={formData.tags.includes(tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Current Tags */}
                  {formData.tags.length > 0 && (
                    <div>
                      <Label className="text-sm text-gray-600">Your Tags:</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* File Uploads */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-purple-600" />
                    Files & Screenshots
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Template File */}
                  <div>
                    <Label htmlFor="template-file">Template File (.zip) *</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <Input
                        id="template-file"
                        type="file"
                        accept=".zip"
                        onChange={handleTemplateFileUpload}
                        className="hidden"
                        required
                      />
                      <Label htmlFor="template-file" className="cursor-pointer">
                        <span className="text-purple-600 font-medium">Click to upload</span> or drag and drop
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        ZIP files up to 100MB
                      </p>
                      {formData.templateFile && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {formData.templateFile.name} uploaded
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Screenshots */}
                  <div>
                    <Label htmlFor="screenshots">Preview Screenshots (Optional)</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <Input
                        id="screenshots"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleScreenshotsUpload}
                        className="hidden"
                      />
                      <Label htmlFor="screenshots" className="cursor-pointer">
                        <span className="text-purple-600 font-medium">Click to upload</span> or drag and drop
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG up to 10MB each. Maximum 3 images.
                      </p>
                    </div>

                    {/* Screenshot Previews */}
                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {previewImages.map((preview, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={preview} 
                              alt={`Screenshot ${index + 1}`} 
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeScreenshot(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-lg border-0 sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-purple-600" />
                    Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {previewImages.length > 0 ? (
                      <img 
                        src={previewImages[0]} 
                        alt="Template preview" 
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-lg">
                        {formData.title || "Template Title"}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {formData.description || "Template description will appear here..."}
                      </p>
                    </div>

                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="font-bold text-purple-600">
                        {currency}{formData.price || '0'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Upload Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>• Ensure your code is well-documented</p>
                  <p>• Include setup instructions</p>
                  <p>• Test your template thoroughly</p>
                  <p>• Use high-quality preview images</p>
                  <p>• Follow best coding practices</p>
                  <p>• Include a README file</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <Card className="shadow-lg border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>By uploading, you agree to our <a href="#" className="text-purple-600 hover:underline">Terms of Service</a></p>
                  <p>Your template will be reviewed within 24-48 hours</p>
                </div>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-3"
                >
                  Submit Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default UploadTemplatePage;
