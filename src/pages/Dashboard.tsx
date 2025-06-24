
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Download, 
  DollarSign, 
  Eye, 
  Edit, 
  Trash2,
  TrendingUp,
  Users,
  Star,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats] = useState({
    totalEarnings: 45680,
    totalDownloads: 2340,
    totalTemplates: 12,
    totalViews: 15670
  });

  const templates = [
    {
      id: "1",
      title: "Modern Dashboard UI Kit",
      price: 2999,
      downloads: 245,
      earnings: 7347750,
      views: 1240,
      status: "approved",
      uploadDate: "2024-12-15",
      image: "/api/placeholder/80/60"
    },
    {
      id: "2",
      title: "E-commerce Mobile App",
      price: 3999,
      downloads: 156,
      earnings: 623844,
      views: 890,
      status: "pending",
      uploadDate: "2024-12-20",
      image: "/api/placeholder/80/60"
    }
  ];

  const recentActivity = [
    { type: "download", template: "Dashboard UI Kit", amount: 2999, date: "2 hours ago" },
    { type: "view", template: "Mobile App Template", date: "4 hours ago" },
    { type: "download", template: "Landing Page Kit", amount: 1999, date: "1 day ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Celora
              </h1>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/upload">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Template
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Here's how your templates are performing</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700">+12%</Badge>
              </div>
              <h3 className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Total Earnings</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">+8%</Badge>
              </div>
              <h3 className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Total Downloads</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700">+2</Badge>
              </div>
              <h3 className="text-2xl font-bold">{stats.totalTemplates}</h3>
              <p className="text-gray-600 text-sm">Templates</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">+15%</Badge>
              </div>
              <h3 className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Total Views</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates Management */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="templates">My Templates</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>My Templates</CardTitle>
                      <Link to="/upload">
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700">
                          <Upload className="w-4 h-4 mr-2" />
                          Add New
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {templates.map((template) => (
                        <div key={template.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <img 
                            src={template.image} 
                            alt={template.title}
                            className="w-20 h-15 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{template.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span>₹{template.price.toLocaleString()}</span>
                              <span>{template.downloads} downloads</span>
                              <span>{template.views} views</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={template.status === 'approved' ? 'default' : 'secondary'}
                              className={template.status === 'approved' ? 'bg-green-100 text-green-700' : ''}
                            >
                              {template.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Analytics dashboard coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="earnings" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">₹{stats.totalEarnings.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Total Earnings</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">₹12,500</div>
                          <div className="text-sm text-gray-600">This Month</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'download' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {activity.type === 'download' ? (
                          <Download className="w-4 h-4 text-green-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.template}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{activity.date}</span>
                          {activity.amount && (
                            <>
                              <span>•</span>
                              <span className="text-green-600">+₹{activity.amount.toLocaleString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/upload">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Template
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Get Featured
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
