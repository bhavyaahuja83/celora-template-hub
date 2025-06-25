
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            About Celora
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing how developers and designers find, share, and monetize premium templates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Celora, we believe that great design should be accessible to everyone. Our mission is to create the world's most comprehensive marketplace for premium templates, connecting talented creators with developers who need high-quality starting points for their projects.
            </p>
            <p className="text-gray-600 mb-6">
              We're building a platform where creativity meets functionality, where designers can earn from their work, and where developers can accelerate their projects with beautiful, well-coded templates.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link to="/creator-info">Start Selling Templates</Link>
            </Button>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Built for Creators</h3>
            <p className="text-gray-600">
              Earn 65% on every sale and reach thousands of developers worldwide looking for your templates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality First</h3>
            <p className="text-gray-600">
              Every template is carefully reviewed to ensure high quality, clean code, and modern design standards.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast & Reliable</h3>
            <p className="text-gray-600">
              Download templates instantly and get started on your projects without any delays or complications.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Global Community</h3>
            <p className="text-gray-600">
              Join a worldwide community of creators and developers building amazing digital experiences.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Our Story</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-4">
              Celora was born out of frustration with the existing template marketplace landscape. As developers ourselves, we experienced the pain of sifting through low-quality templates, dealing with unclear licenses, and struggling to find truly premium solutions.
            </p>
            <p className="text-gray-600 mb-4">
              We envisioned a platform where quality isn't negotiable, where creators are fairly compensated, and where developers can find exactly what they need to bring their ideas to life quickly and efficiently.
            </p>
            <p className="text-gray-600">
              Today, Celora serves thousands of developers worldwide and hosts templates from hundreds of talented creators. We're just getting started on our mission to democratize great design and empower the global developer community.
            </p>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're looking for your next template or ready to start selling your creations, we'd love to have you aboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/categories">Browse Templates</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700" asChild>
              <Link to="/creator-info">Become a Creator</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
