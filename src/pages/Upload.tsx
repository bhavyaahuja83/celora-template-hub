
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, FileText, Tag, DollarSign, Eye } from "lucide-react";
import { toast } from "sonner";

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    tags: "",
    files: null as FileList | null,
    images: null as FileList | null
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'files' | 'images') => {
    const files = e.target.files;
    if (files) {
      setFormData(prev => ({ ...prev, [type]: files }));
      
      if (type === 'images' && files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target?.result as string);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally upload to your backend/Supabase
    toast.success("Template uploaded successfully! It will be reviewed shortly.");
    console.log("Template data:", formData);
  };

  const categories = [
    "Web Applications",
    "Mobile Apps", 
    "Desktop Apps",
    "UI Components",
    "Dashboard Templates",
    "Landing Pages",
    "E-commerce",
    "Admin Panels"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Upload Your Template
          </h1>
          <p className="text-xl text-gray-600">
            Share your amazing work with thousands of developers worldwide
          </p>
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
                      <Label htmlFor="price">Price (₹) *</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="1999"
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="relative mt-1">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="tags"
                        placeholder="React, Dashboard, Modern, Responsive (comma separated)"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Add relevant tags to help users find your template
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* File Uploads */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-purple-600" />
                    Files & Assets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="files">Template Files (.zip) *</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <Input
                        id="files"
                        type="file"
                        accept=".zip,.rar"
                        onChange={(e) => handleFileUpload(e, 'files')}
                        className="hidden"
                        required
                      />
                      <Label htmlFor="files" className="cursor-pointer">
                        <span className="text-purple-600 font-medium">Click to upload</span> or drag and drop
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        ZIP or RAR files up to 100MB
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="images">Preview Images *</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                      <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileUpload(e, 'images')}
                        className="hidden"
                        required
                      />
                      <Label htmlFor="images" className="cursor-pointer">
                        <span className="text-purple-600 font-medium">Click to upload</span> or drag and drop
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG up to 10MB each. First image will be the thumbnail.
                      </p>
                    </div>
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
                    {preview ? (
                      <img 
                        src={preview} 
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

                    {formData.tags && (
                      <div className="flex flex-wrap gap-1">
                        {formData.tags.split(',').map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="font-bold text-purple-600">
                        ₹{formData.price || '0'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Upload Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>• Ensure your code is well-documented</p>
                  <p>• Include setup instructions</p>
                  <p>• Test your template thoroughly</p>
                  <p>• Use high-quality preview images</p>
                  <p>• Follow best coding practices</p>
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

export default UploadPage;
