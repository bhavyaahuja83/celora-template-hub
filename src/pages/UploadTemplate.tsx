
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, FileImage, DollarSign, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMockAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const UploadTemplate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: '',
    demoUrl: '',
    sourceFiles: null as File | null,
    previewImages: [] as File[]
  });
  const [isUploading, setIsUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const { toast } = useToast();
  const { isAuthenticated } = useMockAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const categories = [
    { value: "web", label: "Web Templates" },
    { value: "flutter", label: "Flutter Apps" },
    { value: "android", label: "Android Apps" },
    { value: "ios", label: "iOS Apps" },
    { value: "ui-kit", label: "UI Kits" },
    { value: "desktop", label: "Desktop Apps" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files) return;
    
    if (field === 'sourceFiles') {
      setFormData(prev => ({ ...prev, sourceFiles: files[0] }));
    } else if (field === 'previewImages') {
      const newImages = Array.from(files).slice(0, 5); // Max 5 images
      setFormData(prev => ({ ...prev, previewImages: [...prev.previewImages, ...newImages].slice(0, 5) }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const removePreviewImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      previewImages: prev.previewImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.sourceFiles) {
      toast({
        title: "Source Files Required",
        description: "Please upload your template files.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Template Uploaded Successfully!",
        description: "Your template is now under review. You'll be notified once it's approved.",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        tags: '',
        demoUrl: '',
        sourceFiles: null,
        previewImages: []
      });
      setTags([]);
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your template. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout className="bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Upload Your Template
            </h1>
            <p className="text-xl text-gray-600">
              Share your creation with thousands of developers and earn 65% on every sale
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Template Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Template Title *</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="e.g., Modern E-commerce Dashboard"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description *</label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Describe your template, its features, and what makes it special..."
                          rows={4}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Category *</label>
                          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                          <Input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            placeholder="999"
                            min="0"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Demo URL (Optional)</label>
                        <Input
                          value={formData.demoUrl}
                          onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                          placeholder="https://your-demo-site.com"
                          type="url"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="Add a tag..."
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="cursor-pointer">
                            {tag}
                            <X className="w-3 h-3 ml-1" onClick={() => removeTag(tag)} />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Source Files *</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-600 mb-2">Upload your template files (.zip, .rar)</p>
                          <input
                            type="file"
                            accept=".zip,.rar"
                            onChange={(e) => handleFileUpload('sourceFiles', e.target.files)}
                            className="hidden"
                            id="source-files"
                          />
                          <Button type="button" variant="outline" asChild>
                            <label htmlFor="source-files" className="cursor-pointer">
                              Choose Files
                            </label>
                          </Button>
                          {formData.sourceFiles && (
                            <p className="mt-2 text-green-600">✓ {formData.sourceFiles.name}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Preview Images (Max 5)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <FileImage className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-gray-600 mb-2">Upload preview images (.jpg, .png)</p>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileUpload('previewImages', e.target.files)}
                            className="hidden"
                            id="preview-images"
                          />
                          <Button type="button" variant="outline" asChild>
                            <label htmlFor="preview-images" className="cursor-pointer">
                              Choose Images
                            </label>
                          </Button>
                        </div>
                        {formData.previewImages.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            {formData.previewImages.map((file, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-20 object-cover rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => removePreviewImage(index)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Template
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                    Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>You keep:</span>
                      <Badge className="bg-green-100 text-green-800">65%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform fee:</span>
                      <Badge variant="outline">35%</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Monthly payouts via PayPal or bank transfer
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="w-5 h-5 mr-2 text-purple-600" />
                    Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>✓ Original work only</div>
                  <div>✓ Clean, documented code</div>
                  <div>✓ Responsive design</div>
                  <div>✓ Browser compatibility</div>
                  <div>✓ Include documentation</div>
                  <div>✓ Test all functionality</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">~48 hours</div>
                    <div className="text-sm text-gray-600">Average review time</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadTemplate;
