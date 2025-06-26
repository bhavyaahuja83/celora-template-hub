
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  ThumbsUp, 
  Reply, 
  Search, 
  Plus,
  User,
  Calendar,
  Flag
} from "lucide-react";
import { toast } from "sonner";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "How to integrate React components with this dashboard template?",
      content: "I'm trying to integrate custom React components with the dashboard template I purchased. Has anyone done this before?",
      author: "john_dev",
      avatar: "/api/placeholder/40/40",
      timestamp: "2 hours ago",
      category: "Help",
      likes: 5,
      replies: 3,
      tags: ["React", "Dashboard", "Integration"]
    },
    {
      id: 2,
      title: "Best practices for customizing Flutter templates",
      content: "What are some best practices when customizing Flutter templates? Looking for advice on maintaining code quality.",
      author: "flutter_enthusiast",
      avatar: "/api/placeholder/40/40",
      timestamp: "1 day ago",
      category: "Discussion",
      likes: 12,
      replies: 8,
      tags: ["Flutter", "Best Practices", "Customization"]
    }
  ]);

  const [newPost, setNewPost] = useState({ title: "", content: "", category: "Help" });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: "current_user",
      avatar: "/api/placeholder/40/40",
      timestamp: "Just now",
      category: newPost.category,
      likes: 0,
      replies: 0,
      tags: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "Help" });
    setShowNewPostForm(false);
    toast.success("Post created successfully!");
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    toast.success("Post liked!");
  };

  const handleReport = (postId: number) => {
    toast.success("Post reported. Our moderators will review it.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Community Forum
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with other developers, ask questions, and share your knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    All Posts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Help
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Discussion
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Showcase
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Be respectful and professional</li>
                  <li>• Stay on topic</li>
                  <li>• No spam or self-promotion</li>
                  <li>• Help others when you can</li>
                  <li>• Report inappropriate content</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and New Post */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            {/* New Post Form */}
            {showNewPostForm && (
              <Card className="shadow-lg border-0 mb-8">
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="Post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    >
                      <option value="Help">Help</option>
                      <option value="Discussion">Discussion</option>
                      <option value="Showcase">Showcase</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    <Textarea
                      placeholder="What's on your mind?"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      rows={4}
                    />
                    <div className="flex gap-3">
                      <Button onClick={handleCreatePost} className="bg-purple-600 hover:bg-purple-700">
                        Post
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{post.author}</span>
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReport(post.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>

                    <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-gray-700 mb-4">{post.content}</p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="text-gray-600 hover:text-purple-600"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-purple-600"
                        >
                          <Reply className="w-4 h-4 mr-1" />
                          {post.replies} Replies
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
