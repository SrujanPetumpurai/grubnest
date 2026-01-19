export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 px-8 py-12 mt-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div>
          <h4 className="text-white mb-4">Features</h4>
          <ul className="space-y-2">
            <li>Why Us</li>
            <li>Benefits</li>
            <li>Instructions</li>
            <li>Licenses</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li>About</li>
            <li>Service</li>
            <li>News</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-4">Contact Info</h4>
          <ul className="space-y-2">
            <li>2002 godavari honapati,</li>
            <li>Vizag, AP 37371</li>
            <li>Tel: +91 9383333333</li>
            <li>Fax: +91 8273888888</li>
            <li className="underline">srujan.petumpurai@gmail.com</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-4">Language & Currency</h4>
          <div className="space-y-4">
            <select className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
              <option>English</option>
              <option>Hindi</option>
            </select>
            <select className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2">
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>

      </div>

      <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between text-sm">
        <span>© 2025 Grubnest. All Rights Reserved.</span>
        <span>Terms & Conditions / Privacy Policy</span>
      </div>
    </footer>
  );
}
