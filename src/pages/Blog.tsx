
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Introducing Celora: The Future of Template Marketplaces",
      excerpt: "Today marks a milestone in our journey to revolutionize how developers and designers collaborate through premium templates.",
      date: "Dec 15, 2024",
      category: "Announcement",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Flutter Template Collection Now Available",
      excerpt: "Discover our latest collection of Flutter templates designed for modern mobile applications.",
      date: "Dec 10, 2024",
      category: "Product Update",
      readTime: "2 min read"
    },
    {
      id: 3,
      title: "Creator Spotlight: Building Successful Templates",
      excerpt: "Learn from our top creators about what makes a template successful and how to maximize your earnings.",
      date: "Dec 5, 2024",
      category: "Creator Stories",
      readTime: "5 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Celora Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, product updates, and insights from the Celora community.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {blogPosts.length > 0 ? (
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">More Content Coming Soon</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working on bringing you the latest updates, tutorials, and insights. Check back soon for our first blog posts!
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Want to Contribute?</h3>
          <p className="mb-6 opacity-90">
            Have a story to share or insights about template creation? We'd love to feature your content on our blog.
          </p>
          <a 
            href="mailto:blog@celora.com" 
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
