
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  DollarSign, 
  Eye, 
  Download, 
  Settings, 
  TrendingUp,
  FileText,
  Star,
  Calendar
} from "lucide-react";
import { useMockAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const { isAuthenticated, user } = useMockAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  // Mock user data
  const stats = {
    totalEarnings: 12450,
    totalDownloads: 1850,
    totalTemplates: 8,
    avgRating: 4.7
  };

  const recentTemplates = [
    {
      id: 1,
      title: "Modern E-commerce Dashboard",
      downloads: 325,
      earnings: 4875,
      rating: 4.8,
      status: "published"
    },
    {
      id: 2,
      title: "Flutter Food Delivery App",
      downloads: 186,
      earnings: 2790,
      rating: 4.9,
      status: "published"
    },
    {
      id: 3,
      title: "Creative Portfolio Website",
      downloads: 412,
      earnings: 0,
      rating: 4.6,
      status: "published"
    },
    {
      id: 4,
      title: "Android Chat Application",
      downloads: 89,
      earnings: 1335,
      rating: 4.5,
      status: "under_review"
    }
  ];

  const transactions = [
    { id: 1, date: "2024-12-20", amount: 487, template: "E-commerce Dashboard", type: "sale" },
    { id: 2, date: "2024-12-19", amount: 279, template: "Food Delivery App", type: "sale" },
    { id: 3, date: "2024-12-18", amount: 1250, template: "Monthly Payout", type: "payout" },
    { id: 4, date: "2024-12-17", amount: 335, template: "Chat Application", type: "sale" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "under_review": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout className="bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || 'Creator'}!
              </h1>
              <p className="text-gray-600">Manage your templates and track your earnings</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 mt-4 md:mt-0" asChild>
              <Link to="/upload-template">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Template
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">₹{stats.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Downloads</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Download className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Templates</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalTemplates}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">My Templates</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTemplates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{template.title}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Download className="w-4 h-4 mr-1" />
                              {template.downloads} downloads
                            </span>
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1" />
                              {template.rating}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              ₹{template.earnings.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(template.status)}>
                            {template.status.replace('_', ' ')}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{transaction.template}</p>
                            <p className="text-sm text-gray-600">{transaction.date}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${
                              transaction.type === 'sale' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              +₹{transaction.amount}
                            </p>
                            <p className="text-sm text-gray-600 capitalize">{transaction.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payout Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Pending Earnings</span>
                        <span className="font-bold text-purple-600">₹2,847</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Next payout: January 15, 2025
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Payout Method:</span>
                        <span>PayPal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Minimum Payout:</span>
                        <span>₹50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Payout Schedule:</span>
                        <span>Monthly (15th)</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Update Payout Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>This Month's Downloads</span>
                        <span className="font-bold">247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>This Month's Earnings</span>
                        <span className="font-bold text-green-600">₹3,705</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Conversion Rate</span>
                        <span className="font-bold">12.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Profile Views</span>
                        <span className="font-bold">1,429</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Top Performing Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentTemplates.slice(0, 3).map((template, index) => (
                        <div key={template.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-purple-100 rounded text-xs flex items-center justify-center text-purple-600 mr-3">
                              {index + 1}
                            </div>
                            <span className="text-sm">{template.title}</span>
                          </div>
                          <span className="text-sm font-medium">{template.downloads} downloads</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
