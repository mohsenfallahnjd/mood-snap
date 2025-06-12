type Props = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  url: string;
};

export function ShareModal({ isOpen, onClose, text, url }: Props) {
  if (!isOpen) {
    return null;
  }

  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    { label: "Telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` },
    { label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}` },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "Email", href: `mailto:?subject=${encodedText}&body=${encodedText}%20${encodedUrl}` },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xs w-full">
        <h2 className="text-lg font-semibold mb-4">Share MoodSnap</h2>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 w-full text-center text-sm text-gray-600 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  );
}
