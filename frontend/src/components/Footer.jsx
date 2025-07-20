export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Cleanify. All rights reserved.
      </div>
    </footer>
  );
}
