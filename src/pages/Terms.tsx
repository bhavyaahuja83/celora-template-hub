
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using Celora, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Use License</h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials on Celora for personal, non-commercial transitory viewing only.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>This is the grant of a license, not a transfer of title</li>
                <li>Under this license you may not modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on Celora's website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Template Licensing</h2>
              <p className="text-gray-600 mb-4">
                When you purchase a template from Celora, you receive a standard license that allows you to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Use the template for personal or commercial projects</li>
                <li>Modify and customize the template as needed</li>
                <li>Create unlimited end products using the template</li>
              </ul>
              <p className="text-gray-600 mb-4">
                You may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Resell or redistribute the template as-is</li>
                <li>Share your license with others</li>
                <li>Use the template to create competing template marketplaces</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Creator Terms</h2>
              <p className="text-gray-600 mb-4">
                Template creators agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Only upload original work or work they have rights to distribute</li>
                <li>Receive 65% of all sales revenue from their templates</li>
                <li>Provide accurate descriptions and previews of their templates</li>
                <li>Offer reasonable support for their templates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Payment and Refunds</h2>
              <p className="text-gray-600 mb-4">
                All payments are processed securely. Refunds may be granted within 30 days of purchase for templates that don't function as described.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Disclaimer</h2>
              <p className="text-gray-600 mb-4">
                The materials on Celora are provided on an 'as is' basis. Celora makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us at legal@celora.com
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
