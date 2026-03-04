import { X, Download, BookOpen } from 'lucide-react';

interface CatalogPDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogPDFViewer = ({ isOpen, onClose }: CatalogPDFViewerProps) => {
  if (!isOpen) return null;

  const pdfPath = '/Catalogo ECOFEST (1).pdf';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 opacity-100"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{ transition: 'backdrop-filter 0.3s ease' }}
      ></div>

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden transform transition-all duration-500 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Catálogo ECOFEST</h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* PDF Container */}
        <div className="w-full h-[calc(90vh-80px)] relative bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <embed
              src={pdfPath}
              type="application/pdf"
              width="100%"
              height="100%"
              className="rounded-b-2xl"
            />
          </div>
        </div>

        {/* Footer with Download Button */}
        <div className="absolute bottom-4 right-6 z-10">
          <a
            href={pdfPath}
            download="Catalogo_ECOFEST.pdf"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </a>
        </div>
      </div>
    </div>
  );
};
